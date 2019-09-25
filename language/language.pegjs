{
  const Tone = require('tone');
  const defaults = require('./defaults');
  const samples = require('./samples')
  const classes = require('./classes/classes');

  let returnParts = [];
}

start
  = _ multiLines _ { return returnParts; }

// Multiple sequences
multiLines
 = line _ multiLines
 / & {return true;}

// Single sequence
line
  = '"' _ notes:noteseq _ '"' _ mods:modifierseq
  {
    notes = new classes.Phrase(notes);
	  for (var i = 0; i < mods.length; i++) {
		  mods[i](notes);
	  }
  }

// Written sequence of notes, contained within quotes
// Returns a Phrase containing the notes
noteseq
  = note:note __ seq:noteseq { return [note].concat(seq); }
  / note:note { return [note]; }

// A single note
// Returns a Note
note
  = note:notestart ext:(_ "~")* { note.tempoChange(ext.length + 1); return note; }

// The base of a note
// Returns a Note
notestart
  = note:$([A-G]i [#b]?) oct:octmod { return new classes.Note(Tone.Frequency(note+oct)); }
  / "o" { return new classes.Audio(samples.kick); }
  / "x" { return new classes.Audio(samples.snare); }
  / "--" { return new classes.Audio(samples.ophat); }
  / "-" { return new classes.Audio(samples.hat); }
  / "_" { return new classes.Rest(); }

// Optional octave modifier for after a note
// Returns an int representing the octave of the note
octmod
  = num:$([0-9]+) { return parseInt(num); }
  / mod:nummod { return defaults.defaultOctave + mod; }

// Either a sequence of +'s and -'s or a single + or - followed by a number
// Multiple uses
// Returns an int based on the input
nummod
  = num:$([+-] [0-9]+) { return parseInt(num); }
  / signs:[+-]* {
	  let count = 0;
	  for (var s of signs) {
		  if (s === "+") count += 1;
		  else count -= 1;
	  }
	  return count;
  }

// Multiple modifiers following a string of notes
// Returns a list of functions to be performed on the sequence
modifierseq
  = mod:modifier _ seq:modifierseq { return [mod].concat(seq); }
  / & {return true;} { return []; }

// Single modifier for a sequence
// Returns a function to be performed on the sequnece
modifier
  = '>>' _ "octave" _ mod:nummod { return function(phrase) {phrase.octChange(mod);}; }
  / '>>' _ "pitch" _ mod:nummod { return function(phrase) {phrase.pitchChange(mod);}; }
  / '>>' _ "tempo" _ mod:fltOrFrac { return function(phrase) {phrase.tempoChange(mod);}; }
  / '>>' _ plr:player { return plr; }
  / '>>' _ "play" { return function(phrase) { let np = new classes.Part(null, phrase); returnParts.push(np); np.start(); }; }

// Instrument plus its attributes and filters
// Returns a function that plays a phrase
player
  = inst:instrument attr:attributeseq _ fltr:filterseq
{
  for (var a of attr) {
    inst.set(a);
  }
  let last = inst;
  for (var f of fltr) {
    last.connect(f);
    if (f !== Tone.Master)
      last = f;
  }
  last.toMaster();

  return function(phrase) { let np = new classes.Part(inst, phrase); returnParts.push(np); np.start(); };
}

// A default instrument
// Returns a new Tone.Synth
instrument
  = "triangle" { return new Tone.Synth({volume: defaults.defaultVolume}); }
  / "soft" { return new Tone.Synth({oscillator: {type: "sine2", partials: [1, .5], volume: defaults.defaultVolume}}); }
  / "saw" { return new Tone.Synth({oscillator: {type: "fatsawtooth", volume: defaults.defaultVolume, spread: 40}}); }
// A sequence of instrument attributes
// Returns a list of dictionaries which can be set on an instrument
attributeseq
  = __ attr:attribute seq:attributeseq { return seq.concat([attr]); }
  / & {return true;} { return []; }

// A single attribute for an instrument
// Returns a dictionary which can be set on an instrument
attribute
  = "wave" __ wave:("sine"/"triangle"/"square"/"sawtooth") { return {oscillator: {type: wave}}; }
  / "volume" __ sign:"-"? num:fltOrFrac { if (sign !== null) num *= -1; return {volume: num+defaults.defaultVolume}; }

// A sequence of filters for an Instrument
// Returns a list of Tone effects
filterseq
  = ">" _ fltr:filter seq:filterseq { return [fltr].concat(seq); } //Order?
  / "&" _ seq:filterseq { return [Tone.Master].concat(seq); }
  / & {return true;} { return []; }

// A single filter for an instrument
// Returns a Tone effect
filter
  = "pingpong" __ delay:fltOrFrac { return new Tone.PingPongDelay(delay); }

// Float or fraction
// Returns the value as a float
fltOrFrac
  = num1:$([0-9.]+) num2:$("/" [.0-9]+)? {
	  if (num2 === "") return parseFloat(num1);
	  return parseFloat(num1) / num2.replace("/", "0");
  }

// optional whitespace
_  = [ \t\r\n]*

// mandatory whitespace
__ = [ \t\r\n]+
