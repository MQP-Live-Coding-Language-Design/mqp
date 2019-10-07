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
  start() {
    if (!this.running) {
      const now = Tone.TransportTime(Tone.Transport.seconds);
      const { length } = this.phrase;
      let startTime = now.quantize(length); // round startTime to length of phrase
      if (startTime <= now) startTime += length; // ensure startTime is now or later
      this.time = Tone.TransportTime(startTime);
      this.running = true;

      this.continue();
    }
  }

  continue() {
    if (this.running) {
      Tone.Transport.scheduleOnce(() => { this.continue(); }, this.time);
      const temp = this.phrase.trigger(this.inst, this.time, this.memory);
      this.memory = temp.memory;
      this.time = temp.time;
    }
  }

  /**
   * Marks this Part to stop running once the cycle ends
   */
  stop() {
    this.running = false;
  }
}

module.exports = Part;
