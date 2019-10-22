const samples = require('../../../language/samples.js');
const defaults = require('../../../language/defaults.js');

export const note = [
  {
    label: 'chord(',
    kind: 17,
    insertText: 'chord(',
  },
  {
    label: 'rand(',
    kind: 17,
    insertText: 'rand(',
  },
];

export const instrument = [];

['triangle', 'soft', 'fatsaw', 'saw', 'square', 'pls no', 'alien']
  .forEach((name) => {
    instrument.push({ label: name, kind: 5, insertText: `${name} ` });
  });

Object.getOwnPropertyNames(samples).forEach((name) => {
  instrument.push({ label: name, kind: 5, insertText: `${name} ` });
});

export const modifier = [];

['octave', 'pitch', 'duration', 'save', 'scale', 'stutter'].forEach((name) => {
  modifier.push({ label: name, kind: 0, insertText: `${name} ` });
});

export const scales = [];
Object.getOwnPropertyNames(defaults.scales).forEach((name) => {
  scales.push({ label: name, kind: 3, insertText: `${name} ` });
});
