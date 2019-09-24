const Tone = require('tone');

const hat = new Tone.Buffer('./hat.wav');
const kick = new Tone.Buffer('./kick.wav');
const snare = new Tone.Buffer('./snare.wav');
const ophat = new Tone.Buffer('./ophat.wav');

module.exports = {
  hat, kick, snare, ophat,
};
