import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './components/common/Homepage';
import SignInPage from './components/googleoauth/SignInPage';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SignInPage} />
      <Route path="/success" component={Homepage} />
    </Switch>
  </BrowserRouter>
);

export default App;
