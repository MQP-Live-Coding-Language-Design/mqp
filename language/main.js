const Tone = require('tone');
const peg = require('./language.js');
const samples = require('./samples.js');

/* eslint-disable*/
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

const stop = (playBox) => {
  if (playBox.id in runningParts) {
    runningParts[playBox.id].forEach((part) => {
      part.stop();
    });
  }

  delete runningParts[playBox.id];
};

const start = (playBox) => {
  stop(playBox);
  const parts = peg.parse(playBox.querySelector('[id=Start]').value);
  runningParts[playBox.id] = parts;

  if (loaded && Tone.context.state === 'running') {
    parts.forEach((part) => { part.start(); });
  } else {
    console.log('unloaded');
  }
};

document.querySelectorAll('.playBox').forEach((playBox) => {
  playBox.querySelector('[id=Start]').addEventListener('click', () => { start(playBox); });
  playBox.querySelector('[id=Stop]').addEventListener('click', () => { stop(playBox); });
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
