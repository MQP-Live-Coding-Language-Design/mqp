/**
 * A Phrase is the list of Groups to be played
 */

class Phrase {
  constructor(groups) {
    this.groups = groups; // list of groups forming this Phrase
    this.instrument = null;
    this.filter = null;
    this.parent = null;
    this.next = 0; // group to be played on retrigger
  }

  /**
   * Adds a Group to this Phrase's groups
   * @param {Group} group to be added to this Phrase
   */
  add(group) {
    this.groups.unshift(group);
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
    return new Phrase(newGroups);
  }

  trigger(parent, instrument, filter, time) {
    this.parent = parent;
    this.instrument = instrument;
    this.filter = filter;
    this.next = 1;
    this.groups[0].trigger(this, instrument, filter, time);
  }

  retrigger(time) {
    if (this.next < this.groups.length) {
      this.groups[this.next].trigger(this, this.instrument, this.filter, time);
      this.next += 1;
    } else {
      const temp = this.parent;
      this.parent = null;
      this.instrument = null;
      temp.retrigger(time);
    }
  }
}

module.exports = Phrase;
