import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UTHomepage from './components/usertesting/UTHomepage';
import Playground from './components/playground/Playground';
import LandingPage from './components/LandingPage/LandingPage';
import Tutorial from './components/tutorial/Tutorial';
import UserDocumentation from './components/documentation/UserDocumentation';
import Navbar from './components/common/Navbar';
import Exercises from './components/exercises/Exercises';

const App = () => (
  <BrowserRouter>
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/usertest" component={UTHomepage} />
        <Route path="/playground" component={Playground} />
        <Route path="/tutorial" component={Tutorial} />
        <Route path="/exercises" component={Exercises} />
        <Route path="/documentation" component={UserDocumentation} />
      </Switch>
    </>
  </BrowserRouter>
);

export default App;
