import React from 'react';
import styled from 'styled-components';
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

const SignInPage = () => (
  <Wrapper>
    <Column>
      <Title>Sign In</Title>
      <BodyText>To get started with Language, log in with your Google account.</BodyText>
      <OAuth />
    </Column>
  </Wrapper>
);

export default SignInPage;
