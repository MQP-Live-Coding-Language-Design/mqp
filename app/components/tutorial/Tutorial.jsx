import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { ThemeProvider } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PlayBox from '../PlayBox';

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
          Tutorial for PHAD
        </Box>
      To start playing, simply create a sequence of notes and send it to an instrument.
      A note is any letter between 'a' and 'g'. This sequence can then be played on an instrument
      by writing '>>' followed by the instrument name as seen below:
        <br />
        <PlayBox id="firtsTutBox" value='"c e g" >> soft' />
        <br />
        <br />
        <br />
        Notes can be modified before you play them. You make a note sharp or flat
      by adding a '#' or 'b' respectively to the end of the note. The octave of a note defaults to
      4, but can be changed either by specifying an octave (e.g. 'a5' sets the octave to 5) or by
      using +/- to raise and lower this value (e.g. 'a+' sets the octave to 5).
        <br />
        <PlayBox id="secondTutBox" value='"f# Bb c#+" >> triangle' />
        <br />
        <br />
        <br />

        Entire sequences can also be modified using the '>>' followed by the modification. The
      modifiers are currently "octave," "pitch," and "duration". Octave and Pitch can be followed
      by either a series of +/- symbols or a sign and an integer. Using a series of +/- symbols
      will increase or decrease the octave or pitch by the number of symbols put. Using a sign and
      an integer will increase or decrease the ocatave or pitch by the integer after the sign. For
      example, ">> octave +2" and ">> octave ++" both move the sequence up two octaves, and
      ">> pitch --" and ">> pitch -2" both move the pitch down by 2 half-steps. Duration can be
      followed by a decimal or a fraction, and multiplies the length of each note in the sequence
      by that value (e.g. ">> duration .5" and ">> duration 1/2" do the same thing). Examples are
      seen below:
        <br />
        <PlayBox id="modTutBox" value='"c e g" >> octave +2 >> pitch -- >> duration .25 >> triangle' />
        <br />
        <br />
        <br />

        In addition to notes, you can also play drums! Just use o (bass drum), s (snare drum), -
        (high hat), and -- (open high hat) instead of note names. Drums can be played with any
        instrument, but it will not change their sound.
        <br />
        <PlayBox id="seventhTutBox" value={`"o x -- x" >> play
"-" >> duration .5 >> triangle`} />
        <br />
        <br />
        <br />

        {/*
      Like a sequence of notes, the instruments (called parts) can be modified.
      This is done by following the instrument with "^" and then the part modifier and value.
      The part modifiers are as follows: distort, lo, hi, and bandpass. There is an example below:
        <br />
        <PlayBox
          id="thirdTutBox" value='"c e g" >> octave 2 >> pitch -- >> duration .25 >> triangle' />
        <br />
        <br />
        <br />
*/}
        You can play the same notes with multiple instruments as well. You can even modify the
        notes between the instruments. Below we play 'c e f g' on the soft instrument, increase
        the pitch, then play the sequence on the triangle synth.
        <br />
        <PlayBox id="fourthTutBox" value='"c e f g" >> soft >> pitch +7 >> triangle' />
        <br />
        <br />
        <br />

        Make multiple patterns!
        <br />
        <PlayBox
          id="fifthTutBox"
          value={`"c e f g" >> soft >> pitch +7 >> triangle
"c e g" >> duration 1/2 >> octave + >> saw`}
        />
        <br />
        <br />
        <br />

        Feel free to combine anything you've used!
        <br />
        <PlayBox
          id="sixthTutBox"
          value={`"ab f db eb" >> duration 2 >> octave - >> saw >> pitch +7 >> soft
"o _ x _" >> duration .5 >> play
"c+ ab g ab c+ ab g ab db ab g ab bb ab g ab" >> duration .5 >> triangle
"ab _ _ eb _ _ c _ _ eb _ _ ab _ _ f _ _ db _ f _ ab _ bb _ _ ab _ _ g _" >> octave >> duration 1/4 >> triangle
"ab ab eb+" >> duration 1/4 >> triangle
"ab _ _ eb _ _ f ab ~ _ _ g _ _ ab bb" >> octave ++ >> duration .5 >> triangle & > pingpong .25
"- - - - -- - - -" >> duration .5 >> play`}
        />
        <br />
        <br />
        <br />
      </Box>
    </Typography>
  </ThemeProvider>
);

export default Tutorial;
