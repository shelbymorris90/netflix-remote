'use strict';

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

module.exports = () => {
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
    socket.on('player-update', (update) => {
      io.emit('playerUpdate', update);    
    });
  });
};