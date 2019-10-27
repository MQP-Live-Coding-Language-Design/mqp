const Repeat = require('./Repeat');
const Chord = require('./Chord');
const Random = require('./Random');
/**
 * A Phrase is the list of Groups to be played
 */

class Sequential {
  constructor(groups) {
    this.groups = groups; // list of groups forming this Phrase
  }

  multCopy(type, functions) {
    const newSeq = new Sequential(this.groups);
    const list = [];

    functions.forEach((fcn) => {
      const newnewSeq = newSeq.copy;
      fcn.forEach((f) => {
        f(newnewSeq);
      });
      list.push(newnewSeq);
    });

    if (type === 'seq') {
      this.groups = list;
    }
    if (type === 'chord') {
      this.groups = [new Chord(list)];
    }
    if (type === 'rand') {
      this.groups = [new Random(list)];
    }
  }

  stutter(n) {
    const nl = [];
    this.groups.forEach((group) => {
      nl.push(new Repeat(group.copy, n));
    });
    this.groups = nl;
  }

  octChange(n) {
    this.groups.forEach((group) => {
      group.octChange(n);
    });
  }

  pitchChange(n) {
    this.groups.forEach((group) => {
      group.pitchChange(n);
    });
  }

  tempoChange(n) {
    this.groups.forEach((group) => {
      group.tempoChange(n);
    });
  }

  scaleChange(k, t) {
    this.groups.forEach((group) => {
      group.scaleChange(k, t);
    });
  }

  get length() {
    let sum = 0;
    this.groups.forEach((group) => {
      sum += group.length;
    });
    return sum;
  }

  get copy() {
    const newGroups = [];
    this.groups.forEach((group) => {
      newGroups.push(group.copy);
    });
    return new Sequential(newGroups);
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
    const ret = this.groups[num].trigger(instrument, time, memory);
    if (ret.memory === null) {
      num += 1;
    }

    if (num >= this.groups.length) {
      return { time: ret.time, memory: null };
    }
    return { time: ret.time, memory: { num, memory: ret.memory } };
  }
}

module.exports = Sequential;
