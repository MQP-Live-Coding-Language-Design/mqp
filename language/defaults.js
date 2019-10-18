const Tone = require('tone');

const defaultSustain = 0.9;
const defaultGap = Tone.Time('4n') * 1;
const defaultOctave = 4;
const defaultVolume = -10;
/* eslint-disable */
let savedSequences = {};
/* eslint-enable */

module.exports = {
  defaultSustain, defaultGap, defaultOctave, defaultVolume, savedSequences,
};
