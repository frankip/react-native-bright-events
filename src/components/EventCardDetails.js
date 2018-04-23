import React, { Component } from 'react';
import axios from "axios";

class EventCardDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:'',
      event: '',
      location:'',
      category:'',
      date:'',
    }
  }

  componentDidMount() {
    const ROOT = "http://127.0.0.1:5000/api";
    let eventId = this.props.match.params.id;
    // console.log("id", eventId);
    axios
      .get(`${ROOT}/events/` + eventId.toString())
      .then(response => {
        // toastr.success(response.data.message);
        console.log(response.data.event);
        this.setState(
          {
            ...this.state,
            id: response.data.id,
            event: response.data.event,
            location: response.data.location,
            category: response.data.category,
            date: response.data.date,
          },
          () => {
            console.log(" main", this.state);
          }
        );
      })
      .catch(function(error) {
        console.log(error);
      });
  }


  render() {
    return (
      <div>
        <section className="row wide event-container">
          <div className="overlay"></div>
          <h2 className="text-display">{this.state.event}</h2>
          <h3 className="text-display">{this.state.date}</h3>
          <h4 className="text-display">{this.state.location}</h4>
        </section>
        <section className="row event-description">
          <div className="column large-8 small-12">
            <h3>Description</h3>
            <p> Odit et sint temporibus facilis omnis molestiae et. Et laborum sint dolorem eveniet. Qui quaerat reprehenderit omnis provident. Necessitatibus blanditiis esse delectus ipsum. Non quibusdam quaerat laborum. Fugit ipsa possimus blanditiis possimus cumque perspiciatis. </p>
          </div>
          <div className="column large-3 small-12"> <a className="button expanded">RSVP</a>
            <div className="row interactions">
              <div className="right">
                <li><a href="#"><i className="fa fa-pencil"></i> </a></li>
                <li><a href="#"><i className="fa fa-trash-o"></i></a></li>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default EventCardDetails;

