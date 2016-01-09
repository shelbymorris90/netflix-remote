'use strict';

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

let client = null;

app.use(express.static('public'));

app.get('/pause', (req, res) => {
  io.emit('pause');
  
  res.end();
});

app.get('/play', (req, res) => {
  io.emit('play');
  
  res.end();
});

server.listen(4545, () => {
  console.log('Express server started on port: 4545');
});

io.on('connection', (socket) => {
  console.log('client connected.');
  client = socket;
  
  socket.on('video-title', (title) => {
    console.log('ViDEO TITLE: ' + title);
  });
});