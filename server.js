const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "./Public");
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("A new user just connected");

  io.emit("hello-test", { message: "je suis le message" });

  socket.on("createMessage", (message) => {
    console.log(message);
    console.log("passed here");
    console.log("CreateMessage", message);
    io.emit("newMessage", {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime(),
    });
  });

  socket.on("disconnect", () => {});
});

server.listen(port, () => {
  console.log(`Server is on port http://localhost:${port}`);
});
