import React from 'react';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import OAuth from './OAuth';

const Title = styled.div`
  font-size: 30px;
  font-weight: 300;
  line-height: 1.3;
  margin-bottom: 16px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 452px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 339px;
`;

const BodyText = styled.div`
  line-height: 1.31;
  margin-bottom: 53px;
`;

const SignInPage = () => {
  const cookies = new Cookies();
  if (cookies.get('email')) {
    return <Redirect to="/success" />;
  }

  return (
    <Wrapper>
      <Column>
        <Title>Welcome to Language</Title>
        <OAuth />
      </Column>
    </Wrapper>
  );
};

export default SignInPage;
