import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Main from './components/Main';


export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Registration} />
        <Route path="/login" component={Login} />
        <Route path="/events" component={Main} />
      </Switch>
    </Router>
  );
};
