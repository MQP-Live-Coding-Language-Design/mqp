/**
 * A Random is the list of Groups to be randomly selected from
 */

class Random {
  constructor(groups) {
    this.groups = groups; // list of groups forming this Random
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

  get length() {
    return this.groups[0].length;
  }

  get copy() {
    const newGroups = [];
    this.groups.forEach((group) => {
      newGroups.push(group.copy);
    });
    return new Random(newGroups);
  }

  trigger(instrument, time, obj) {
    let num;
    let memory;
    if (obj === null) {
      num = Math.floor(Math.random() * this.groups.length);
      memory = null;
    } else {
      num = obj.num;
      memory = obj.memory;
    }

    const ret = this.groups[num].trigger(instrument, time, memory);
    if (ret.memory === null) {
      return { time: ret.time, memory: null };
    }
    return { time: ret.time, memory: { num, memory: ret.memory } };
  }
}

module.exports = Random;
