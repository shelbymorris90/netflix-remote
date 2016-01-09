'use strict';

const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu;
const Tray = electron.Tray;
const server = require('./server.js');

var appIcon = null;
app.on('ready', function(){
  appIcon = new Tray('./icon_48x48.png');
  appIcon.setToolTip('Netflix Remote');
  
  let Server = server();
});
