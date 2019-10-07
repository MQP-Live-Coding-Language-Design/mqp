const Tone = require('tone');

const drums = new Tone.Sampler({
  C3: './hat.wav',
  D3: './kick.wav',
  E3: './snare.wav',
  F3: './ophat.wav',
});

const piano = new Tone.Sampler({
  C4: './piano_middle_C.mp3',
});

module.exports = { drums, piano };
