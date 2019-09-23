const Tone = require('tone');

const defaultSustain = 0.5;
const defaultGap = Tone.Time('4n') * 1;
const defaultOctave = 4;
const defaultVolume = -10;

module.exports = {
  defaultSustain, defaultGap, defaultOctave, defaultVolume,
};
