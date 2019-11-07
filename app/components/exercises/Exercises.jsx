import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  exercise1, exercise2, exercise3, exercise4, exercise5, exercise6,
} from './exercises';
import PlayBox from '../common/PlayBox';


const Exercises = () => (
  <>
    <ReactMarkdown source={exercise1} />
    <PlayBox id="exercise1" />
    <ReactMarkdown source={exercise2} />
    <PlayBox id="exercise2" />
    <ReactMarkdown source={exercise3} />
    <PlayBox id="exercise3" />
    <ReactMarkdown source={exercise4} />
    <PlayBox id="exercise4" />
    <ReactMarkdown source={exercise5} />
    <PlayBox id="exercise5" />
    <ReactMarkdown source={exercise6} />
    <PlayBox id="exercise6" />
  </>
);

export default Exercises;
