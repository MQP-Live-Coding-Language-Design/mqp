import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

const PlayBox = ({ id, value }) => (
  <Box p={2}>
    {
      <div className="playBox" id={id}>
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
