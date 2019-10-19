/**
 * A Chord is the list of Groups to be played at the same time
 */

class Chord {
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

  scaleChange(k, t) {
    this.groups.forEach((group) => {
      group.scaleChange(k, t);
    });
  }

  get length() {
    let max = 0;
    this.groups.forEach((group) => {
      max = Math.max(group.length, max);
    });
    return max;
  }

  get copy() {
    const newGroups = [];
    this.groups.forEach((group) => {
      newGroups.push(group.copy);
    });
    return new Chord(newGroups);
  }

  trigger(instrument, time, obj) {
    const newobj = [];
    let max = 0;
    if (obj === null) {
      for (let i = 0; i < this.groups.length; i += 1) {
        const temp = this.groups[i].trigger(instrument, time, null);
        max = Math.max(max, temp.time);
        if (temp.memory !== null) {
          temp.index = i;
          newobj.push(temp);
        }
      }
    } else {
      let min = obj[0].time;
      obj.forEach((item) => {
        min = Math.min(min, item.time);
      });
      obj.forEach((item) => {
        if (item.time * 1 === min) {
          const temp = this.groups[item.index].trigger(instrument, time, item.memory);
          max = Math.max(max, temp.time);
          if (temp.memory !== null) {
            temp.index = item.index;
            newobj.push(temp);
          }
        }
      });
    }
    if (newobj.length === 0) {
      return { time: max, memory: null };
    }
    let min = newobj[0].time;
    newobj.forEach((item) => {
      min = Math.min(min, item.time);
    });
    return { time: min, memory: newobj };
  }
}

module.exports = Chord;
