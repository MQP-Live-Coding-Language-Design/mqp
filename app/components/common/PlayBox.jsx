import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Editor, { monaco } from '@monaco-editor/react';
import Button from '@material-ui/core/Button';

const Tone = require('tone');
const samples = require('../../../language/samples.js');
const peg = require('../../../language/language.js');
const autocomplete = require('./autocomplete.js');
const defaults = require('../../../language/defaults.js');


let loaded = false;
Tone.Buffer.on('load', () => { loaded = true; });

let box = null;
monaco.init()
  .then((monacoBox) => {
    box = monacoBox;
    monacoBox.languages.register({ id: 'sicko-mode' });

    monacoBox.languages.setMonarchTokensProvider('sicko-mode', {
      tokenizer: {
        root: [
          [/\s*\/\/.*$/, 'none'],
          [/\s*>>\s*(alien|soft|triangle|saw|fatsaw|square|(pls no)|drums|acousticdrums|electricdrums|piano|bassoon|bass|electricbass|cello|clarinet|contrabass|flute|frenchhorn|horn|acousticguitar|electricguitar|guitar|nylonguitar|harmonium|harp|organ|saxophone|trumpet|violin|xylophone)/, 'constant'],
          [/\s*>>([^>/"]|(\/[^/">]))*/, 'string'],
          [/\s*(&\s*)?>([^>/"]|(\/[^/">]))+/, 'variable'],
          [/(^|\s*")([^>/"]|(\/[^/">]))+("|$)/, 'comment'],
        ],
      },
    });
    // Autocomplete
    monacoBox.languages.registerCompletionItemProvider('sicko-mode', {
      triggerCharacters: [' ', '>', '"'],
      provideCompletionItems(argmodel, position) {
        const text = argmodel.getValueInRange({
          startLineNumber: 0,
          startColumn: 0,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });

        if (text.match(/^[^"]*("[^"]*"[^"]*)*"([^"]*\s)?$/)) {
          return { suggestions: autocomplete.note };
        }
        if (text.match(/.*>>\s*scale[^>]*$/)) {
          return { suggestions: autocomplete.scales };
        }
        if (text.match(/.*>>[^>]*\s*$/)) {
          return { suggestions: autocomplete.instrument.concat(autocomplete.modifier) };
        }

        console.log('resetting');
        return { suggestions: [] };
      },
    });

    monacoBox.editor.defineTheme('sicko-theme', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
    });
  })
  .catch((error) => console.error('An error occurred during initialization of Monaco: ', error));


const PlayBox = ({ id, value }) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [buttonState, setButtonState] = useState('Start');
  const [runningParts, setParts] = useState([]);
  const [model, setModel] = useState(null);
  const valueGetter = useRef();

  function handleEditorDidMount(_valueGetter, editor) {
    setModel(editor._modelData.model);
    valueGetter.current = _valueGetter;
    let time;
    editor.onDidChangeModelContent(() => {
      clearTimeout(time);
      box.editor.setModelMarkers(editor._modelData.model, 'test', []);
      /* Continuous error checking
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
  */
    });
    setIsEditorReady(true);
  }

  function stop(force) {
    runningParts.forEach((part) => {
      part.stop(force);
    });
    setParts([]);
    setButtonState('Start');
  }

  function start(force) {
    try {
      const parsedVal = peg.parse(valueGetter.current());
      setParts(parsedVal);
      parsedVal.forEach((part) => { part.start(force); });
      setButtonState('Stop');
    } catch (error) {
      console.log(error);
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

  function toggle(force) {
    if (Tone.Transport.state !== 'started') {
      Tone.Transport.start();
      Tone.Transport.seconds = Tone.context.now();
    }

    if (loaded && Tone.context.state === 'running') {
      if (buttonState === 'Start') {
        start(force);
      } else {
        stop(force);
      }
    }
  }

  function buttonClick(force) {
    if (Tone.context.state !== 'running') {
      const resume = Tone.context.resume();
      resume.then(() => { toggle(force); });
    } else {
      toggle(force);
    }
  }

  function forceClick() {
    buttonClick(true);
  }

  function softClick() {
    buttonClick(false);
  }

  function update() {
    // ToDo: Find better solution
    stop(false);
    start(false);
  }

  return (
    <div className="playBox" id={id}>
      <Editor
        height="40vh"
        width="94vw"
        value={value}
        language="sicko-mode"
        theme="sicko-theme"
        editorDidMount={handleEditorDidMount}
      />
      <Button className={buttonState} type="button" onClick={forceClick} disabled={!isEditorReady} id="trigger">
        {`force ${buttonState}`}
      </Button>
      <Button className={buttonState} type="button" onClick={softClick} disabled={!isEditorReady}>
        {buttonState}
      </Button>
      <Button type="button" onClick={update} disabled={!isEditorReady || buttonState === 'Start'}>
        {'Update'}
      </Button>
    </div>
  );
};

PlayBox.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default PlayBox;
