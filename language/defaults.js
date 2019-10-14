const Tone = require('tone');

const defaultSustain = 1;
const defaultGap = Tone.Time('4n') * 1;
const defaultOctave = 4;
const defaultVolume = -10;

module.exports = {
  defaultSustain, defaultGap, defaultOctave, defaultVolume,
};
