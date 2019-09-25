import React from 'react';
import PropTypes from 'prop-types';

const PlayBox = ({ id, value }) => (
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
);

PlayBox.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default PlayBox;
