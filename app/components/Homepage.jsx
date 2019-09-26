import React, { useState } from 'react';
import Tutorial from './tutorial/Tutorial';
import Playground from './playground/Playground';

const Homepage = () => {
  const [state, setState] = useState({ currentPage: 'homepage' });

  const selectPage = (newPage) => {
    setState({ currentPage: newPage });
  };

  switch (state.currentPage) {
    case 'tutorial':
      return (
        <div>
          <button type="button" onClick={() => selectPage('homepage')}>Back to Homepage</button>
          <Tutorial id="theTutorial" />
        </div>
      );
    case 'playground':
      return (
        <div>
          <button type="button" onClick={() => selectPage('homepage')}>Back to Homepage</button>
          <Playground />
        </div>
      );
    default:
      return (
        <div>
          <button type="button" onClick={() => selectPage('tutorial')}>Go to Tutorial</button>
          <button type="button" onClick={() => selectPage('playground')}>Go to Playground</button>
        </div>
      );
  }
};

export default Homepage;
