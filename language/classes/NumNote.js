const Tone = require('tone');
const defaults = require('../defaults');

/**
 * A Note is a Group representing a note
 */
class NumNote {
  constructor(number) {
    this.number = number;
    this.octave = 0;
    this.frequency = null;
    this.updated = true;
    this.scale = { key: defaults.defaultScale.key, type: defaults.defaultScale.type };
    this.sustain = defaults.defaultSustain; // {float} proportion of gap time (0-1) to sustain note
    this.gap = defaults.defaultGap; // {float} gap between a note and the next
  }

  octChange(n) {
    this.octave += n;
    this.updated = true;
  }

  pitchChange(n) {
    this.number += n;
    this.updated = true;
  }

  tempoChange(n) {
    this.gap *= n;
    this.updated = true;
  }

  scaleChange(key, type) {
    if (key) {
      this.scale.key = key;
      this.updated = true;
    }
    if (type) {
      this.scale.type = defaults.scales[type];
      this.updated = true;
    }
  }

  get length() {
    return this.gap;
  }

  get copy() {
    const newNote = new NumNote(this.number);
    newNote.tempoChange(this.gap / defaults.defaultGap);
    newNote.octChange(this.octave);
    newNote.scaleChange(this.scale.key, this.scale.type.name);
    // TODO: Copy sustain
    return newNote;
  }

  updateFrequency() {
    let frequency = new Tone.Frequency(this.scale.key + defaults.defaultOctave);
    frequency = frequency.transpose(this.octave * this.scale.type.octave);
    const index = ((this.number % this.scale.type.length) + this.scale.type.length) % this.scale.type.length;
    frequency = frequency.transpose(this.scale.type.intervals[index]);
    this.frequency = frequency.transpose(Math.round((this.number - index) / this.scale.type.length) * this.scale.type.octave);
  }

  trigger(inst, time) {
    if (this.updated) {
      this.updateFrequency();
      this.updated = false;
    }
    // tell Tone.js to trigger the note at parameter time
    inst.triggerAttackRelease(this.frequency, this.gap * this.sustain, time);

    const nxtTime = Tone.TransportTime(time + this.gap);
    return { time: nxtTime, memory: null };
  }
}

module.exports = NumNote;
