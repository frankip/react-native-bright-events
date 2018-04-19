import React, { Component } from 'react';
import axios from 'axios';

// local imports
import Navigation from './Navigation';
import EventCard from './EventCard';


class Main extends Component {
  constructor() {
    super();
    this.state = {
      eventList: [],
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    const ROOT = 'http://127.0.0.1:5000/api';
    axios.get(`${ROOT}/events/`)
      .then(response => {
        // toastr.success(response.data.message);
        // console.log(response.data);
        this.setState({ ...this.state, eventList: response.data }, () => {
          // console.log(" main", this.state);
        });
      })
      .catch(function (error) {
        console.log('asdfg');
        console.log(error);
      });
  }

  render() {
    const eventlist = this.state.eventList.map((event) => {
      return (
      // console.log(event);
        <EventCard
          key={event.id}
          id={event.id}
          title={event.event}
          location={event.location}
          date={event.date}
          category={event.category}
        />
      );
    },
    );


    return (
      <div>
        <section className="row">
          <div id="eventCard" className="row small-up-1 medium-up-2 large-up-3">
            {eventlist}
          </div>
        </section>
      </div>
    );
  }
}

export default Main;
