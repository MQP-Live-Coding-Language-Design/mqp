const Tone = require('tone');

const scales = {
  major: {
    intervals: [0, 2, 4, 5, 7, 9, 11], length: 7, octave: 12, name: 'major',
  },
  naturalminor: {
    intervals: [0, 2, 3, 5, 7, 8, 10], length: 7, octave: 12, name: 'naturalminor',
  },
  harmonicminor: {
    intervals: [0, 2, 3, 5, 7, 8, 11], length: 7, octave: 12, name: 'harmonicminor',
  },
  chromatic: {
    intervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], length: 12, octave: 12, name: 'chromatic',
  },
  majortriad: {
    intervals: [0, 4, 7], length: 3, octave: 12, name: 'majortriad',
  },
  minortriad: {
    intervals: [0, 3, 7], length: 3, octave: 12, name: 'minortriad',
  },
};

const scaleMap = {
  major: 'major',
  maj: 'major',
  M: 'major',
  naturalminor: 'naturalminor',
  minor: 'naturalminor',
  min: 'naturalminor',
  nm: 'naturalminor',
  m: 'naturalminor',
  harmonicminor: 'harmonicminor',
  hm: 'harmonicminor',
  chromatic: 'chromatic',
  ch: 'chromatic',
  majortriad: 'majortriad',
  Mtriad: 'majortriad',
  Mt: 'majortriad',
  M3: 'majortriad',
  minortriad: 'minortriad',
  mtriad: 'minortriad',
  mt: 'minortriad',
  m3: 'minortriad',
};

const defaultSustain = 0.9;
const defaultGap = Tone.Time('4n') * 1;
const defaultOctave = 4;
const defaultVolume = -10;
const defaultScale = { key: 'C', type: scales.major };
/* eslint-disable */
let savedSequences = {};
/* eslint-enable */

module.exports = {
  defaultSustain,
  defaultGap,
  defaultOctave,
  defaultVolume,
  defaultScale,
  savedSequences,
  scales,
  scaleMap,
};
