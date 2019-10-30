import React from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import UTHomepage from '../usertesting/UTHomepage';

const Homepage = () => {
  const cookies = new Cookies();
  if (cookies.get('email')) {
    return <UTHomepage />;
  }
  return <Redirect to="/" />;
};

export default Homepage;
