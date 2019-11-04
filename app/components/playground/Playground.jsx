import React from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import PlayBox from '../common/PlayBox';

const Playground = () => {
  const cookies = new Cookies();
  if (cookies.get('email')) {
    return <PlayBox id="fullBox" isPlayground />;
  }
  return <Redirect to="/" />;
};

export default Playground;
