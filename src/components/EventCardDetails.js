import React, { Component } from 'react';
import axios from 'axios';
import toastr from "toastr";
import tokenProvider from "axios-token-interceptor";


const ROOT = "http://127.0.0.1:5000/api";
const instance = axios.create({});

class EventCardDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      event: '',
      location: '',
      category: '',
      date: '',
    };
  }

  componentDidMount() {
    const eventId = this.props.match.params.id;
    axios
      .get(`${ROOT}/events/${  eventId.toString()}`)
      .then(response => {
        // console.log(response.data.event);
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
          },
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleRsvp = () => {
    const eventId = this.props.match.params.id;
    instance.interceptors.request.use(tokenProvider({
        getToken: () => localStorage.getItem("access_token")      
      }));

    instance.post(`${ROOT}/events/${eventId.toString()}/rsvp/`).then((response) => {
          toastr.success(response.data.message);
          console.log("hgv", response)
    }).catch(function(error) {
        toastr.warning(error.response.data.message);
        console.log(error.response.data.message);
      });     
    
    // axios
    //   .post(`${ROOT}/events/${eventId.toString()}/rsvp`)
    //   .then(response => {
    //     // toastr.success(response.data.message);
    //     console.log(response.data)
    //   })
    //   .catch(function(error) {
    //     toastr.warning(error.response.data.message);
    //     console.log(error.response.data.message);
    //   });
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
          <div className="column large-3 small-12"> 
          <button className="button expanded" onClick={this.handleRsvp}>RSVP</button>
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

