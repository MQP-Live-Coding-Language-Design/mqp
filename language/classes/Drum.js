// import defaultGap from '../defaults';

const Tone = require('tone');
const defaults = require('../defaults');

/**
 * An Audio is a Group representing an audio file
 */

class Drum {
  constructor(frequency) {
    this.frequency = frequency;
    this.gap = defaults.defaultGap; // {float} gap between a note and the next
  }

  octChange() { return this; }

  pitchChange() { return this; }

  tempoChange(n) {
    this.gap *= n;
  }

  get length() {
    return this.gap;
  }

  get copy() {
    const ret = new Drum(this.frequency);
    ret.tempoChange(this.gap / defaults.defaultGap);
    return ret;
  }

  trigger(inst, time) {
    const nxtTime = Tone.TransportTime(time + this.gap);

    inst.triggerAttack(time); // tell tone.js to play the sound at the given time

    return { time: nxtTime, memory: null };
  }
}

module.exports = Drum;
