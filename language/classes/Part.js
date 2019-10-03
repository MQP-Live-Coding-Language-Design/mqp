const Tone = require('tone');

/**
 * A Part represents the combination of a Phrase and instrument
 */
class Part {
  constructor(inst, filter, phrase) {
    this.inst = inst;
    this.filter = filter;
    this.phrase = phrase.copy; // {Phrase} being played by this Part
    this.running = false;
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
      startTime = Tone.TransportTime(startTime);

      this.phrase.trigger(this, this.inst, this.filter, startTime);
      this.running = true;
    }
  }

  /**
   * Marks this Part to stop running once the cycle ends
   */
  stop() {
    this.running = false;
  }

  /**
   * Called on Part by its child when the child is done running
   * The Part will start its child again if it is still running
   * Tor stop if the Part is no longer running
   * @param  {string} time something like "4n" that would represent a 1/4 note
   */
  retrigger(time) {
    if (this.running) this.phrase.trigger(this, this.inst, this.filter, time);
  }
}

module.exports = Part;
