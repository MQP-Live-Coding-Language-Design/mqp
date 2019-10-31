/**
 * A Repeat is a group to be played multiple times
 */

class Repeat {
  constructor(group, n) {
    this.group = group; // Single group forming this Phrase
    this.n = n;
  }

  octChange(n) {
    this.group.octChange(n);
  }

  pitchChange(n) {
    this.group.pitchChange(n);
  }

  tempoChange(n) {
    this.group.tempoChange(n);
  }

  scaleChange(k, t) {
    this.group.scaleChange(k, t);
  }

  get length() {
    return this.group.length * this.n;
  }

  get copy() {
    return new Repeat(this.group.copy, this.n);
  }

  trigger(instrument, time, obj) {
    let num;
    let memory;
    if (obj === null) {
      num = 0;
      memory = null;
    } else {
      num = obj.num;
      memory = obj.memory;
    }
    const ret = this.group.trigger(instrument, time, memory);
    if (ret.memory === null) {
      num += 1;
    }

    if (num >= this.n) {
      return { time: ret.time, memory: null };
    }
    return { time: ret.time, memory: { num, memory: ret.memory } };
  }
}

module.exports = Repeat;
