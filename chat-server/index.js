const express = require('express');
const socketio = require("socket.io");

const app = express();
const server = require('http').createServer(app);
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

////////////////////////////////////////////////////////////////////////////////

// SETA OS MÉTODOS DO SERVER
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("enviaMensagem", (message) => {
    socket.broadcast.emit("novaMensagem", message);
  });
});

////////////////////////////////////////////////////////////////////////////////

// ABRE O SERVER
server.listen(3301, () => {
  console.log("listening on port 3301");
});