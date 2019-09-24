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
      Tone.Transport.start();
    }
  },
);

// function stop(button) {
//   if (button.parentElement in runningParts) {
//     runningParts[button.parentElement].forEach((part) => {
//       part.stop();
//     });
//   }
//
//   delete runningParts[button.parentElement];
// }

// function start(button) {
//   stop(button);
//   const parts = peg.parse(button.parentElement.querySelector('textarea').value);
//   runningParts[button.parentElement] = parts;
// }

// document.querySelectorAll('[id=Start]').forEach((element) => {
//   element.addEventListener('click', () => { start(element); });
// });
// document.querySelectorAll('[id=Stop]').forEach((element) => {
//   element.addEventListener('click', () => { stop(element); });
// });
//
const stop = (id) => {
  if (id in runningParts) {
    runningParts[id].forEach((part) => {
      part.stop();
    });
  }

  delete runningParts[id];
};

const start = (id, content) => {
  console.log(runningParts);
  stop(id);
  const parts = peg.parse(content);
  runningParts[id] = parts;
  console.log(runningParts);
};

document.querySelectorAll('.playBox').forEach((playBox) => {
  let toParse;

  playBox.childNodes.forEach((child) => {
    if (child.id === 'input') {
      toParse = child.value;
    }
  });

  playBox.childNodes.forEach((child) => {
    if (child.id === 'Start') {
      child.addEventListener('click', () => { start(playBox.id, toParse); });
    }
    if (child.id === 'Stop') {
      child.addEventListener('click', () => { stop(playBox.id); });
    }
  });
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
