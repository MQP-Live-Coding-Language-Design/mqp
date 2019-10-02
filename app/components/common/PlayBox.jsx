import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Editor from '@monaco-editor/react';
import Button from '@material-ui/core/Button';

const PlayBox = ({ id, value }) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [parseValue, setParseValue] = useState(value);
  const [startState, setStartValue] = useState('Start');
  const valueGetter = useRef();

  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  }

  function changeValueToParse() {
    setParseValue(valueGetter.current());
    if (startState === 'Start') setStartValue('Stop');
    else setStartValue('Start');
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
      <Button className={startState} type="button" value={parseValue} onClick={changeValueToParse} disabled={!isEditorReady} id="trigger">
        {startState}
      </Button>
    </div>
  );
};

PlayBox.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default PlayBox;
