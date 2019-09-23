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

  get length() {
    return this.gap;
  }

  get copy() {
    const ret = new Rest();
    ret.tempoChange(this.gap / defaults.defaultGap);
    return ret;
  }

  trigger(par, inst, time) {
    const nxtTime = Tone.Time(time + this.gap); // schedules a retrigger of parent for when it plays
    Tone.Transport.scheduleOnce(() => { par.retrigger(nxtTime); }, time);
  }
}

module.exports = Rest;
