import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import MonacoEditor from 'react-monaco-editor';

const PlayBox = ({ id, value }) => (
  <Box p={2}>
    {
      <div className="playBox" id={id}>
        <MonacoEditor
          width="600"
          height="200"
          id="input"
          value={value}
        />
        <textarea
          rows="10"
          cols="90"
          id="input"
          defaultValue={value}
        />
        <button type="button" id="Start">Start</button>
        <button type="button" id="Stop">Stop</button>
      </div>
    }
  </Box>
);

PlayBox.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default PlayBox;
