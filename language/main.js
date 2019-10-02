const Tone = require('tone');
const peg = require('./language.js');
/* eslint-disable*/
const samples = require('./samples.js');

let runningParts = {};
/* eslint-enable */

document.documentElement.addEventListener(
  'mousedown', () => {
    if (Tone.context.state !== 'running') {
      Tone.context.resume();
    }
    if (Tone.Transport.state !== 'started') {
      Tone.Transport.start();
      Tone.Transport.seconds = Tone.context.now();
    }
  },
);

let loaded = false;
Tone.Buffer.on('load', () => { loaded = true; });

const stop = (id) => {
  if (id in runningParts) {
    runningParts[id].forEach((part) => {
      part.stop();
    });
  }

  delete runningParts[id];
};

const start = (id, value) => {
  stop(id);
  const parts = peg.parse(value);
  runningParts[id] = parts;

  if (loaded && Tone.context.state === 'running') {
    parts.forEach((part) => { part.start(); });
  } else {
    console.log('unloaded');
  }
};

document.querySelectorAll('.playBox').forEach((playBox) => {
  const element = playBox.querySelector('[id=trigger]');
  element.addEventListener('click', () => {
    console.log(element.className);
    if (element.className.includes('Start')) {
      start(playBox.id, element.value);
    } else {
      stop(playBox.id);
    }
  });
  // playBox.querySelector('[id=Stop]').addEventListener('click', () => { stop(playBox); });
});

// To do:
// add additional modifiers, instrments, filters, and attributes
// add syntax for changing defaults
// look at polysynth
// add other types of groups
// add numbers as notes
// add note extensions
// add saving phrases
// add saving filter chains
// add naming

/*
keywordformakingafilterchain name > distort 1
"a b c" >> instrument > name
*/
