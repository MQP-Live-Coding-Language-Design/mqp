import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Editor from '@monaco-editor/react';
import Button from '@material-ui/core/Button';

const Tone = require('tone');
const peg = require('../../../language/language.js');


const PlayBox = ({ id, value }) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [buttonState, setButtonState] = useState('Start');
  const [runningParts, setParts] = useState([]);
  const valueGetter = useRef();


  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  }

  function stop() {
    console.log('hit stop');
    console.log(runningParts);
    runningParts.forEach((part) => {
      part.stop();
    });
    setParts([]);
  }

  function start() {
    stop();
    const parsedVal = peg.parse(valueGetter.current());
    setParts(parsedVal);
    console.log('1', runningParts);
    if (Tone.context.state === 'running') {
      parsedVal.forEach((part) => { part.start(); });
      console.log('2', runningParts);
    } else {
      console.log('unloaded');
    }
  }


  function buttonClick() {
    if (Tone.context.state !== 'running') {
      Tone.context.resume();
    }
    if (Tone.Transport.state !== 'started') {
      Tone.Transport.start();
      Tone.Transport.seconds = Tone.context.now();
    }

    if (buttonState === 'Start') {
      start();
      setButtonState('Stop');
    } else {
      stop();
      setButtonState('Start');
    }
  }

  return (
    <div className="playBox" id={id}>
      <Editor
        height="20vh"
        width="60vw"
        value={value}
        theme="dark"
        editorDidMount={handleEditorDidMount}
      />
      <Button className={buttonState} type="button" onClick={buttonClick} disabled={!isEditorReady} id="trigger">
        {buttonState}
      </Button>
    </div>
  );
};

PlayBox.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default PlayBox;
