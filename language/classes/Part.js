const Tone = require('tone');

/**
 * A Part represents the combination of a Phrase and instrument
 */
class Part {
  constructor(inst, phrase) {
    this.inst = inst;
    this.phrase = phrase.copy; // {Phrase} being played by this Part
    this.running = false;
    this.memory = null;
    this.time = 0;
  }

  /**
   * Starts playing the current Phrase
   */
  start(force) {
    if (!this.running) {
      const now = Tone.TransportTime(Tone.Transport.seconds);
      const { length } = this.phrase;
      let startTime = now.quantize(length); // round startTime to length of phrase
      if (force) {
        if (startTime >= now) startTime -= length;
      } else if (startTime <= now) {
        startTime += length; // ensure startTime is now or later
      }
      this.time = Tone.TransportTime(startTime);
      this.running = true;

      if (force) {
        this.ff();
      }

      this.continue();
    }
  }

  ff() {
    const now = Tone.TransportTime(Tone.Transport.seconds);
    const fakeInst = { triggerAttackRelease: () => {}, triggerAttack: () => {} };
    while (now >= this.time) {
      const temp = this.phrase.trigger(fakeInst, this.time, this.memory);
      this.memory = temp.memory;
      this.time = temp.time;
    }
  }

  continue() {
    if (this.running || this.memory !== null) {
      Tone.Transport.scheduleOnce(() => { this.continue(); }, this.time);
      const temp = this.phrase.trigger(this.inst, this.time, this.memory);
      this.memory = temp.memory;
      this.time = temp.time;
    }
  }

  /**
   * Marks this Part to stop running once the cycle ends
   */
  stop(force) {
    this.running = false;
    if (force) {
      // Permenantly silences instrument
      this.inst.disconnect();
    }
  }
}

module.exports = Part;
