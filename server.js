const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

var cors = require('cors');
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3003, () => {
  console.log('listening on *:3003');
});

io.on('connection', (socket) => {
  socket.on('startOutbound', (msg) => {
    console.log('starting outbound...');
    io.emit('outbound', msg)
  });
});