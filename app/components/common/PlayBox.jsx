import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Editor, { monaco } from '@monaco-editor/react';
import Button from '@material-ui/core/Button';

const Tone = require('tone');
const samples = require('../../../language/samples.js');
const peg = require('../../../language/language.js');


let loaded = false;
Tone.Buffer.on('load', () => { loaded = true; });

const PlayBox = ({ id, value }) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [buttonState, setButtonState] = useState('Start');
  const [runningParts, setParts] = useState([]);
  const [box, setBox] = useState(null);
  const [model, setModel] = useState(null);
  const valueGetter = useRef();
  monaco.init()
    .then((monacoBox) => {
      setBox(monacoBox);
      monacoBox.languages.register({ id: 'sicko-mode' });

      monacoBox.languages.setMonarchTokensProvider('sicko-mode', {
        tokenizer: {
          root: [
            [/\ffff/, 'custom-error'],
            [/>> (octave|pitch|duration) [+-./0-9]*[0-9]*/, 'modifier'],
            [/>> (soft|triangle|saw|play)/, 'instrument'],
            [/"[a-zA-Z 0-9+#-_~()]+"[+-]*[0-9]*/, 'notes'],
          ],
        },
      });

      monacoBox.editor.defineTheme('sicko-theme', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'instrument', foreground: 'D7BDE2' },
          { token: 'custom-error', foreground: 'ff0000', fontStyle: 'bold' },
          { token: 'modifier', foreground: 'D6EAF8' },
          { token: 'notes', foreground: 'A3E4D7' },
        ],
      });
    })
    .catch((error) => console.error('An error occurred during initialization of Monaco: ', error));

  function handleEditorDidMount(_valueGetter, editor) {
    setModel(editor._modelData.model);
    valueGetter.current = _valueGetter;

    let time;
    editor.onDidChangeModelContent(() => {
      clearTimeout(time);
      box.editor.setModelMarkers(editor._modelData.model, 'test', []);
      time = setTimeout(() => {
        try {
          peg.parse(valueGetter.current());
        } catch (error) {
          box.editor.setModelMarkers(editor._modelData.model, 'test', [{
            startLineNumber: error.location.start.line,
            startColumn: error.location.start.column,
            endLineNumber: error.location.end.line,
            endColumn: error.location.end.column,
            message: error.message,
            severity: box.MarkerSeverity.Error,
          }]);
        }
      }, 1500);
    });

    setIsEditorReady(true);
  }

  function stop() {
    runningParts.forEach((part) => {
      part.stop();
    });
    setParts([]);
    setButtonState('Start');
  }

  function start() {
    try {
      const parsedVal = peg.parse(valueGetter.current());
      setParts(parsedVal);
      parsedVal.forEach((part) => { part.start(); });
      setButtonState('Stop');
    } catch (error) {
      box.editor.setModelMarkers(model, 'test', [{
        startLineNumber: error.location.start.line,
        startColumn: error.location.start.column,
        endLineNumber: error.location.end.line,
        endColumn: error.location.end.column,
        message: error.message,
        severity: box.MarkerSeverity.Error,
      }]);
    }
  }

  function toggle() {
    if (Tone.Transport.state !== 'started') {
      Tone.Transport.start();
      Tone.Transport.seconds = Tone.context.now();
    }

    if (loaded && Tone.context.state === 'running') {
      if (buttonState === 'Start') {
        start();
      } else {
        stop();
      }
    }
  }

  function buttonClick() {
    if (Tone.context.state !== 'running') {
      const resume = Tone.context.resume();
      resume.then(toggle);
    } else {
      toggle();
    }
  }

  return (
    <div className="playBox" id={id}>
      <Editor
        height="20vh"
        width="60vw"
        value={value}
        language="sicko-mode"
        theme="sicko-theme"
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
