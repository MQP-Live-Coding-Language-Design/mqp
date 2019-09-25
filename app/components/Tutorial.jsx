import React from 'react';
// import styled, { ThemeProvider } from 'styled-components';
import Box from '@material-ui/core/Box';
import TutorialEditor from './TutorialEditor';

const Tutorial = () => (
  <div style={{ width: '100%' }}>
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="flex-start"
      alignContent="flex-start"
      p={1}
      m={1}
      bgcolor="background.gray"
      css={{ maxWidth: 500, height: 200 }}
    >

      To start playing, simply create a sequence of notes surrounded by a " on either side and send it to an instrument.
      A note can be any letter between 'a' and 'g'. This sequence can then be played on an instrument
      by writing '>>' followed by the instrument name. As seen below, we create a sequence of notes a b c, and play it on a triangle:
      <br />
      <TutorialEditor
        width="500"
        height="100"
        text='"a b c" >> triangle'
      />
      <br />
      <br />
      <br />
        Both the notes and the entire sequence of notes can be edited. You can make a note sharp or flat
      by adding a '#' or 'b' (e.g. 'a#', 'cb') respectively in front of the note. The octave of a note defaults to
      4, but can be changed either by specifying an octave (e.g. 'a5' sets the octave to 5) or by
      using +/- to raise and lower this value (e.g. 'a+' sets the octave to 5).
      <br />
      <TutorialEditor
        width="500"
        height="100"
        text='"a+ b3 c#" >> triangle'
      />
      <br />
      <br />
      <br />

        Entire sequences can be modified using the '>>' followed by the modification. The modifiers
      are currently "octave," "pitch," and "duration". Octave takes either an integer or a series of +/- symbols.
      The +/- move the value from the default of 4 (e.g. ">> octave 6" and ">> octave ++"
      both set the octave to 6). Pitch takes either a series of +/- or a signed integer for the amount to move
      the pitch up or down (e.g. ">> pitch --" and ">> pitch -2" both move the pitch down by 2).
      Duration sets the time for each note in the sequence. It takes either a fraction or a decimal
      (e.g. ">> duration .5" and ">> duration 1/2" do the same thing). Examples are seen below:
      <br />
      <TutorialEditor
        width="500"
        height="100"
        text='"a b c" >> octave 2 >> pitch -- >> duration .25 >> triangle'
      />
      <br />
      <br />
      <br />

        Like a sequence of notes, the instruments (called parts) can be modified.
      This is done by following the instrument with "^" and then the part modifier and value.
      The part modifiers are as follows: distort, lo, hi, and bandpass. There is an example below:
      <br />
      <TutorialEditor
        width="500"
        height="100"
        text='"a b c" >> octave 2 >> pitch -- >> duration .25 >> triangle'
      />
      <br />
      <br />
      <br />

        You can play the same notes with multiple instruments as well. See below we play 'a b c' on both a triangle and a soft synth
      <br />
      <TutorialEditor
        width="500"
        height="100"
        text='"a b c" >> triangle >> soft'
      />
      <br />
      <br />
      <br />

        Make multiple patterns!
      <br />
      <TutorialEditor
        width="500"
        height="100"
        text='"a b c" >> triangle
         "c e g" >> soft'
      />
      <br />
      <br />
      <br />

        Feel free to combine anything you've used!
      <br />
      <TutorialEditor
        width="500"
        height="100"
        text='"a# d f5" >> octave++ >> triangle'
      />
      <br />
      <br />
      <br />
    </Box>
  </div>
);

export default Tutorial;
