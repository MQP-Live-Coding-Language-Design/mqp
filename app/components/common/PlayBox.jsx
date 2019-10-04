import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Editor, { monaco } from '@monaco-editor/react';

const PlayBox = ({ id, value }) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [parseValue, setParseValue] = useState(value);
  const valueGetter = useRef();
  monaco.init()
    .then((monaco) => {
      monaco.languages.register({ id: 'sicko-mode' });

      monaco.languages.setMonarchTokensProvider('sicko-mode', {
        tokenizer: {
          root: [
            [/\ffff/, 'custom-error'],
            [/>> (octave|pitch|duration) [+-./0-9]*[0-9]*/, 'modifier'],
            [/>> (soft|triangle|saw|play)/, 'instrument'],
            [/"[a-zA-Z 0-9+#-_~()]+"[+-]*[0-9]*/, 'notes'],
          ],
        },
      });

      monaco.editor.defineTheme('sicko-theme', {
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

  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  }

  function changeValueToParse() {
    setParseValue(valueGetter.current());
  }

  return (
    <div className="playBox" id={id}>
      <Editor
        language="sicko-mode"
        theme="sicko-theme"
        height="10vh"
        value={value}
        width="50vw"
        editorDidMount={handleEditorDidMount}
      />
      <button type="button" value={parseValue} onClick={changeValueToParse} disabled={!isEditorReady} id="Start">Start</button>
      <button type="button" disabled={!isEditorReady} id="Stop">Stop</button>
    </div>
  );
};

PlayBox.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default PlayBox;
