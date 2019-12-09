import React, { useState } from 'react';
import SplitPane from 'react-split-pane';
import PlayBox from '../common/PlayBox';
import Visualizer from './Visualizer';
import './styles.css';

const Collab = () => {
  const [boxWidth, setBoxWidth] = useState('50vw');
  const [halfBoxWidth, setHalfBoxWidth] = useState('23vw');

  const calculateVW = (sizeInPx) => {
    const newLeftWidth = sizeInPx / 19.2;
    const newRightWidth = (1850 - sizeInPx) / 19.2;
    setBoxWidth(`${newLeftWidth}vw`);
    setHalfBoxWidth(`${newRightWidth / 2}vw`);
  };

  return (
    <SplitPane split="vertical" defaultSize={960} onChange={(size) => calculateVW(size)}>
      <PlayBox id="collabBox" value="// Start making noise" editorWidth={boxWidth} isPlayground />
      <Visualizer editorWidth={halfBoxWidth} />
    </SplitPane>
  );
};

export default Collab;
