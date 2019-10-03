/**
 * A Chord is the list of Groups to be played at the same time
 */

class Chord {
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
    return new Chord(newGroups);
  }

  trigger(parent, instrument, filter, time) {
    this.parent = parent;
    this.groups[0].trigger(this, instrument, filter, time);
    this.groups.slice(1).forEach((group) => {
      group.trigger({ retrigger: () => {} }, instrument, filter, time);
    });
  }

  retrigger(time) {
    const temp = this.parent;
    this.parent = null;
    temp.retrigger(time);
  }
}

module.exports = Chord;
