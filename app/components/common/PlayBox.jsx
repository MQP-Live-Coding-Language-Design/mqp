import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Editor from '@monaco-editor/react';

const PlayBox = ({ id, value }) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [parseValue, setParseValue] = useState(value);
  const valueGetter = useRef();

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
        height="10vh"
        width="50vw"
        value={value}
        theme="dark"
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
