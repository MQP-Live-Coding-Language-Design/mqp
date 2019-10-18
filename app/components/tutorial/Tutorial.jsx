import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { ThemeProvider } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ReactMarkdown from 'react-markdown';
import PlayBox from '../common/PlayBox';

import {
  tutorial1, tutorial2, tutorialaltchars, tutorialmods, tutorialduration, tutorialdrums,
  exampledrums, tutorialmult, tutorialpatterns, examplepatterns, tutorialconclusion, examplesong,
  welcome, examplesong2,
} from './TutorialText';

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
      <Box display="flex" justifyContent="center">
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          alignContent="flex-start"
          fontFamily="Helvetica"
          bgcolor="#ffffff"
          p={1}
          m={1}
          css={{ maxWidth: 500 }}
        >
          <ReactMarkdown source={welcome} />
          <PlayBox id="welcomeTutBox" value={examplesong} />
          <ReactMarkdown source="## Notes" />
          <ReactMarkdown source={tutorial1} />
          <PlayBox id="firtsTutBox" value='"c e g" >> soft' />
          <ReactMarkdown source={tutorial2} />
          <PlayBox id="secondTutBox" value='"f# Bb c#+" >> triangle' />
          <ReactMarkdown source={tutorialaltchars} />
          <PlayBox id="altcharsTutBox" value='"f# ~ Bb c#+ _" >> triangle' />
          <ReactMarkdown source={tutorialdrums} />
          <PlayBox id="drumsTutBox" value={exampledrums} />
          <ReactMarkdown source="## Sequences" />
          <ReactMarkdown source={tutorialmods} />
          <PlayBox id="modTutBox" value='"c e g" >> octave +2 >> pitch -- >> duration .25 >> triangle' />
          <ReactMarkdown source={tutorialduration} />
          <br />
          <ReactMarkdown source="## Beyond" />
          <ReactMarkdown source={tutorialmult} />
          <PlayBox id="fourthTutBox" value='"c e f g" >> soft >> pitch +7 >> triangle' />
          <ReactMarkdown source={tutorialpatterns} />
          <PlayBox id="fifthTutBox" value={examplepatterns} />
          <ReactMarkdown source={tutorialconclusion} />
          <PlayBox id="sixthTutBox" value={examplesong2} />
        </Box>
      </Box>
    </Typography>
  </ThemeProvider>
);

export default Tutorial;
