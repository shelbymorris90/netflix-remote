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
    console.log('Server started on port: 4545');
  });

  io.on('connection', (socket) => {
    socket.on('player-update', (update) => {
      io.emit('playerUpdate', update);    
    });
    
    socket.on('browse-rows', (r) => {
      var c = [];
      for(var i = 0; i <= 4; i++) {
        c.push(r.rows[i]);
      }
      console.log('browse-rows: ');
      console.log(c);
      io.emit('rows', c);
    });
  });
};
