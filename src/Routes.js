import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Main from './components/Main';
import EventCardDetails from './components/EventCardDetails';
import Myevents from './components/myEvents';

import * as ROUTES from './constants/routes';



export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.MAIN} component={Main} />
        <Route path={ROUTES.SIGN_IN} component={Login} />
        <Route path={ROUTES.SIGN_UP} component={Registration} />
        <Route path={ROUTES.EVENT_DETAILS} component={EventCardDetails} />
        <Route path={ROUTES.EVENTS} component={Myevents} />
      </Switch>
    </Router>
  );
};
