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
    notes = new classes.Sequential(notes);
	  for (var i = 0; i < mods.length; i++) {
		  mods[i](notes);
	  }
  }

// Written sequence of notes, contained within quotes
// Returns a list of Groups
noteseq
  = note:note __ seq:noteseq { return [note].concat(seq); }
  / note:note { return [note]; }

// A single Group
// Returns a Group
note
  = "chord(" _ seq:noteseq _ ")" { return new classes.Chord(seq); }
  / note:notestart __ ext:$([0-9]+) "~" { note.tempoChange(parseInt(ext) + 1); return note; }
  / note:notestart ext:(_ "~")* { note.tempoChange(ext.length + 1); return note; }
  / "(" _ seq:noteseq  _ ")" { return new classes.Sequential(seq); }
  / "rand(" _ seq:noteseq _ ")" { return new classes.Random(seq); }

// The base of a note
// Returns a Note
notestart
  = note:$([A-G]i [#b]?) oct:octmod { return new classes.Note(Tone.Frequency(note+oct)); }
  / "o" { return new classes.Note(Tone.Frequency("D3")); }
  / "x" { return new classes.Note(Tone.Frequency("E3")); }
  / "--" { return new classes.Note(Tone.Frequency("F3")); }
  / "-" { return new classes.Note(Tone.Frequency("C3")); }
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
  / '>>' _ "duration" _ mod:fltOrFrac { return function(phrase) {phrase.tempoChange(mod);}; }
  / '>>' _ plr:player { return plr; }

// Instrument plus its attributes and filters
// Returns a Tone player
player
  = samp:sampler _ fltr:filterseq
  {
    let first = new Tone.Volume(defaults.defaultVolume);
    let last = first;
    for (var f of fltr) {
      last.connect(f);
      if (f !== Tone.Master)
        last = f;
    }
    last.toMaster();
    samp.connect(first);

    return function(phrase) { let np = new classes.Part(samp, phrase); returnParts.push(np); };
  }
  / inst:instrument attr:attributeseq _ fltr:filterseq
{
  for (var a of attr) {
    a(inst);
  }
  let retInstrument = new Tone.PolySynth(6, Tone.Synth, inst);
  let first = new Tone.Volume(defaults.defaultVolume);
  let last = first;
  for (var f of fltr) {
    last.connect(f);
    if (f !== Tone.Master)
      last = f;
  }
  last.toMaster();
  retInstrument.connect(first);

  return function(phrase) { let np = new classes.Part(retInstrument, phrase); returnParts.push(np); };
}

sampler
  = "drums" { return new Tone.Sampler(samples.drums); }
  / "piano" { return new Tone.Sampler(samples.piano); }
  / ("electricbass"/"bass") { return new Tone.Sampler(samples.electricbass); }
  / "bassoon" { return new Tone.Sampler(samples.bassoon); }
  / "cello" { return new Tone.Sampler(samples.cello); }
  / "clarinet" { return new Tone.Sampler(samples.clarinet); }
  / "contrabass" { return new Tone.Sampler(samples.contrabass); }
  / "flute" { return new Tone.Sampler(samples.flute); }
  / ("frenchhorn"/"horn") { return new Tone.Sampler(samples.frenchhorn); }
  / "acousticguitar" { return new Tone.Sampler(samples.acousticguitar); }
  / ("electricguitar"/"guitar") { return new Tone.Sampler(samples.electricguitar); }
  / "nylonguitar" { return new Tone.Sampler(samples.nylonguitar); }
  / "harmonium" { return new Tone.Sampler(samples.harmonium); }
  / "harp" { return new Tone.Sampler(samples.harp); }
  / "organ" { return new Tone.Sampler(samples.organ); }
  / "saxophone" { return new Tone.Sampler(samples.saxophone); }
  / "trombone" { return new Tone.Sampler(samples.trombone); }
  / "trumpet" { return new Tone.Sampler(samples.trumpet); }
  / "tuba" { return new Tone.Sampler(samples.tuba); }
  / "violin" { return new Tone.Sampler(samples.violin); }
  / "xylophone" { return new Tone.Sampler(samples.xylophone); }

// A default instrument
// Returns an object which can be used to create a Tone.Synth
instrument
  = "triangle" { return {oscillator: {}, envelope: {release: .06}}; }
  / "soft" { return {oscillator: {type: "sine2", partials: [1, .5]}, envelope: {release: .06}}; }
  / "fatsaw" { return {oscillator: {type: "fatsawtooth", spread: 40}, envelope: {release: .06}}; }
  / "saw" { return {oscillator: {type: "sawtooth", spread: 40}, envelope: {release: .06}}; }
  / "square" { return {oscillator: {type: "fatsquare", spread: 10, count: 3}, envelope: {release: .06}};}
  / "pls no" { return {oscillator: {type: "pulse", width: .80}, envelope: {release: .06}}; }

// A sequence of instrument attributes
// Returns a list of functions which modify objects
attributeseq
  = __ attr:attribute seq:attributeseq { return [attr].concat(seq); }
  / & {return true;} { return []; }

// A single attribute for an instrument
// Returns a function which modifies an object appropriately
attribute
  = "wave" __ wave:("sine"/"triangle"/"square"/"sawtooth") { return (obj) => { obj.oscillator.type = wave; }; }
  / "volume" __ sign:"-"? num:fltOrFrac { if (sign !== null) num *= -1; return (obj) => { obj.volume = num+defaults.defaultVolume; }; }

// A sequence of filters for an Instrument
// Returns a list of Tone effects
filterseq
  = ">" _ fltr:filter _ seq:filterseq { return [fltr].concat(seq); }
  / "&" _ seq:filterseq { return [Tone.Master].concat(seq); }
  / & {return true;} { return []; }

// A single filter for an instrument
// Returns a Tone effect
filter
  = "pingpong" __ delay:fltOrFrac { return new Tone.PingPongDelay(delay*defaults.defaultGap); }

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
