const Tone = require('tone');
const defaults = require('../defaults');

/**
 * A Note is a Group representing a note
 */
class Note {
  constructor(frequency) {
    this.frequency = frequency; // {Tone.Frequency} pitch of the note
    this.sustain = defaults.defaultSustain; // {float} proportion of gap time (0-1) to sustain note
    this.gap = defaults.defaultGap; // {float} gap between a note and the next
  }

  octChange(n) {
    this.frequency = this.frequency.transpose(12 * n);
  }

  pitchChange(n) {
    this.frequency = this.frequency.transpose(n);
  }

  tempoChange(n) {
    this.gap *= n;
  }

  scaleChange() { return this; }

  get length() {
    return this.gap;
  }

  get copy() {
    const newNote = new Note(this.frequency);
    newNote.tempoChange(this.gap / defaults.defaultGap);
    // TODO: Copy sustain
    return newNote;
  }

  trigger(inst, time) {
    // tell Tone.js to trigger the note at parameter time
    inst.triggerAttackRelease(this.frequency, this.gap * this.sustain, time);

    const nxtTime = Tone.TransportTime(time + this.gap);
    return { time: nxtTime, memory: null };
  }
}

module.exports = Note;
