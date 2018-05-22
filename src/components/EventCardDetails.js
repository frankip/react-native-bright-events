import React, { Component } from 'react';
import axios from 'axios';
import toastr from "toastr";
import tokenProvider from "axios-token-interceptor";
import Navigation from './Navigation';


const ROOT = "http://127.0.0.1:5000/api";
const instance = axios.create({});

class EventCardDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      token: ''
    };
  }

  getEventFromId () {
    const eventId = this.props.match.params.id;
    let event = {};

    axios
      .get(`${ROOT}/events/${  eventId.toString()}`)
      .then(response => {
        this.setState({ event: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
      return event;
  }


  componentWillMount() {

    let eventDetails;
    if (this.props.location.state) {
      this.setState({ event: this.props.location.state.event });
    } else {
      this.getEventFromId();
    }
  }

  handleRsvp = () => {
    let eventId = this.props.match.params.id;
    let token = localStorage.getItem("access_token")
  
    instance.interceptors.request.use(tokenProvider({
        getToken: () => localStorage.getItem("access_token")
      }));

    instance.post(`${ROOT}/events/${eventId.toString()}/rsvp/`)
    .then((response) => {
          toastr.success(response.data.message);
    }).catch(function(error) {
        toastr.warning(error.response.data.message);
      });
  }
  
  handleEdit = () => {
    console.log("edit it");
  }
  handleDelete = () =>{

    let token = localStorage.getItem("access_token");
    let IDEvent = this.state.event.id;
    instance.interceptors.request.use(tokenProvider({
      getToken: () => localStorage.getItem("access_token")
      }));
    instance.delete(`${ROOT}/events/${IDEvent.toString()}`).then((response) => {
          toastr.success(response.data.message);
      setTimeout(function () {
        window.location.assign("/");
      }, 2000);
          console.log("hgv", response)
    }).catch(function(error) {
        toastr.warning(error.response.data.message);
        console.log(error.response.data.message);
      });

  }

  render() {
    return (
    <div>
      <Navigation/>
        <section className="row wide event-container">
          <div className="overlay" />
          <h2 className="text-display">{this.state.event.title || this.state.event.event}</h2>
          <h3 className="text-display">{this.state.event.date}</h3>
          <h4 className="text-display">{this.state.event.location}</h4>
        </section>
        <section className="row event-description">
          <div className="column large-8 small-12">
            <h3>Description</h3>
            <p>
              {" "}
              Odit et sint temporibus facilis omnis molestiae et. Et laborum
              sint dolorem eveniet. Qui quaerat reprehenderit omnis
              provident. Necessitatibus blanditiis esse delectus ipsum. Non
              quibusdam quaerat laborum. Fugit ipsa possimus blanditiis
              possimus cumque perspiciatis.{" "}
            </p>
          </div>
          <div className="column large-3 small-12">
            <button className="button expanded" onClick={this.handleRsvp}>
              RSVP
            </button>
            <div className="row interactions">
              <div className="right">
                <li>
                  <a href="#" onClick={this.handleEdit}>
                    <i className="fa fa-pencil" />{" "}
                  </a>
                </li>
                <li>
                  <a href="#" onClick={this.handleDelete}>
                    <i className="fa fa-trash-o" />
                  </a>
                </li>
              </div>
            </div>
          </div>
        </section>
      </div>);
  }
}

export default EventCardDetails;

