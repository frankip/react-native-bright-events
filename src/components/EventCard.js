import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class EventCard extends Component {
  render() {
    return (
      <div>
        <div className="column">
          <div className="callout">
            <img className="thumbnail" src="http://lorempixel.com/400/200/nightlife" alt="image-one" />
            <h5>Color Festival</h5>
            <i className="fa fa-calendar fa-2x fa-fw" aria-hidden="true"></i>
            <p className="small">Dec 9, 2017</p>
            <br /> <i className="fa fa-map-marker fa-2x fa-fw" aria-hidden="true"></i>
            <p className="small">Nairobi</p>
            <a href="view_details.html" className="button small expanded hollow">View more details</a>
          </div>
        </div>
      </div>
    );
  }
}

export default EventCard;
