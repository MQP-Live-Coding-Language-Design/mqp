import React from 'react';

const PlayBox = (id) => (
  <div className="playBox" id={id}>
    <textarea
      rows="10"
      cols="90"
      id="input"
      defaultValue='
        "ab f db eb" >> tempo 2 >> octave - >> soft >> pitch +7 >> soft
        "o _ x _" >> tempo .5 >> play
        "c+ ab g ab c+ ab g ab db ab g ab bb ab g ab" >> tempo .5 >> triangle
        "ab _ _ eb _ _ c _ _ eb _ _ ab _ _ f _ _ db _ f _ ab _ bb _ _ ab _ _ g _" >> octave >> tempo 1/4 >> triangle
        "ab ab eb+" >> tempo 1/4 >> triangle
        "ab _ _ eb _ _ f ab ~ _ _ g _ _ ab bb" >> octave ++ >> tempo .5 >> triangle & > pingpong .25
        "- - - - -- - - -" >> tempo .5 >> play'
    />
    <button type="button" id="Start">Start</button>
    <button type="button" id="Stop">Stop</button>
  </div>
);

export default PlayBox;
