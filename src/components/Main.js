import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// local imports
import Navigation from './Navigation';
import EventCard from './EventCard';

class Main extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <section className="row">
          <div id="eventCard" className="row small-up-1 medium-up-2 large-up-3">
            <EventCard />
            <EventCard />
            <EventCard />
          </div>
        </section>
      </div>
    );
  }
}

export default Main;
