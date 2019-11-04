import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 339px;
`;

const BodyText = styled.div`
  line-height: 1.31;
  margin: 53px;
`;

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
          <Wrapper>
            <Button variant="outlined" type="button" onClick={userTestReroute}>
              <BodyText>user test</BodyText>
            </Button>
            <Button variant="outlined" type="button" onClick={playgroundReroute}>
              <BodyText> playground</BodyText>
            </Button>
          </Wrapper>
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
