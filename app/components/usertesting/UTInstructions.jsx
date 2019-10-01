import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  instruction1, instruction2, instruction3, instruction4, instruction5, instruction6,
} from './utinstructions';
import PlayBox from '../common/PlayBox';


const UTInstructions = () => (
  <div>
    <ReactMarkdown source={instruction1} />
    <PlayBox id="instruction1" />
    <ReactMarkdown source={instruction2} />
    <PlayBox id="instruction2" />
    <ReactMarkdown source={instruction3} />
    <PlayBox id="instruction3" />
    <ReactMarkdown source={instruction4} />
    <PlayBox id="instruction4" />
    <ReactMarkdown source={instruction5} />
    <PlayBox id="instruction5" />
    <ReactMarkdown source={instruction6} />
    <PlayBox id="instruction6" />
  </div>
);

export default UTInstructions;
