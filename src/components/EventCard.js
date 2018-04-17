import React, { Component } from 'react';

class EventCard extends Component {
  // console.log("asdcvbnm,.nbvc",this.props)
  render() {
    console.log('props', this.props);
    return (
      <div>
        <div className="column">
          <div className="callout">
            <img className="thumbnail" src="http://lorempixel.com/400/200/nightlife" alt="event_image" />
            <h5>{this.props.title }</h5>
            <i className="fa fa-calendar fa-2x fa-fw" aria-hidden="true"></i>
            <p className="small">{this.props.date}</p>
            <br /> <i className="fa fa-map-marker fa-2x fa-fw" aria-hidden="true"></i>
            <p className="small">{this.props.location}</p>
            <a href="view_details.html" className="button small expanded hollow">View more details</a>
          </div>
        </div>
      </div>
    );
  }
}

export default EventCard;
