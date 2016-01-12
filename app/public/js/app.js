'use strict';

function percentCompleted(elapsed, duration, addSymbol) {
  let percent = Math.floor((elapsed / duration) * 100);
  
  return addSymbol ? percent + '%' : percent;
}

function prettyTime(seconds) {
  seconds = Math.floor(seconds);
  
  var hrs = Math.floor(seconds / 3600);
  var mins = Math.floor((seconds % 3600) / 60);
  var secs = seconds % 60;
 
  var pretty = '';

  if (hrs > 0) pretty += '' + hrs + ':' + (mins < 10 ? '0':'');

  pretty += '' + mins + ':' + (secs < 10 ? '0': '') + secs;
 
  return pretty;
}

function getClassName(thing) {
  return Object.prototype.toString.call(thing).split(' ')[1].split(']')[0];
}

let State = {
  currentTitle: {
    value: 'Nothing',
    element: document.getElementById('current-title')
  },
  elapsedTime: { 
    value: 0,
    element: document.getElementById('time-elapsed')
  },
  duration: {
    value: 0,
    element: document.getElementById('time-duration')
  },
 currentPosition: {
   value: 0,
   element: document.getElementById('current-position'),
   css: {
     left: '%'
   }
 }
};

let _scope = {};

Object.keys(State).forEach((key) => {
  _scope[key] = {
    get: () => {
      return State[key].value;
    },
    set: (val) => {
      if(val !== State[key].value) {
        State[key].value = val;
        
        if(State[key].element) {
          if(State[key].css) {
            Object.keys(State[key].css).forEach((k) => {
              State[key].element.style[k] = State[key].value + State[key].css[k];
            });
          } else if(getClassName(State[key].element) !== 'HTMLInputElement') {
            State[key].element.innerHTML = State[key].value;
          } else if(getClassName(State[key].element) === 'HTMLInputElement') {
            State[key].element.value = State[key].value;
          }
        }
      }
    }
  }
});

let Scope = Object.create({}, _scope);

function init() {
  let socket = io();
  
  socket.on('playerUpdate', playerUpdate);
  
  socket.on('rows', (rows) => {
    console.log('rows');
    console.log(rows);
    var rowContainer = document.getElementById('row-container');
    
    rowContainer.innerHTML = '';
    
    rows.forEach((row) => {
      rowContainer.innerHTML += row;
    });
  });
  
  var $play = document.getElementById('play');
  var $pause = document.getElementById('pause');
    
  $play.addEventListener('click', () => {
    aja().url('/play').go();
  });
    
  $pause.addEventListener('click', () => {
    aja().url('/pause').go();
  });
}

function playerUpdate(update) {
  let elapsed = update.elapsed;
  let duration = update.duration;
  let currentTitle = update.title;
  
  Scope.elapsedTime = prettyTime(elapsed);
  Scope.duration = prettyTime(duration);
  Scope.currentPosition = percentCompleted(elapsed, duration);
  Scope.currentTitle = currentTitle;
}


init();