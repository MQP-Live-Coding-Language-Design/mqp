const peg = require('./language.js');

document.documentElement.addEventListener(
  'mousedown', () => {
    if (Tone.context.state !== 'running') {
      Tone.context.resume();
      Tone.Transport.start();
    }
  },
);

function stop() {
  runningParts.forEach((part) => {
    part.stop();
  });
  runningParts = [];
}

function start() {
  stop();
  peg.parse(document.getElementById('input').value);
}

document.getElementById('Start').addEventListener('click', () => { start(); });
document.getElementById('Stop').addEventListener('click', () => { stop(); });
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
