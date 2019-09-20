Tone = require('tone');

defaultSustain = 0.5;
defaultGap = Tone.Time('4n') * 1;
defaultoctave = 4;
defaultVolume = -10;

hat = new Tone.Buffer('./samples/hat.wav');
kick = new Tone.Buffer('./samples/kick.wav');
snare = new Tone.Buffer('./samples/snare.wav');
ophat = new Tone.Buffer('./samples/ophat.wav');
