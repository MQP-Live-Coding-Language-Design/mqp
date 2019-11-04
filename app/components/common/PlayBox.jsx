import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Editor, { monaco } from '@monaco-editor/react';
import Button from '@material-ui/core/Button';
import MySongs from './MySongs';


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
          [/>>\s*(alien|soft|triangle|saw|fatsaw|square|(pls no)|drums|acousticdrums|electricdrums|piano|bassoon|bass|electricbass|cello|clarinet|contrabass|flute|frenchhorn|horn|acousticguitar|electricguitar|guitar|nylonguitar|harmonium|harp|organ|saxophone|trumpet|violin|xylophone)/, 'instrument'],
          [/>>[^>"]*/, 'modifier'],
          [/(&\s*)?>[^>"]+/, 'filter'],
          [/(^|")[^">&]+("|$)/, 'notes'],
        ],
      },
    });
    // Autocomplete
    monacoBox.languages.registerCompletionItemProvider('sicko-mode', {
      provideCompletionItems(argmodel, position) {
        const text = argmodel.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });

        if (text.match(/[^"]*("[^"]*"[^"]*)*"([^"]*\s)?$/)) {
          return { suggestions: autocomplete.note };
        }
        if (text.match(/.*>>\s*scale[^>]*$/)) {
          return { suggestions: autocomplete.scales };
        }
        if (text.match(/.*>>[^>]*$/)) {
          return { suggestions: autocomplete.instrument.concat(autocomplete.modifier) };
        }

        return { suggestions: [] };
      },
    });

    monacoBox.editor.defineTheme('sicko-theme', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'instrument', foreground: '61AFEF' },
        { token: 'modifier', foreground: 'ABA58E' },
        { token: 'notes', foreground: '98B755' },
        { token: 'group', foreground: '378876' },
        { token: 'filter', foreground: '6871D7' },
      ],
    });
  })
  .catch((error) => console.error('An error occurred during initialization of Monaco: ', error));


const PlayBox = ({ id, value, isPlayground }) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [buttonState, setButtonState] = useState('Start');
  const [currentValue, setCurrentValue] = useState(value);
  const [runningParts, setParts] = useState([]);
  const [model, setModel] = useState(null);
  const valueGetter = useRef();

  function handleEditorDidMount(_valueGetter, editor) {
    setModel(editor._modelData.model);
    valueGetter.current = _valueGetter;
    let time;
    console.log(editor);
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

  const loadNewContent = (newContent) => {
    stop(true);
    setCurrentValue(newContent);
  };

  return (
    <div className="playBox" id={id}>
      <Editor
        height="40vh"
        width="94vw"
        value={currentValue}
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
      {
        isEditorReady && isPlayground
          ? (
            <MySongs
              disabled={!isEditorReady}
              currentContent={valueGetter.current()}
              onContentLoad={loadNewContent}
            />
          )
          : null
      }
    </div>
  );
};

PlayBox.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isPlayground: PropTypes.boolean,
};

PlayBox.defaltProps = {
  isPlayground: false,
};

export default PlayBox;
