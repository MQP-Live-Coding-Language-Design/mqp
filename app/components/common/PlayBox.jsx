import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
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

let allDecs;

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


const PlayBox = ({
  id, value, isPlayground, isReadOnly, isCollab, editorHeight, editorWidth,
}) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [buttonState, setButtonState] = useState('Start');
  const [runningParts, setParts] = useState([]);
  const [model, setModel] = useState(null);
  const valueGetter = useRef();
  let startLine = 0;
  let endLine = 0;

  function handleEditorDidMount(_valueGetter, editor) {
    setModel(editor._modelData.model);

    editor.onKeyDown((e) => {
      startLine = editor.getSelection().startLineNumber;
      endLine = editor.getSelection().endLineNumber;
      if (e.shiftKey && e.metaKey) {
        checkTone();
        stopFromClick(editor);
        startFromClick(editor);
      } else if (e.metaKey && e._asRuntimeKeybinding.altKey) {
        checkTone();
        stopFromClick(editor);
      } else if (e.metaKey) {
        allDecs = editor.getModel().getAllDecorations();
        console.log(allDecs);
      }
    });


    valueGetter.current = _valueGetter;
    let time;
    editor.onDidChangeModelContent(() => clearTimeout(time));

    setIsEditorReady(true);

    // if (isCollab) {
    //   setInterval(() => {
    //     stop(false);
    //     start(false);
    //     console.log('mounted');
    //   }, 6000);
    // }
  }

  function getRunningDecorationID(lineNum, theEditor, secQuoteLoc) {
    allDecs = theEditor.getModel().getAllDecorations();
    let returner = null;
    allDecs.forEach((currDec) => {
      const currRange = currDec.range;
      if (currRange.startLineNumber === lineNum && currRange.endLineNumber === lineNum
        && currRange.startColumn === secQuoteLoc) { // Check if there's a dec at that line at the second quote
        returner = currDec.id;
      }
    });
    return returner;
  }

  function stopFromClick(theEditor) {
    let fullText = valueGetter.current();
    fullText = fullText.split('\n'); // Split the entire monaco box into lines
    let i;
    for (i = startLine; i <= endLine; i += 1) {
      const theLine = fullText[i - 1];
      const secQuoteLoc = theLine.lastIndexOf('"');
      const runningID = getRunningDecorationID(i, theEditor, secQuoteLoc);
      const theParts = runningParts[runningID];
      if (theParts) {
        console.log(theParts);
        theParts.forEach((part) => {
          part.stop(true);
        });
        runningParts[i] = null;
      }
    }
    console.log(runningParts);
  }

  function stopAPart(decID) {
    const parsedVal = runningParts[decID];
    parsedVal.forEach((part) => { part.stop(true); });
  }


  function playAPart(lineNum, theLine, theEditor) {
  //  stopAPart(lineNum);
    const secQuoteLoc = theLine.lastIndexOf('"') + 1;
    const runningID = getRunningDecorationID(lineNum, theEditor, secQuoteLoc);
    if (runningID === null) { // If there's no decoration there
      const newDecID = theEditor.deltaDecorations([], [{
        ownerID: 2,
        range: new box.Range(lineNum, secQuoteLoc, lineNum, secQuoteLoc),
        options: { isWholeLine: true },
      }]);
      return newDecID[0];
    }
    return runningID; // Return the already running one
  }

  function startFromClick(theEditor) {
    try {
      let i;
      let fullText = valueGetter.current();
      fullText = fullText.split('\n'); // Split the entire monaco box into lines

      for (i = startLine; i <= endLine; i += 1) {
        // TODO: PLACE MARKER
        const theLine = fullText[i - 1];
        const parsedVal = peg.parse(theLine);
        const decID = playAPart(i, theLine, theEditor); // ID of either already playing line or soon to be playing line
        if (runningParts[decID]) { // It's already playing
          stopAPart(decID);
        }
        runningParts[decID] = parsedVal;
        parsedVal.forEach((part) => { part.start(true); });
      }
      console.log(runningParts);
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

  function placeMarker(lineNum) {
    box.editor.setModelMarkers(model, 'test', [{
      startLineNumber: lineNum,
      startColumn: 1,
      endLineNumber: lineNum,
      endColumn: 1000,
      message: 'a message',
      severity: monaco.Severity.Warning,
    }]);
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
    checkTone();
    if (loaded && Tone.context.state === 'running') {
      if (buttonState === 'Start') {
        start(force);
      } else {
        stop(force);
      }
    }
  }

  function checkTone() {
    if (Tone.Transport.state !== 'started') {
      Tone.Transport.start();
      Tone.Transport.seconds = Tone.context.now();
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
    // TODO: : Find better solution
    stop(false);
    start(false);
  }

  const loadNewContent = (newContent) => {
    stop(true);
    model.setValue(newContent);
  };

  const cookies = new Cookies();

  return (
    <div className="playBox" id={id}>
      <Editor
        height={editorHeight}
        width={editorWidth}
        value={value}
        language="sicko-mode"
        theme="sicko-theme"
        editorDidMount={handleEditorDidMount}
        options={{ readOnly: isReadOnly }}
      />
      {
        isCollab
          ? null
          : (
            <>
              <Button className={buttonState} type="button" onClick={forceClick} disabled={!isEditorReady} id="trigger">
                {`force ${buttonState}`}
              </Button>
              <Button className={buttonState} type="button" onClick={softClick} disabled={!isEditorReady}>
                {buttonState}
              </Button>
              <Button type="button" onClick={update} disabled={!isEditorReady || buttonState === 'Start'}>
                {'Update'}
              </Button>
            </>
          )
      }
      {
        isEditorReady && isPlayground && cookies.get('email')
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
  isPlayground: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isCollab: PropTypes.bool,
  editorHeight: PropTypes.string,
  editorWidth: PropTypes.string,
};

PlayBox.defaultProps = {
  isPlayground: false,
  isReadOnly: false,
  isCollab: false,
  editorHeight: '40vh',
  editorWidth: '94vw',
};

export default PlayBox;
