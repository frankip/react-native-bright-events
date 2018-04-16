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
      isLoggedIn: true
    };
  }

  componentDidMount() {
    const ROOT = "http://127.0.0.1:5000/api";
    axios
      .get(ROOT + "/events/")
      .then(function(response) {
        // toastr.success(response.data.message);
        console.log(response.data);
        // if (response.data.code === 202) {
        //   console.log("Login new successfull");
        //   console.log(response.data);
        // }
      })
      .catch(function(error) {
        console.log("asdfg");
        console.log(error.response.data.message);
      });
  }

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
