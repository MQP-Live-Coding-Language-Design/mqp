import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './components/common/Homepage';
import SignInPage from './components/googleoauth/SignInPage';
import UTHomepage from './components/usertesting/UTHomepage';
import Playground from './components/playground/Playground';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SignInPage} />
      <Route path="/success" component={Homepage} />
      <Route path="/usertesting" component={UTHomepage} />
      <Route path="/playground" component={Playground} />
    </Switch>
  </BrowserRouter>
);

export default App;
