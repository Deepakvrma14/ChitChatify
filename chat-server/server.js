const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const User = require("./models/user");
const friendRequest = require("./models/friendRequest");
const path = require("path");
const oneToOneModel = require("./models/OneToOneMessage");
process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

const server = http.createServer(app);

const port = process.env.PORT || 3001;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000" || "http://localhost:3001",
    methods: ["GET", "POST"],

    credentials: true,
  },
});

const DB = process.env.DBURI;
mongoose
  .connect(DB)
  .then((con) => {
    console.log("db connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

io.on("connection", async (socket) => {
  // using this we'll query our db and find this user's id

  const user_id = socket.handshake.query["user_id"];
  // console.log(JSON.stringify(socket.handshake.query));
  // evry connection id for evry new connection
  const socket_id = socket.id;
  console.log(`User connected: ${user_id}`);

  try {
    await User.findByIdAndUpdate(user_id, { socket_id, status: "Online" });
  } catch (error) {
    console.error(`Error updating user status: ${error}`);
  }

  socket.on("friend_req", async (data) => {
    console.log(data.to);
    // {to: receipoent id }

    // data:{ to , from}
    const to_user = User.findById(data.to).select("socket_id");
    const from_user = User.findById(data.from).select("socket_id");

    await friendRequest.create({
      sender: data.from,
      receiver: data.to,
    });
    // new friendRequest emit
    io.to(to_user.socket_id).emit("new_friend_request", {
      message: "New friend request received",
    });

    // reuqest sending emit event
    io.to(from_user.socket_id).emit("request_sent", {
      message: "Request sent successfully",
    });
  });

  socket.on("accept_friend", async (data) => {
    const req_doc = await friendRequest.findById(data.request_id);
    console.log(`data is ${data} and request id is ${req_doc}`);


  // if (!sender || !receiver) {
  //   console.log("User not found");
  //   return;
  // }
    const sender = await User.findById(req_doc.sender);
    console.log(sender);

    const receiver = await User.findById(req_doc.receiver);
    console.log(`receriver ${receiver}`);
    sender.friends.push(req_doc.receiver);
    receiver.friends.push(req_doc.sender);

    await receiver.save({ new: true, validateModifiedOnly: true });
    await sender.save({ new: true, validateModifiedOnly: true });

    // detlete the friend request if it's accepted
    await friendRequest.findByIdAndDelete(data.request_id);

    // update the users about the acceptance of the id
    io.to(sender.socket_id).emit("request_accepted", {
      message: "Request accepted successfully",
    });
    io.to(receiver.socket_id).emit("request_accepted", {
      message: "Request accepted successfully ",
    });
  });
  socket.on("get_direct_conversations", async ({ user_id }, callback) => {
    const existing_user = await oneToOneModel
      .find({
        participants: { $all: [user_id] },
      })
      .populate("participants", "firstName lastName _id email status");
    // console.log(existing_user);

    callback(existing_user);
  });
  socket.on("start_conversation", async (data) => {
    const { to, from } = data;

    try {
      // check if there's existing convo
      const existingConvo = await oneToOneModel
        .find({
          participants: { $size: 2, $all: [to, from] },
        })
        .populate("participants", "firstName lastName _id email status");

      console.log(existingConvo[0]); //as there could be only one conversation between an to and from'
      // console.log("Started convo");
      // this would be the conversation id used

      // if no convo until now
      if (existingConvo.length === 0) {
        let newChat = await oneToOneModel.create({
          participants: [to, from],
        });
        newChat = await oneToOneModel
          .findById(newChat._id)
          .populate("participants", "firstName lastName _id email status");
        console.log(newChat);
        console.log("emitting new_chat");

        socket.emit("start_chat", newChat);
      }
      // if convo already
      else {
        // console.log("emitting start_chat");
        // console.log(existingConvo[0]);
        
        socket.emit("start_chat", existingConvo[0]);
      }
    } catch (error) {
      console.error(`Error during start_conversation: ${error}`);
    }
  });
  socket.on("get_message", async (data, callback) => {
    const { message } = await oneToOneModel
      .findById(data.conversation_id)
      .select("message");
    callback(message);
  });
  socket.on("text_message", async (data) => {
    console.log("Received message is ", data.message);

    const { to, from, message, conversation_id, type } = data;

    const chat = await oneToOneModel.findById(conversation_id);
    if (!chat) {
      console.log("No chat found");
      return;
    }

    const to_user_id = chat.participants.find((id) => id !== from);
    const to_user = await User.findById(to_user_id);
    const from_user = await User.findById(from);

    console.log(to_user);
    // // if (!to_user) {
      // console.log(`to not found ${to_user_id}`);
    // //   return;
    // // }
    // if (!from_user) {
    //   console.log(`from not found ${from_user}`);
    //   return;
    // }

    const new_message = {
      to:to_user ,
      from: from_user,
      type,
      text: message,
    };

    chat.message.push(new_message);

    // save to db
    await chat.save({});

    
    console.log(`Message emitted to ${to_user.socket_id}`);

    console.log(`conversation_id is ${conversation_id}`)
    // emit outgoing_message for from_user
    // emit incoming_message for to_user
    // socket.emit("incomming_message", (data) => {conversation_id});
    io.to(to_user?.socket_id).emit("new_message", {
      conversation_id,
      message: new_message,
    });

    // emit outgoing_message -> from user
    io.to(from_user?.socket_id).emit("new_message", {
      conversation_id,
      message: new_message,
    });
    console.log(`Message emitted from ${from_user.socket_id}`);

  });
  socket.on("file_message", async (data) => {
    console.log(`${data} received`);

    const fileExtension = path.extname(data.file.name);

    const dbUniqueName = `${Date.now()}_${Math.floor(
      Math.random() * 10000
    )}_${fileExtension}`;

    // upload files to aws s3

    // data => {to, from, text, file}

    // save to db

    // emit incoming_message for to_user

    // emit outgoing_message for from_user
  });
  socket.on("end", async (data) => {
    if (data.user_id) {
      await User.findByIdAndUpdate(data.user_id, { status: "Offline" });
    }
    console.log("disconnecting this connection");
    socket.disconnect(0);
  });
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
