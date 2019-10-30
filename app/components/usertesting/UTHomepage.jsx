import React from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import UTNavigation from './UTNavigation';

const UTHomepage = () => {
  const cookies = new Cookies();
  if (cookies.get('email')) {
    return <UTNavigation />;
  }
  return <Redirect to="/" />;
};


export default UTHomepage;
