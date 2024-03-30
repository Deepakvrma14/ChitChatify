const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const User = require("./models/user");
const friendRequest = require("./models/friendRequest");
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
  console.log(JSON.stringify(socket.handshake.query));
  // evry connection id for evry new connection
  const socket_id = socket.id;

  if (Boolean(user_id)) {
    User.findByIdAndUpdate(user_id, { socket_id, status: "Online" });
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
    it.to(from_user.socket_id).emit("request_sent", {
      message: "Request sent successfully",
    });
  });

  socket.on("accept_friend", async (data) => {
    const req_doc = await friendRequest.findById(data.request_id);
    console.log(`data is ${data} and request id is ${req_doc}`);
    const sender = await User.findById(req_doc.sender);
    const receiver = await User.findById(req_doc.receiver);

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

    socket.on("end", async (data) => {
      if (data.user_id) {
        await User.findByIdAndUpdate(data.user_id, { status: "Offline" });
      }
      console.log("disconnecting this connection");
      socket.disconnect(0);
    });
  });
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
