import React, { Component } from 'react';
// foundation
import { Row } from 'react-foundation-components/lib/global/grid';

// local imports
import EventCard from './EventCard';
import Navigation from './Navigation';
import { instance, ROOT, isTokenExpired } from "./url_config";

const events = [];

class Myevents extends Component {
  constructor() {
    super();
    this.state = {
      eventList: [],
      token: localStorage.getItem('access_token'),
    };
  }

  componentWillMount() {
    if (this.state.token && !isTokenExpired(this.state.token)) {
      instance.get(`${ROOT}/events/`)
        .then(response => {
          const events = response.data;
          this.setState({ ...this.state, eventList: response.data }, () => {
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      this.props.history.replace('/login');
    }
  }

  render() {
    const eventlist = this.state.eventList.map(event => (
      <EventCard
        key={event.id}
        id={event.id}
        event={event.event}
        location={event.location}
        date={event.date}
        category={event.category}
        created_by={event.created_by}
      />
    ));
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

export default Myevents;

