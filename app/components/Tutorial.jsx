import React from 'react';

  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />;

const Tutorial = () => (
  <div>
    To start playing, simply create a sequence of notes and send it to an instrument.
    A note is any letter between 'a' and 'g'. This sequence can then be played on an instrument
    by writing '>>' followed by the instrument name as seen below:
    {' '}
    <br />

    <textarea
      rows="2"
      cols="90"
      id="input"
      defaultValue='
      "a b c" >> soft'
      /* '
        "ab f db eb" >> tempo 2 >> octave - >> soft >> pitch +7 >> soft
        "o _ x _" >> tempo .5 >> play
        "c+ ab g ab c+ ab g ab db ab g ab bb ab g ab" >> tempo .5 >> triangle
        "ab _ _ eb _ _ c _ _ eb _ _ ab _ _ f _ _ db _ f _ ab _ bb _ _ ab _ _ g _" >> octave >> tempo 1/4 >> triangle
        "ab ab eb+" >> tempo 1/4 >> triangle
        "ab _ _ eb _ _ f ab ~ _ _ g _ _ ab bb" >> octave ++ >> tempo .5 >> triangle & > pingpong .25
        "- - - - -- - - -" >> tempo .5 >> play' */
    />
    <br />
    <button type="button" id="Start1">Start</button>
    <button type="button" id="Stop1">Stop</button>
    <br />
    <br />
      Both the notes and the entire sequence of notes can be edited. You make a note sharp or flat
    by adding a '#' or 'b' respectively to the end of the note. The octave of a note defaults to
    4, but can be changed either by specifying an octave (e.g. 'a5' sets the octave to 5) or by
    using +/- to raise and lower this value (e.g. 'a+' sets the octave to 5).
    <br />
      Entire sequences can be modified using the '>>' followed by the modification. The modifiers
    are "octave," "pitch," and "duration". Octave takes either an integer or a series of +/- symbols.
    The +/- move the value from the default of 4 (e.g. ">> octave 6" and ">> octave ++"
    both set the octave to 6). Pitch takes either a series of +/- or a signed integer for the amount to move
    the pitch up or down (e.g. ">> pitch --" and ">> pitch -2" both move the pitch down by 2).
    Duration sets the time for each note in the sequence. It takes either a fraction or a decimal
    (e.g. ">> duration .5" and ">> duration 1/2" do the same thing). Examples are seen below:
    <br />

    <textarea
      rows="2"
      cols="90"
      id="input"
      defaultValue='
      "a b c" >> octave 2 >> pitch -- >> duration .25 >> soft'
    />
    <br />
    <button type="button" id="Start2">Start</button>
    <button type="button" id="Stop2">Stop</button>

    <br />
    <br />

      Like a sequence of notes, the instruments (called parts) can be modified.
    This is done by following the instrument with "^" and then the part modifier and value.
    The part modifiers are as follows: distort, lo, hi, and bandpass. There is an example below:

    <textarea
      rows="2"
      cols="90"
      id="input"
      defaultValue='
      "a b c" >> soft ^ lo 0.5'
    />
    <br />
    <button type="button" id="Start3">Start</button>
    <button type="button" id="Stop3">Stop</button>
  </div>
);

export default Tutorial;
