console.log('[Netflix Remote]');

var socket = io('ws://localhost:4545');

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
