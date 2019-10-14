const Tone = require('tone');

const drumUrls = {
  notes: {
    C3: 'hat.wav',
    D3: 'kick.wav',
    E3: 'snare.wav',
    F3: 'ophat.wav',
  },
  baseUrl: './drums/',
  name: 'drums',
};

const pianoUrls = {
  notes: {
    A1: 'A0.[mp3|ogg]',
    A2: 'A1.[mp3|ogg]',
    A3: 'A2.[mp3|ogg]',
    A4: 'A3.[mp3|ogg]',
    A5: 'A4.[mp3|ogg]',
    A6: 'A5.[mp3|ogg]',
    A7: 'A6.[mp3|ogg]',
    'A#1': 'As0.[mp3|ogg]',
    'A#2': 'As1.[mp3|ogg]',
    'A#3': 'As2.[mp3|ogg]',
    'A#4': 'As3.[mp3|ogg]',
    'A#5': 'As4.[mp3|ogg]',
    'A#6': 'As5.[mp3|ogg]',
    'A#7': 'As6.[mp3|ogg]',
    B1: 'B0.[mp3|ogg]',
    B2: 'B1.[mp3|ogg]',
    B3: 'B2.[mp3|ogg]',
    B4: 'B3.[mp3|ogg]',
    B5: 'B4.[mp3|ogg]',
    B6: 'B5.[mp3|ogg]',
    B7: 'B6.[mp3|ogg]',
    C1: 'C0.[mp3|ogg]',
    C2: 'C1.[mp3|ogg]',
    C3: 'C2.[mp3|ogg]',
    C4: 'C3.[mp3|ogg]',
    C5: 'C4.[mp3|ogg]',
    C6: 'C5.[mp3|ogg]',
    C7: 'C6.[mp3|ogg]',
    C8: 'C7.[mp3|ogg]',
    'C#1': 'Cs0.[mp3|ogg]',
    'C#2': 'Cs1.[mp3|ogg]',
    'C#3': 'Cs2.[mp3|ogg]',
    'C#4': 'Cs3.[mp3|ogg]',
    'C#5': 'Cs4.[mp3|ogg]',
    'C#6': 'Cs5.[mp3|ogg]',
    'C#7': 'Cs6.[mp3|ogg]',
    D1: 'D0.[mp3|ogg]',
    D2: 'D1.[mp3|ogg]',
    D3: 'D2.[mp3|ogg]',
    D4: 'D3.[mp3|ogg]',
    D5: 'D4.[mp3|ogg]',
    D6: 'D5.[mp3|ogg]',
    D7: 'D6.[mp3|ogg]',
    'D#1': 'Ds0.[mp3|ogg]',
    'D#2': 'Ds1.[mp3|ogg]',
    'D#3': 'Ds2.[mp3|ogg]',
    'D#4': 'Ds3.[mp3|ogg]',
    'D#5': 'Ds4.[mp3|ogg]',
    'D#6': 'Ds5.[mp3|ogg]',
    'D#7': 'Ds6.[mp3|ogg]',
    E1: 'E0.[mp3|ogg]',
    E2: 'E1.[mp3|ogg]',
    E3: 'E2.[mp3|ogg]',
    E4: 'E3.[mp3|ogg]',
    E5: 'E4.[mp3|ogg]',
    E6: 'E5.[mp3|ogg]',
    E7: 'E6.[mp3|ogg]',
    F1: 'F0.[mp3|ogg]',
    F2: 'F1.[mp3|ogg]',
    F3: 'F2.[mp3|ogg]',
    F4: 'F3.[mp3|ogg]',
    F5: 'F4.[mp3|ogg]',
    F6: 'F5.[mp3|ogg]',
    F7: 'F6.[mp3|ogg]',
    'F#1': 'Fs0.[mp3|ogg]',
    'F#2': 'Fs1.[mp3|ogg]',
    'F#3': 'Fs2.[mp3|ogg]',
    'F#4': 'Fs3.[mp3|ogg]',
    'F#5': 'Fs4.[mp3|ogg]',
    'F#6': 'Fs5.[mp3|ogg]',
    'F#7': 'Fs6.[mp3|ogg]',
    G1: 'G0.[mp3|ogg]',
    G2: 'G1.[mp3|ogg]',
    G3: 'G2.[mp3|ogg]',
    G4: 'G3.[mp3|ogg]',
    G5: 'G4.[mp3|ogg]',
    G6: 'G5.[mp3|ogg]',
    G7: 'G6.[mp3|ogg]',
    'G#1': 'Gs0.[mp3|ogg]',
    'G#2': 'Gs1.[mp3|ogg]',
    'G#3': 'Gs2.[mp3|ogg]',
    'G#4': 'Gs3.[mp3|ogg]',
    'G#5': 'Gs4.[mp3|ogg]',
    'G#6': 'Gs5.[mp3|ogg]',
    'G#7': 'Gs6.[mp3|ogg]',
  },
  baseUrl: './piano/',
  name: 'piano',
};

const urls = [drumUrls, pianoUrls];

urls.forEach((url) => {
  module.exports[url.name] = {};
  Object.keys(url.notes).forEach((note) => {
    module.exports[url.name][note] = new Tone.Buffer(url.baseUrl + url.notes[note]);
  });
});
