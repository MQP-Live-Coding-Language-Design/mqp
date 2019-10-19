const Tone = require('tone');
const defaults = require('../defaults');

/**
 * A Rest is a Group representing a Rest
 */

class Rest {
  constructor() {
    this.gap = defaults.defaultGap; // {float} representing gap between this note and next
  }

  octChange() { return this; }

  pitchChange() { return this; }

  tempoChange(n) {
    this.gap *= n;
  }

  scaleChange() { return this; }

  get length() {
    return this.gap;
  }

  get copy() {
    const ret = new Rest();
    ret.tempoChange(this.gap / defaults.defaultGap);
    return ret;
  }

  trigger(inst, time) {
    // schedules a retrigger of parent for when it plays
    const nxtTime = Tone.TransportTime(time + this.gap);
    return { time: nxtTime, memory: null };
  }
}

module.exports = Rest;
