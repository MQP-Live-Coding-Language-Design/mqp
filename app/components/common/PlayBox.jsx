import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Editor from '@monaco-editor/react';
import Button from '@material-ui/core/Button';

const Tone = require('tone');
const peg = require('../../../language/language.js');

const PlayBox = ({ id, value }) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [parseValue, setParseValue] = useState(value);
  const [buttonState, setButtonState] = useState('Start');
  const valueGetter = useRef();
  const runningParts = {};
  const loaded = true;


  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  }

  function stop() {
    if (id in runningParts) {
      runningParts[id].forEach((part) => {
        part.stop();
      });
    }
    delete runningParts[id];
  }

  function start() {
    stop(id);
    const parts = peg.parse(parseValue);
    runningParts[id] = parts;

    if (loaded && Tone.context.state === 'running') {
      parts.forEach((part) => { part.start(); });
    } else {
      console.log('unloaded');
    }
  }


  function buttonClick() {
    setParseValue(valueGetter.current());

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
        height="10vh"
        width="50vw"
        value={value}
        theme="dark"
        editorDidMount={handleEditorDidMount}
      />
      <Button className={buttonState} type="button" value={parseValue} onClick={buttonClick} disabled={!isEditorReady} id="trigger">
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
