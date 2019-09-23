import React from 'react';
import Homepage from '~components/Homepage';
import PlayBox from '~components/PlayBox';

const App = () => (
  <div>
    <Homepage />
    <PlayBox id="firstBox" />
    <PlayBox id="secondBox" />
  </div>
);

export default App;
