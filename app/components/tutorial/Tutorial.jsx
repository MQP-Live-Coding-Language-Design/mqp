import React, { useState } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { ThemeProvider } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
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

const Arrow = styled.div`
  box-sizing: border-box;
  display: inline-block;
  height: 3vh;
  width: 3vh;
  border-style: solid;
  border-color: black;
  border-width: 0px 1px 1px 0px;
  transform: rotate(45deg);
  transition: border-width 150ms ease-in-out;
  margin: 2%;
`;

const LeftArrow = styled(Arrow)`
  transform: rotate(135deg);
`;

const RightArrow = styled(Arrow)`
  transform: rotate(-45deg);
`;

const Tutorial = () => {
  const [currentBox, setCurrentBox] = useState(0);
  const maxCount = 9;

  const decreaseCount = () => {
    if (currentBox === 0) {
      setCurrentBox(maxCount);
    } else {
      setCurrentBox(currentBox - 1);
    }
  };

  const increaseCount = () => {
    if (currentBox === maxCount) {
      setCurrentBox(0);
    } else {
      setCurrentBox(currentBox + 1);
    }
  };

  const boxChange = () => {
    const min = 0;
    switch (currentBox) {
      case min:
        return (
          <>
            <ReactMarkdown source={welcome} />
            <PlayBox id="welcomeTutBox" value={examplesong} />
          </>
        );
      case min + 1:
        return (
          <>
            <ReactMarkdown source="## Notes" />
            <ReactMarkdown source={tutorial1} />
            <PlayBox id="firtsTutBox" value='"c e g" >> soft' />
          </>
        );
      case min + 2:
        return (
          <>
            <ReactMarkdown source="## Notes" />
            <ReactMarkdown source={tutorial2} />
            <PlayBox id="secondTutBox" value='"f# Bb c#+" >> triangle' />
          </>
        );
      case min + 3:
        return (
          <>
            <ReactMarkdown source="## Notes" />
            <ReactMarkdown source={tutorialaltchars} />
            <PlayBox id="altcharsTutBox" value='"f# ~ Bb c#+ _" >> triangle' />
          </>
        );
      case min + 4:
        return (
          <>
            <ReactMarkdown source="## Notes" />
            <ReactMarkdown source={tutorialdrums} />
            <PlayBox id="drumsTutBox" value={exampledrums} />
          </>
        );
      case min + 5:
        return (
          <>
            <ReactMarkdown source="## Sequences" />
            <ReactMarkdown source={tutorialmods} />
            <PlayBox id="modTutBox" value='"c e g" >> octave +2 >> pitch -- >> triangle' />
          </>
        );
      case min + 6:
        return (
          <>
            <ReactMarkdown source="## Sequences" />
            <ReactMarkdown source={tutorialduration} />
            <PlayBox id="durationTutBox" value='"c e g" >> octave +2 >> pitch -- >> duration .25 >> triangle' />
          </>
        );
      case min + 7:
        return (
          <>
            <ReactMarkdown source="## Beyond" />
            <ReactMarkdown source={tutorialmult} />
            <PlayBox id="fourthTutBox" value='"c e f g" >> soft >> pitch +7 >> triangle' />
          </>
        );
      case min + 8:
        return (
          <>
            <ReactMarkdown source="## Beyond" />
            <ReactMarkdown source={tutorialpatterns} />
            <PlayBox id="fifthTutBox" value={examplepatterns} />
          </>
        );
      case min + 9:
        return (
          <>
            <ReactMarkdown source="## Beyond" />
            <ReactMarkdown source={tutorialconclusion} />
            <PlayBox id="sixthTutBox" value={examplesong2} />
          </>
        );
      default:
        return (
          <>
            <ReactMarkdown source={welcome} />
            <PlayBox id="welcomeTutBox" value={examplesong} />
          </>
        );
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Typography component="div">
          <Box display="flex" justifyContent="center">
            <LeftArrow onClick={() => decreaseCount()} />
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
              {boxChange()}
            </Box>
            <RightArrow onClick={() => increaseCount()} />
          </Box>
        </Typography>
      </ThemeProvider>
    </>
  );
};

export default Tutorial;
