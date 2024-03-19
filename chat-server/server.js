const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const http = require("http");
const mongoose = require("mongoose");
const {Server} = require("socket.io");

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

const server = http.createServer(app);

const port = process.env.PORT || 3001;

const io  = new Server(server, {
  cors: {
    origin:"http://localhost:3000" ||"http://localhost:3001" ,
    methods: ["GET", "POST"],
    credentials:true,
  }
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


io.on("connection", async (socket) =>{
  // console.log("USER CONNECTED");
  // console.log(socket.id);
  socket.emit("welcome", `welome to the server ${socket.id}`);

  // boradcast, not forward msg to own but to all others 
  // emit, forward to itself

  socket.broadcast.emit("all", ` ${socket.id} joined the server `);


})
process.on("unhandeledRejection", (err) => {
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
