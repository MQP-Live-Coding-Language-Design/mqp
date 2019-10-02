// import defaultGap from '../defaults';

const Tone = require('tone');
const defaults = require('../defaults');

/**
 * An Audio is a Group representing an audio file
 */

class Audio {
  constructor(buffer) {
    this.buffer = buffer;
    this.player = new Tone.Player(buffer); // Tone.Player which contains the sound
    this.filter = null;
    this.player.volume.value = -5;
    this.gap = defaults.defaultGap; // {float} gap between a note and the next
  }

  tempoChange(n) {
    this.gap *= n;
  }

  get length() {
    return this.gap;
  }

  get copy() {
    const ret = new Audio(this.buffer);
    ret.tempoChange(this.gap / defaults.defaultGap);
    return ret;
  }

  trigger(par, inst, filter, time) {
    const nxtTime = Tone.TransportTime(time + this.gap);

    if (this.filter === null) {
      this.filter = filter;
      this.player.connect(filter);
    }

    this.player.start(time); // tell tone.js to play the sound at the given time

    // schedules a retrigger of parent for when it plays
    Tone.Transport.scheduleOnce(() => { par.retrigger(nxtTime); }, time);
  }
}

module.exports = Audio;
