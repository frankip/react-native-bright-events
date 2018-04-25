import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Main from './components/Main';
import EventCardDetails from './components/EventCardDetails';


export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Registration} />
        <Route path="/test" component={EventCardDetails} />
        <Route path="/events/:id" component={EventCardDetails} />
      </Switch>
    </Router>
  );
};
