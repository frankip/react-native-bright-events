import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EventCard extends Component {
  render() {
    const values = this.props;
    return (
      <div>
        <div className="column">
          <div className="callout">
            {/* <img className="thumbnail" src="http://lorempixel.com/400/200/nightlife" alt="event_image" /> */}
            <h5>{values.event}</h5>
            <i className="fa fa-calendar fa-2x fa-fw" aria-hidden="true" />
            <p className="small">{values.date}</p>
            <br /> <i className="fa fa-map-marker fa-2x fa-fw" aria-hidden="true" />
            <p className="small">{values.location}</p>
            <Link className="button small expanded hollow" to={{ pathname: `/events/${values.id}`, state: { event: values } }}>
              View more details
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default EventCard;
