/**
 * A Note is a Group representing a note
 */
class Note {
  constructor(frequency) {
    this.frequency = frequency; // {Tone.Frequency} pitch of the note
    this.sustain = defaultSustain; // {float} proportion of gap time (0-1) to sustain a note
    this.gap = defaultGap; // {float} gap between a note and the next
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
    newNote.tempoChange(this.gap / defaultGap);
    // TODO: Copy sustain
    return newNote;
  }

  trigger(par, inst, time) {
    // tell Tone.js to trigger the note at parameter time
    inst.triggerAttackRelease(this.frequency, this.gap * this.sustain, time);

    const nxtTime = Tone.Time(time + this.gap); // schedules retrigger of parent
    Tone.Transport.scheduleOnce(() => { par.retrigger(nxtTime); }, time);
  }
}

module.exports = Note;
