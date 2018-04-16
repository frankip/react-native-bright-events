import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// local imports
import Navigation from './Navigation';

class Main extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <section className="row">
          <div id="eventCard" className="row small-up-1 medium-up-2 large-up-3">
            <div className="column">
              <div className="callout">
                <img className="thumbnail" src="http://lorempixel.com/400/200/nightlife" alt="image-one" />
                <h5>Color Festival</h5> <i className="fa fa-calendar fa-2x fa-fw" aria-hidden="true"></i>
                <p className="small">Dec 9, 2017</p>
                <br /> <i className="fa fa-map-marker fa-2x fa-fw" aria-hidden="true"></i>
                <p className="small">Nairobi</p> <a href="view_details.html" className="button small expanded hollow">View more details</a>
              </div>
            </div>
            <div className="column">
              <div className="callout"> <img className="thumbnail" src="http://lorempixel.com/400/200/people" alt="image-one" />
                <h5>Color Festival</h5> <i className="fa fa-calendar fa-2x fa-fw" aria-hidden="true"></i>
                <p className="small">Dec 9, 2017</p>
                <br /> <i className="fa fa-map-marker fa-2x fa-fw" aria-hidden="true"></i>
                <p className="small">Nairobi</p> <a href="view_details.html" className="button small expanded hollow">View more details</a>
              </div>
            </div>
            <div className="column">
              <div className="callout"> <img className="thumbnail" src="http://lorempixel.com/400/200/fashion" alt="image-one" />
                <h5>Color Festival</h5> <i className="fa fa-calendar fa-2x fa-fw" aria-hidden="true"></i>
                <p className="small">Dec 9, 2017</p>
                <br /> <i className="fa fa-map-marker fa-2x fa-fw" aria-hidden="true"></i>
                <p className="small">Nairobi</p> <a href="view_details.html" className="button small expanded hollow">View more details</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Main;
