import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { ThemeProvider } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// import TutorialEditor from './TutorialEditor';
import PlayBox from './PlayBox';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#b3e5fc',
      light: '#e6ffff',
      dark: '#82b3c9',
    },
    secondary: { main: blueGrey[50] },
  },
});
const Tutorial = () => (
  <ThemeProvider theme={theme}>
    <Typography component="div">
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="flex-start"
        alignContent="flex-start"
        fontFamily="Helvetica"
        bgcolor="#ffffff"
        p={1}
        m={1}
        css={{ maxWidth: 500 }}
      >
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="flex-start"
          alignContent="flex-start"
          fontFamily="Helvetica"
          bgcolor="primary.main"
          fontSize="48px"
          css={{ width: 500 }}
        >
          <Box
            p={1}
            bgcolor="primary.dark"
            css={{ width: 500, height: 10 }}
          />
          Tutorial
        </Box>
      To start playing, simply create a sequence of notes and send it to an instrument.
      A note is any letter between 'a' and 'g'. This sequence can then be played on an instrument
      by writing '>>' followed by the instrument name as seen below:
        <br />
        <PlayBox id="firtsTutBox" value='"c e g" >> soft' />
        <br />
        <br />
        <br />
        Both the notes and the entire sequence of notes can be edited. You make a note sharp or flat
      by adding a '#' or 'b' respectively to the end of the note. The octave of a note defaults to
      4, but can be changed either by specifying an octave (e.g. 'a5' sets the octave to 5) or by
      using +/- to raise and lower this value (e.g. 'a+' sets the octave to 5).
        <br />
        <PlayBox id="secondTutBox" value='"c# eb g+" >> triangle' />
        <br />
        <br />
        <br />

        Entire sequences can be modified using the '>>' followed by the modification. The modifiers
      are currently "octave," "pitch," and "duration". Octave takes either an integer or a series of +/- symbols.
      The +/- move the value from the default of 4 (e.g. ">> octave +6" and ">> octave ++"
      both set the octave to 6). Pitch takes either a series of +/- or a signed integer for the amount to move
      the pitch up or down (e.g. ">> pitch --" and ">> pitch -2" both move the pitch down by 2).
      Duration sets the time for each note in the sequence. It takes either a fraction or a decimal
      (e.g. ">> duration .5" and ">> duration 1/2" do the same thing). Examples are seen below:
        <br />
        <PlayBox id="modTutBox" value='"c e g" >> octave +2 >> pitch -- >> duration .25 >> triangle' />
        <br />
        <br />
        <br />


        {/*
      Like a sequence of notes, the instruments (called parts) can be modified.
      This is done by following the instrument with "^" and then the part modifier and value.
      The part modifiers are as follows: distort, lo, hi, and bandpass. There is an example below:
        <br />
        <PlayBox id="thirdTutBox" value='"c e g" >> octave 2 >> pitch -- >> duration .25 >> triangle' />
        <br />
        <br />
        <br />
*/}
        You can play the same notes with multiple instruments as well. See below we play 'c e g' on both a triangle and a soft synth
        <br />
        <PlayBox id="fourthTutBox" value='"c e g" >> triangle >> soft' />
        <br />
        <br />
        <br />

        Make multiple patterns!
        <br />
        <PlayBox id="fifthTutBox" value='"c e g" >> triangle >> saw "g b d+" >> soft' />
        <br />
        <br />
        <br />

        Additionally, you have the ability to make drum beats! Using x and o you can create simple rhythms and the play keyword to play it.
        <br />
        <PlayBox id="drumTutBox" value='"x o x o" >> play' />


        Feel free to combine anything you've used!
        <br />
        <PlayBox id="sixthTutBox" value='"c# e g5" >> octave++ >> triangle' />
        <br />
        <br />
        <br />


      </Box>
    </Typography>
  </ThemeProvider>
);

export default Tutorial;
