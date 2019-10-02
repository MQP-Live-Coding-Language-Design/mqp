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
    this.instrument = null;
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

  get length() {
    return this.gap;
  }

  get copy() {
    const newNote = new Note(this.frequency);
    newNote.tempoChange(this.gap / defaults.defaultGap);
    // TODO: Copy sustain
    return newNote;
  }

  trigger(par, inst, filter, time) {
    if (this.instrument === null) {
      this.instrument = new Tone.Synth(inst).connect(filter);
    }
    // tell Tone.js to trigger the note at parameter time
    this.instrument.triggerAttackRelease(this.frequency, this.gap * this.sustain, time);

    const nxtTime = Tone.TransportTime(time + this.gap); // schedules retrigger of parent
    Tone.Transport.scheduleOnce(() => { par.retrigger(nxtTime); }, time);
  }
}

module.exports = Note;
