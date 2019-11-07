import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Cookies from 'universal-cookie';

const OAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const cookies = new Cookies();

  const oAuthSuccess = (response) => {
    const expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 3600 * 1000);
    cookies.set('email', response.getBasicProfile().getEmail(), { path: '/', expires: expirationTime });
    fetch('https://mqp-server.herokuapp.com/saveuser', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: response.getBasicProfile().getEmail(),
      }),
    })
      .then((res) => res.json());
    setIsAuthenticated(true);
    window.location.reload();
  };

  const logout = () => {
    cookies.remove('email');
    setIsAuthenticated(false);
    window.location.reload();
  };

  return (
    <>
      { cookies.get('email')
        ? (
          <GoogleLogout
            clientId="1024058665172-o9pn5n310kl728dtq22r36opsmiq1k4j.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={logout}
          />
        )
        : (
          <GoogleLogin
            clientId="1024058665172-o9pn5n310kl728dtq22r36opsmiq1k4j.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={oAuthSuccess}
            onFailure={logout}
            cookiePolicy="single_host_origin"
          />
        )}
    </>
  );
};

export default OAuth;
