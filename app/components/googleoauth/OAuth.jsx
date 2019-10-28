import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

const GoogleSignIn = styled.button`
  width: 243px;
  height: 66px;
  align-self: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  text-align: center;
`;

const OAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const oAuthSuccess = (response) => {
    fetch('http://localhost:3000/saveuser', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: response.Zi.id_token,
      }),
    })
      .then((res) => res.json());
    setIsAuthenticated(true);
  };

  const oAuthFailure = (response) => {
    setIsAuthenticated(false);
  };

  return (
    <>
      { isAuthenticated
        ? <Redirect to="/success" />
        : (
          <Wrapper>
            <GoogleLogin
              clientId="1024058665172-o9pn5n310kl728dtq22r36opsmiq1k4j.apps.googleusercontent.com"
              buttonText="Sign in with Google"
              onSuccess={oAuthSuccess}
              onFailure={oAuthFailure}
              cookiePolicy="single_host_origin"
              tag={GoogleSignIn}
            />
          </Wrapper>
        )}
    </>
  );
};

export default OAuth;
