import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { intro } from './intro';

const Wrapper = styled.section`
  display:flex;
  justify-content:space-around;
  align-content: center;
  height: 98vh;
`;

const Half = styled.section`
  display: flex;
  width: 40vw;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-around;
`;

const LandingPage = () => {
  const [route, setRoute] = useState('landingpage');

  const reroute = (newRoute) => {
    setRoute(newRoute);
  };

  const renderSwitch = () => {
    switch (route) {
      case 'playground':
        return <Redirect to="/playground" />;
      case 'tutorial':
        return <Redirect to="/tutorial" />;
      case 'documentation':
        return <Redirect to="/documentation" />;
      case 'exercises':
        return <Redirect to="/exercises" />;
      default:
        return (
          <Wrapper>
            <Half>
              <ReactMarkdown source={intro} />
            </Half>
            <Half>
              <Button variant="outlined" type="button" onClick={() => reroute('playground')}>
              Playground
              </Button>
              <Button variant="outlined" type="button" onClick={() => reroute('tutorial')}>
              Tutorial
              </Button>
              <Button variant="outlined" type="button" onClick={() => reroute('documentation')}>
              Documentation
              </Button>
              <Button variant="outlined" type="button" onClick={() => reroute('exercises')}>
              Exercises
              </Button>
            </Half>
          </Wrapper>
        );
    }
  };

  return renderSwitch();
};

export default LandingPage;
