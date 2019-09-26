import React from 'react';
import MonacoEditor from 'react-monaco-editor';

function TutorialEditor(props) {
  return (
    <div>
      <MonacoEditor
        width={props.width}
        height={props.height}
        value={props.text}
      />
    </div>
  );
}

export default TutorialEditor;
