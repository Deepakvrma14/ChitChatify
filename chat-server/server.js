const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const User = require("./models/user");
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
  const user_id = socket.handshake.query("user_id");
  // evry connection id for evry new connection
  const socket_id = socket.id;

  if (user_id) {
    User.findByIdAndUpdate(user_id, { socket_id });
  }
  socket.on("friend_req", async (data) => {
    console.log(data.to);
    // {to: receipoent id }
    const to = User.findById(data.to);
    io.to(data.to).emit("new_friend_request", {
      //
    });
  });
});

// todo: below code is part of learning of socket, remove it later
// io.on("connection", async (socket) => {
//   // console.log("USER CONNECTED", socket.id);
//   console.log(socket);
//   socket.emit("welcome", `welome to the server ${socket.id}`);

//   // boradcast, not forward msg to own but to all others
//   // emit, forward to itself

//   socket.broadcast.emit("exceptSelf", `User ${socket.id} joined the server`);
//   socket.on("disconnect", () => {
//     console.log(`user ${socket.id} disconnected`);
//   });
// });
process.on("unhandeledRejection", (err) => {
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
