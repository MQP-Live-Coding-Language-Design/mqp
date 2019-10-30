const Tone = require('tone');

const drumUrls = {
  notes: {
    C3: 'hat.wav',
    D3: 'kick.wav',
    E3: 'snare.wav',
    F3: 'ophat.wav',
    G3: 'crash.wav',
    A3: 'ride.wav',
    B3: 'bell.wav',
    C4: 'tom1.wav',
    D4: 'tom2.wav',
    E4: 'tom3.wav',
    F4: 'tom4.wav',
  },
  baseUrl: './acousticdrums/',
  name: 'drums',
};

const electricdrumUrls = {
  notes: {
    C3: 'hat.wav',
    D3: 'kick.wav',
    E3: 'snare.wav',
    F3: 'ophat.wav',
    G3: 'crash.wav',
    A3: 'ride.wav',
    B3: 'bell.wav',
    C4: 'tom1.wav',
    D4: 'tom2.wav',
    E4: 'tom3.wav',
    F4: 'tom4.wav',
  },
  baseUrl: './electricdrums/',
  name: 'electricdrums',
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

const electricBassUrls = {
  notes: {
    'A#2': 'As2.[mp3|ogg]',
    'A#3': 'As3.[mp3|ogg]',
    'A#4': 'As4.[mp3|ogg]',
    'A#5': 'As5.[mp3|ogg]',
    'C#2': 'Cs2.[mp3|ogg]',
    'C#3': 'Cs3.[mp3|ogg]',
    'C#4': 'Cs4.[mp3|ogg]',
    'C#5': 'Cs5.[mp3|ogg]',
    E2: 'E2.[mp3|ogg]',
    E3: 'E3.[mp3|ogg]',
    E4: 'E4.[mp3|ogg]',
    E5: 'E5.[mp3|ogg]',
    G2: 'G2.[mp3|ogg]',
    G3: 'G3.[mp3|ogg]',
    G4: 'G4.[mp3|ogg]',
    G5: 'G5.[mp3|ogg]',
  },
  baseUrl: './bass-electric/',
  name: 'electricbass',
};

const bassoonUrls = {
  notes: {
    A1: 'A1.[mp3|ogg]',
    A2: 'A2.[mp3|ogg]',
    A3: 'A3.[mp3|ogg]',
    C1: 'C2.[mp3|ogg]',
    C2: 'C2.[mp3|ogg]',
    C3: 'C3.[mp3|ogg]',
    C4: 'C4.[mp3|ogg]',
    'D#1': 'Ds1.mp3',
    'D#2': 'Ds2.mp3',
    'D#3': 'Ds3.mp3',
    'F#1': 'Fs1.mp3',
    'F#2': 'Fs2.mp3',
    'F#3': 'Fs3.mp3',
  },
  baseUrl: './bassoon/',
  name: 'bassoon',
};

const celloUrls = {
  notes: {
    A2: 'A2.mp3',
    A3: 'A3.mp3',
    A4: 'A4.mp3',
    A5: 'A5.mp3',
    C2: 'C2.mp3',
    C3: 'C3.mp3',
    C4: 'C4.mp3',
    C5: 'C5.mp3',
    C6: 'C6.mp3',
    'D#2': 'Ds2.mp3',
    'D#3': 'Ds3.mp3',
    'D#4': 'Ds4.mp3',
    'D#5': 'Ds5.mp3',
    'F#2': 'Fs2.mp3',
    'F#3': 'Fs3.mp3',
    'F#4': 'Fs4.mp3',
    'F#5': 'Fs5.mp3',
  },
  baseUrl: './cello/',
  name: 'cello',
};

const clarinetUrl = {
  notes: {
    D3: 'D3.[mp3|ogg]',
    D4: 'D4.[mp3|ogg]',
    D5: 'D5.[mp3|ogg]',
    D6: 'D6.mp3',
    F3: 'F3.[mp3|ogg]',
    F4: 'F4.[mp3|ogg]',
    F5: 'F5.[mp3|ogg]',
    F6: 'F6.[mp3|ogg]',
    'G#3': 'Gs3.mp3',
    'G#4': 'Gs4.mp3',
    'G#5': 'Gs5.mp3',
    'G#6': 'Gs6.mp3',
    B3: 'B3.[mp3|ogg]',
    B4: 'B4.[mp3|ogg]',
    B5: 'B5.[mp3|ogg]',
    B6: 'B6.[mp3|ogg]',
  },
  baseUrl: './clarinet/',
  name: 'clarinet',
};

const contrabassUrl = {
  notes: {
    A1: 'A1.mp3',
    A2: 'A2.mp3',
    A3: 'A3.mp3',
    B2: 'B2.mp3',
    B3: 'B3.mp3',
    'C#2': 'Cs2.mp3',
    'C#4': 'Cs4.mp3',
    D2: 'D2.mp3',
    D3: 'D3.mp3',
    E1: 'E1.mp3',
    E2: 'E2.mp3',
    E4: 'E4.mp3',
    F3: 'F3.mp3',
    G1: 'G1.mp3',
    G4: 'G4.mp3',
    'G#2': 'Gs2.mp3',
  },
  baseUrl: './contrabass/',
  name: 'contrabass',
};

const fluteUrls = {
  notes: {
    A6: 'A5.[mp3|ogg]',
    C4: 'C3.[mp3|ogg]',
    C5: 'C4.[mp3|ogg]',
    C6: 'C5.[mp3|ogg]',
    C7: 'C6.[mp3|ogg]',
    E4: 'E3.[mp3|ogg]',
    E5: 'E4.[mp3|ogg]',
    E6: 'E5.[mp3|ogg]',
    A4: 'A3.[mp3|ogg]',
    A5: 'A4.[mp3|ogg]',

  },
  baseUrl: './flute/',
  name: 'flute',
};

const frenchhornUrls = {
  notes: {
    D2: 'D2.[mp3|ogg]',
    D4: 'D4.[mp3|ogg]',
    'D#1': 'Ds1.[mp3|ogg]',
    F2: 'F2.[mp3|ogg]',
    F4: 'F4.[mp3|ogg]',
    G1: 'G1.[mp3|ogg]',
    A0: 'A0.[mp3|ogg]',
    A2: 'A2.[mp3|ogg]',
    C1: 'C1.[mp3|ogg]',
    C3: 'C3.[mp3|ogg]',

  },
  baseUrl: './french-horn/',
  name: 'frenchhorn',
};

const acousticguitarUrls = {
  notes: {
    F4: 'F3.[mp3|ogg]',
    'F#2': 'Fs1.[mp3|ogg]',
    'F#3': 'Fs2.[mp3|ogg]',
    'F#4': 'Fs3.[mp3|ogg]',
    G2: 'G1.[mp3|ogg]',
    G3: 'G2.[mp3|ogg]',
    G4: 'G3.[mp3|ogg]',
    'G#2': 'Gs1.[mp3|ogg]',
    'G#3': 'Gs2.[mp3|ogg]',
    'G#4': 'Gs3.[mp3|ogg]',
    A2: 'A1.[mp3|ogg]',
    A3: 'A2.[mp3|ogg]',
    A4: 'A3.[mp3|ogg]',
    'A#2': 'As1.[mp3|ogg]',
    'A#3': 'As2.[mp3|ogg]',
    'A#4': 'As3.[mp3|ogg]',
    B2: 'B1.[mp3|ogg]',
    B3: 'B2.[mp3|ogg]',
    B4: 'B3.[mp3|ogg]',
    C3: 'C2.[mp3|ogg]',
    C4: 'C3.[mp3|ogg]',
    C5: 'C4.[mp3|ogg]',
    'C#3': 'Cs2.[mp3|ogg]',
    'C#4': 'Cs3.[mp3|ogg]',
    'C#5': 'Cs4.[mp3|ogg]',
    D2: 'D1.[mp3|ogg]',
    D3: 'D2.[mp3|ogg]',
    D4: 'D3.[mp3|ogg]',
    D5: 'D4.[mp3|ogg]',
    'D#2': 'Ds1.[mp3|ogg]',
    'D#3': 'Ds2.[mp3|ogg]',
    'D#4': 'Ds3.[mp3|ogg]',
    E2: 'E1.[mp3|ogg]',
    E3: 'E2.[mp3|ogg]',
    E4: 'E3.[mp3|ogg]',
    F2: 'F1.[mp3|ogg]',
    F3: 'F2.[mp3|ogg]',

  },
  baseUrl: './guitar-acoustic/',
  name: 'acousticguitar',
};


const electricguitarUrls = {
  notes: {
    'D#3': 'Ds3.[mp3|ogg]',
    'D#4': 'Ds4.[mp3|ogg]',
    'D#5': 'Ds5.[mp3|ogg]',
    E2: 'E2.[mp3|ogg]',
    'F#2': 'Fs2.[mp3|ogg]',
    'F#3': 'Fs3.[mp3|ogg]',
    'F#4': 'Fs4.[mp3|ogg]',
    'F#5': 'Fs5.[mp3|ogg]',
    A2: 'A2.[mp3|ogg]',
    A3: 'A3.[mp3|ogg]',
    A4: 'A4.[mp3|ogg]',
    A5: 'A5.[mp3|ogg]',
    C3: 'C3.[mp3|ogg]',
    C4: 'C4.[mp3|ogg]',
    C5: 'C5.[mp3|ogg]',
    C6: 'C6.[mp3|ogg]',
    'C#2': 'Cs2.[mp3|ogg]',
  },
  baseUrl: './guitar-electric/',
  name: 'electricguitar',
};

const nylonguitarUrls = {
  notes: {
    'F#2': 'Fs2.[mp3|ogg]',
    'F#3': 'Fs3.[mp3|ogg]',
    'F#4': 'Fs4.[mp3|ogg]',
    'F#5': 'Fs5.[mp3|ogg]',
    G3: 'G3.[mp3|ogg]',
    G5: 'G5.[mp3|ogg]',
    'G#2': 'Gs2.[mp3|ogg]',
    'G#4': 'Gs4.[mp3|ogg]',
    'G#5': 'Gs5.[mp3|ogg]',
    A2: 'A2.[mp3|ogg]',
    A3: 'A3.[mp3|ogg]',
    A4: 'A4.[mp3|ogg]',
    A5: 'A5.[mp3|ogg]',
    'A#5': 'As5.[mp3|ogg]',
    B1: 'B1.[mp3|ogg]',
    B2: 'B2.[mp3|ogg]',
    B3: 'B3.[mp3|ogg]',
    B4: 'B4.[mp3|ogg]',
    'C#3': 'Cs3.[mp3|ogg]',
    'C#4': 'Cs4.[mp3|ogg]',
    'C#5': 'Cs5.[mp3|ogg]',
    D2: 'D2.[mp3|ogg]',
    D3: 'D3.[mp3|ogg]',
    'D#5': 'D5.[mp3|ogg]',
    'D#4': 'Ds4.[mp3|ogg]',
    E2: 'E2.[mp3|ogg]',
    E3: 'E3.[mp3|ogg]',
    E4: 'E4.[mp3|ogg]',
    E5: 'E5.[mp3|ogg]',
  },
  baseUrl: './guitar-nylon/',
  name: 'nylonguitar',
};


const harmoniumUrls = {
  notes: {
    C2: 'C2.[mp3|ogg]',
    C3: 'C3.[mp3|ogg]',
    C4: 'C4.[mp3|ogg]',
    C5: 'C5.[mp3|ogg]',
    'C#2': 'Cs2.[mp3|ogg]',
    'C#3': 'Cs3.[mp3|ogg]',
    'C#4': 'Cs4.[mp3|ogg]',
    'C#5': 'Cs5.[mp3|ogg]',
    D2: 'D2.[mp3|ogg]',
    D3: 'D3.[mp3|ogg]',
    D4: 'D4.[mp3|ogg]',
    D5: 'D5.[mp3|ogg]',
    'D#2': 'Ds2.[mp3|ogg]',
    'D#3': 'Ds3.[mp3|ogg]',
    'D#4': 'Ds4.[mp3|ogg]',
    E2: 'E2.[mp3|ogg]',
    E3: 'E3.[mp3|ogg]',
    E4: 'E4.[mp3|ogg]',
    F2: 'F2.[mp3|ogg]',
    F3: 'F3.[mp3|ogg]',
    F4: 'F4.[mp3|ogg]',
    'F#2': 'Fs2.[mp3|ogg]',
    'F#3': 'Fs3.[mp3|ogg]',
    G2: 'G2.[mp3|ogg]',
    G3: 'G3.[mp3|ogg]',
    G4: 'G4.[mp3|ogg]',
    'G#2': 'Gs2.[mp3|ogg]',
    'G#3': 'Gs3.[mp3|ogg]',
    'G#4': 'Gs4.[mp3|ogg]',
    A2: 'A2.[mp3|ogg]',
    A3: 'A3.[mp3|ogg]',
    A4: 'A4.[mp3|ogg]',
    'A#2': 'As2.[mp3|ogg]',
    'A#3': 'As3.[mp3|ogg]',
    'A#4': 'As4.[mp3|ogg]',
  },
  baseUrl: './harmonium/',
  name: 'harmonium',
};

const harpUrls = {
  notes: {
    C5: 'C5.[mp3|ogg]',
    D2: 'D2.[mp3|ogg]',
    D4: 'D4.[mp3|ogg]',
    D6: 'D6.[mp3|ogg]',
    D7: 'D7.[mp3|ogg]',
    E1: 'E1.[mp3|ogg]',
    E3: 'E3.[mp3|ogg]',
    E5: 'E5.[mp3|ogg]',
    F2: 'F2.[mp3|ogg]',
    F4: 'F4.[mp3|ogg]',
    F6: 'F6.[mp3|ogg]',
    F7: 'F7.[mp3|ogg]',
    G1: 'G1.[mp3|ogg]',
    G3: 'G3.[mp3|ogg]',
    G5: 'G5.[mp3|ogg]',
    A2: 'A2.[mp3|ogg]',
    A4: 'A4.[mp3|ogg]',
    A6: 'A6.[mp3|ogg]',
    B1: 'B1.[mp3|ogg]',
    B3: 'B3.[mp3|ogg]',
    B5: 'B5.[mp3|ogg]',
    B6: 'B6.[mp3|ogg]',
    C3: 'C3.[mp3|ogg]',

  },
  baseUrl: './harp/',
  name: 'harp',
};

const organUrls = {
  notes: {
    C3: 'C3.[mp3|ogg]',
    C4: 'C4.[mp3|ogg]',
    C5: 'C5.[mp3|ogg]',
    C6: 'C6.[mp3|ogg]',
    'D#1': 'Ds1.[mp3|ogg]',
    'D#2': 'Ds2.[mp3|ogg]',
    'D#3': 'Ds3.[mp3|ogg]',
    'D#4': 'Ds4.[mp3|ogg]',
    'D#5': 'Ds5.[mp3|ogg]',
    'F#1': 'Fs1.[mp3|ogg]',
    'F#2': 'Fs2.[mp3|ogg]',
    'F#3': 'Fs3.[mp3|ogg]',
    'F#4': 'Fs4.[mp3|ogg]',
    'F#5': 'Fs5.[mp3|ogg]',
    A1: 'A1.[mp3|ogg]',
    A2: 'A2.[mp3|ogg]',
    A3: 'A3.[mp3|ogg]',
    A4: 'A4.[mp3|ogg]',
    A5: 'A5.[mp3|ogg]',
    C1: 'C1.[mp3|ogg]',
    C2: 'C2.[mp3|ogg]',
  },
  baseUrl: './organ/',
  name: 'organ',
};

const saxophoneUrls = {
  notes: {
    'D#4': 'Ds4.[mp3|ogg]',
    E2: 'E2.[mp3|ogg]',
    E3: 'E3.[mp3|ogg]',
    E4: 'E4.[mp3|ogg]',
    F2: 'F2.[mp3|ogg]',
    F3: 'F3.[mp3|ogg]',
    F4: 'F4.[mp3|ogg]',
    'F#2': 'Fs2.[mp3|ogg]',
    'F#3': 'Fs3.[mp3|ogg]',
    'F#4': 'Fs4.[mp3|ogg]',
    G2: 'G2.[mp3|ogg]',
    G3: 'G3.[mp3|ogg]',
    G4: 'G4.[mp3|ogg]',
    'G#2': 'Gs2.[mp3|ogg]',
    'G#3': 'Gs3.[mp3|ogg]',
    'G#4': 'Gs4.[mp3|ogg]',
    A3: 'A3.[mp3|ogg]',
    A4: 'A4.[mp3|ogg]',
    'A#2': 'As2.[mp3|ogg]',
    'A#3': 'As3.[mp3|ogg]',
    B2: 'B2.[mp3|ogg]',
    B3: 'B3.[mp3|ogg]',
    C3: 'C3.[mp3|ogg]',
    C4: 'C4.[mp3|ogg]',
    'C#2': 'Cs2.[mp3|ogg]',
    'C#3': 'Cs3.[mp3|ogg]',
    'C#4': 'Cs4.[mp3|ogg]',
    D2: 'D2.[mp3|ogg]',
    D3: 'D3.[mp3|ogg]',
    D4: 'D4.[mp3|ogg]',
    'D#2': 'Ds2.[mp3|ogg]',
    'D#3': 'Ds3.[mp3|ogg]',

  },
  baseUrl: './saxophone/',
  name: 'saxophone',
};

const tromboneUrls = {
  notes: {
    'A#2': 'As2.[mp3|ogg]',
    C2: 'C2.[mp3|ogg]',
    C3: 'C3.[mp3|ogg]',
    'C#1': 'Cs1.[mp3|ogg]',
    'C#3': 'Cs3.[mp3|ogg]',
    D2: 'D2.[mp3|ogg]',
    D3: 'D3.[mp3|ogg]',
    'D#1': 'Ds1.[mp3|ogg]',
    'D#2': 'Ds2.[mp3|ogg]',
    'D#3': 'Ds3.[mp3|ogg]',
    F1: 'F1.[mp3|ogg]',
    F2: 'F2.[mp3|ogg]',
    F3: 'F3.[mp3|ogg]',
    'G#1': 'Gs1.[mp3|ogg]',
    'G#2': 'Gs2.[mp3|ogg]',
    'A#0': 'As0.[mp3|ogg]',
    'A#1': 'As1.[mp3|ogg]',

  },
  baseUrl: './trombone/',
  name: 'trombone',
};

const trumpetUrls = {
  notes: {
    C5: 'C5.[mp3|ogg]',
    D4: 'D4.[mp3|ogg]',
    'D#3': 'Ds3.[mp3|ogg]',
    F2: 'F2.[mp3|ogg]',
    F3: 'F3.[mp3|ogg]',
    F4: 'F4.[mp3|ogg]',
    G3: 'G3.[mp3|ogg]',
    A2: 'A2.[mp3|ogg]',
    A4: 'A4.[mp3|ogg]',
    'A#3': 'As3.[mp3|ogg]',
    C3: 'C3.[mp3|ogg]',

  },
  baseUrl: './trumpet/',
  name: 'trumpet',
};

const tubaUrls = {
  notes: {
    'A#1': 'As1.[mp3|ogg]',
    'A#2': 'As2.[mp3|ogg]',
    D2: 'D2.[mp3|ogg]',
    D3: 'D3.[mp3|ogg]',
    'D#1': 'Ds1.[mp3|ogg]',
    F0: 'F0.[mp3|ogg]',
    F1: 'F1.[mp3|ogg]',
    F2: 'F2.[mp3|ogg]',
    'A#0': 'As0.[mp3|ogg]',

  },
  baseUrl: './tuba/',
  name: 'tuba',
};

const violinUrls = {
  notes: {
    A3: 'A3.[mp3|ogg]',
    A4: 'A4.[mp3|ogg]',
    A5: 'A5.[mp3|ogg]',
    A6: 'A6.[mp3|ogg]',
    C4: 'C4.[mp3|ogg]',
    C5: 'C5.[mp3|ogg]',
    C6: 'C6.[mp3|ogg]',
    C7: 'C7.[mp3|ogg]',
    E4: 'E4.[mp3|ogg]',
    E5: 'E5.[mp3|ogg]',
    E6: 'E6.[mp3|ogg]',
    G4: 'G4.[mp3|ogg]',
    G5: 'G5.[mp3|ogg]',
    G6: 'G6.[mp3|ogg]',

  },
  baseUrl: './violin/',
  name: 'violin',
};

const xylophoneUrls = {
  notes: {
    C7: 'C7.[mp3|ogg]',
    G3: 'G3.[mp3|ogg]',
    G4: 'G4.[mp3|ogg]',
    G5: 'G5.[mp3|ogg]',
    G6: 'G6.[mp3|ogg]',
    C4: 'C4.[mp3|ogg]',
    C5: 'C5.[mp3|ogg]',
    C6: 'C6.[mp3|ogg]',

  },
  baseUrl: './xylophone/',
  name: 'xylophone',
};

const urls = [drumUrls, pianoUrls, electricBassUrls, bassoonUrls, celloUrls, clarinetUrl,
  contrabassUrl, fluteUrls, frenchhornUrls, acousticguitarUrls, electricguitarUrls,
  nylonguitarUrls, harmoniumUrls, harpUrls, organUrls, saxophoneUrls, tromboneUrls, trumpetUrls,
  tubaUrls, violinUrls, xylophoneUrls, electricdrumUrls];

urls.forEach((url) => {
  module.exports[url.name] = {};
  Object.keys(url.notes).forEach((note) => {
    module.exports[url.name][note] = new Tone.Buffer(url.baseUrl + url.notes[note]);
  });
});
