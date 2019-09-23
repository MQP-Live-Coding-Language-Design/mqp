const Tone = require('tone');

const hat = new Tone.Buffer('./samples/hat.wav');
const kick = new Tone.Buffer('./samples/kick.wav');
const snare = new Tone.Buffer('./samples/snare.wav');
const ophat = new Tone.Buffer('./samples/ophat.wav');

module.exports = {
  hat, kick, snare, ophat,
};
