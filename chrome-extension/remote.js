console.log('[Netflix Remote]');

var socket = io('ws://localhost:4545');
var currentVideoTitle = null;
var lastTimeUpdate = 0;
var lastRowUpdate = 0;
var lastRows = null;

function getRows() {
  if(Date.now() - lastRowUpdate >= 10000) {
    lastRowUpdate = Date.now();
    var id = 'title-card-';
    var rows = [];

    for(var i = 10; i <= 40; i++) {
      try {
        var j = i + '';
        var el = document.getElementById(id + (j.split('').join('-')));
        
        if(el && el.innerHTML) rows.push(el.innerHTML);
      }
      catch(e) {
        console.log(e);
      }
    }

    return rows;
  }
}

function findVideoPlayer() {
  var el = document.getElementsByTagName('video');
  
  if(el.length) {
    return el[0];
  } else {
    return null;
  }
}

function onTimeUpdate(event) {
  if(typeof lastTimeUpdate === 'number' && event.target.currentTime >= lastTimeUpdate + 1) {
    lastTimeUpdate = event.target.currentTime;
    
    socket.emit('player-update', {
      elapsed: lastTimeUpdate,
      duration: event.target.duration,
      title: currentVideoTitle
    });
  }
}

var updateInterval = setInterval(() => {
  var vp = findVideoPlayer();
  
  try {
    if(vp === null || !vp.currentTime) {
      console.log('yes');
      var rows = getRows();
      
      if(rows.length && lastRows !== rows && rows.every((row) => row !== null)) {
        lastRows = rows;
        console.log(rows);
        socket.emit('browse-rows', { rows: rows });
      } 
      
      return;
    }
    
    currentVideoTitle = document.getElementsByClassName('player-status-main-title')[0].innerText;
    
    vp.addEventListener('timeupdate', onTimeUpdate);
    
    clearInterval(updateInterval);
  }
  catch(e) {
    //console.error(e);
  }
  
}, 1000);

socket.on('pause', () => {
  try {
    document.getElementsByTagName('video')[0].pause();
  }
  catch(e) {
    console.error(e);
  }
});

socket.on('play', () => {
  try {
    document.getElementsByTagName('video')[0].play();
  }
  catch(e) {
    console.error(e);
  }
});
