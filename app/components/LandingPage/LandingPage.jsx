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
  height: 90vh;
`;

const Half = styled.section`
  display: flex;
  width: 30vw;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
`;

const LandingPage = () => (
  <Wrapper>
    <Half>
      <ReactMarkdown source={intro} />
    </Half>
  </Wrapper>
);

export default LandingPage;
