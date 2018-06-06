import React, { Component } from 'react';
import axios from 'axios';
// foundation
import { Row, Column } from 'react-foundation-components/lib/global/grid';

// local imports
import EventCard from './EventCard';
import Navigation from './Navigation';
import { instance, ROOT, isTokenExpired } from './url_config';

let events = [];

class Myevents extends Component {
  constructor() {
    super();
    this.state = {
      eventList: [],
      token: localStorage.getItem('access_token'),
    };
  }

  componentWillMount() {
    instance.get(`${ROOT}/events/`)
      .then(response => {
        events = response.data;
        this.setState({ ...this.state, eventList: response.data }, () => {
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const eventlist = this.state.eventList.map((event) =>
      (
        <EventCard
          key={event.id}
          id={event.id}
          event={event.event}
          location={event.location}
          date={event.date}
          category={event.category}
        />
      ),
    );
    return (
      <div>
        <Navigation />
        <section className="row">
          <div>
            <div className="input-group search-box">
              <span className="input-group-label">search</span>
              <input className="input-group-field medium-6 cell" type="search" name="search" onChange={this.handleSearch} />
            </div>
          </div>
          <Row id="eventCard" largeUp={3} mediumUp={2} smallUp={1}>
            {eventlist}
          </Row>
        </section>
      </div>);
  }
}

export default Myevents
;