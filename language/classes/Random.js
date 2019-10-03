/**
 * A Random is the list of Groups to be randomly selected from
 */

class Random {
  constructor(groups) {
    this.groups = groups; // list of groups forming this Random
    this.parent = null;
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

  trigger(parent, instrument, filter, time) {
    this.parent = parent;
    this.groups[Math.floor(Math.random() * this.groups.length)]
      .trigger(this, instrument, filter, time);
  }

  retrigger(time) {
    const temp = this.parent;
    this.parent = null;
    temp.retrigger(time);
  }
}

module.exports = Random;
