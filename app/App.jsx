import React from 'react';
import Homepage from './components/Homepage';
import PlayBox from './components/PlayBox';
import Tutorial from './components/Tutorial';


const App = () => (
  <div>
    <Homepage />
    <Tutorial id="theTutorial" />
    <PlayBox id="firstBox" value='"ab f db eb" >> duration 2 >> octave - >> soft >> pitch +7 >> soft' />
    <PlayBox id="secondBox" value='"o _ x _" >> duration .5 >> play' />
    <PlayBox
      id="fullBox"
      value='
      "ab f db eb" >> duration 2 >> octave - >> saw >> pitch +7 >> soft
      "o _ x _" >> duration .5 >> play
      "c+ ab g ab c+ ab g ab db ab g ab bb ab g ab" >> duration .5 >> triangle
      "ab _ _ eb _ _ c _ _ eb _ _ ab _ _ f _ _ db _ f _ ab _ bb _ _ ab _ _ g _" >> octave >> duration 1/4 >> triangle
      "ab ab eb+" >> duration 1/4 >> triangle
      "ab _ _ eb _ _ f ab ~ _ _ g _ _ ab bb" >> octave ++ >> duration .5 >> triangle & > pingpong .25
      "- - - - -- - - -" >> duration .5 >> play
    '
    />
  </div>
);

export default App;
