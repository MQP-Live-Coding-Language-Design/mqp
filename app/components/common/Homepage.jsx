import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';


const Homepage = () => {
  const [reroute, setReroute] = useState('homepage');

  const userTestReroute = () => {
    setReroute('usertest');
  };

  const playgroundReroute = () => {
    setReroute('playground');
  };

  const renderSwitch = () => {
    switch (reroute) {
      case 'usertest':
        return <Redirect to="/usertest" />;
      case 'playground':
        return <Redirect to="/playground" />;
      default:
        return (
          <>
            <Button type="button" onClick={userTestReroute}>
  user test
            </Button>
            <Button type="button" onClick={playgroundReroute}>
  playground
            </Button>
          </>
        );
    }
  };

  const cookies = new Cookies();
  if (cookies.get('email')) {
    return renderSwitch();
  }
  return <Redirect to="/" />;
};

export default Homepage;
