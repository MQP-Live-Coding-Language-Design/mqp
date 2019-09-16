/**
 * An Audio is a Group representing an audio file
 */

class Audio {
  constructor(buffer) {
    this.buffer = buffer;
    this.player = new Tone.Player(buffer).toMaster(); // Tone.Player which contains the sound
    this.player.volume.value = -5;
    this.gap = defaultGap; // {float} gap between a note and the next
  }

  tempoChange(n) {
    this.gap *= n;
  }

  get length() {
    return this.gap;
  }

  get copy() {
    const ret = new Audio(this.buffer);
    ret.tempoChange(this.gap / defaultGap);
    return ret;
  }

  trigger(par, inst, time) {
    this.player.start(time); // tell tone.js to play the sound at the given time

    const nxtTime = Tone.Time(time + this.gap); // schedules a retrigger of parent for when it plays
    Tone.Transport.scheduleOnce(() => { par.retrigger(nxtTime); }, time);
  }
}

module.exports = Audio;
