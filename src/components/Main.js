import React, { Component } from 'react';
import axios from 'axios';
import tokenProvider from "axios-token-interceptor";

import toastr from "toastr";

import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import FloatingActionButton from "material-ui/FloatingActionButton";
import DatePicker from "material-ui/DatePicker";
import TextField from "material-ui/TextField";

// local imports
import EventCard from './EventCard';
import Navigation from './Navigation';

const ROOT = "http://127.0.0.1:5000/api";
const instance = axios.create({});

class Main extends Component {
  constructor() {
    super();
    this.state = {
      eventList: [],
      isLoggedIn: false,
      open: false,
      
    };
  }

  componentDidMount() {
    axios.get(`${ROOT}/events/`)
      .then(response => {
        // toastr.success(response.data.message);
        this.setState({ ...this.state, eventList: response.data }, () => {
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  toggleOpenState = () => {
    this.setState({open: !this.state.open});
  }

  handleSubmit = () => {
    this.setState({ open: false });

    let token = localStorage.getItem("access_token");
    let payload = {
      event : this.state.event,
      location : this.state.location,
      category : this.state.category,
      description : this.state.description,
      date: this.state.date 
    }
    console.log(payload);
    
    instance.interceptors.request.use(tokenProvider({
      getToken: () => localStorage.getItem("access_token")
    }));

    instance
      .post(ROOT + "/events/", payload)
      .then(response => {
        toastr.success(response.statusText);
        
      })
      .catch(function(error) {
        toastr.warning(error.response.data.message);
        console.log(error.response);
        
      });
  };

  handleChange = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
    // console.log(this.state)
  };

  setDate(x, date){
    this.setState({ date: date.toDateString() });
    
  }
  render() {
    const action = [
      <FlatButton
        label="close"
        primary={true}
        onClick={this.toggleOpenState}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit}
      />,
    ];

    const eventlist = this.state.eventList.map((event) => {
      return (
        <EventCard
          key={event.id}
          id={event.id}
          event={event.event}
          location={event.location}
          date={event.date}
          category={event.category}
        />
      );
    },
    );


    return (
    <div>
        <Navigation />
        <section className="row">
          <div id="eventCard" className="row small-up-1 medium-up-2 large-up-3">
            {eventlist}
          </div>
        
        <FloatingActionButton iconClassName="add" label="add event" onClick={this.toggleOpenState} />

          <Dialog 
            title="Create a New Event" 
            actions={action} 
            modal={true}
            open={this.state.open} 
            onRequestClose={this.toggleOpenState}
            autoScrollBodyContent={true}
          >
            <TextField floatingLabelText="Event Name" floatingLabelFixed={true} name="event" onChange={this.handleChange}  /> <br /> <br />
            <TextField floatingLabelText="Description" name="description" onChange={this.handleChange} /> <br /><br />
            <TextField floatingLabelText="category" name="category" onChange={this.handleChange} /> <br /><br />
            <TextField floatingLabelText="Event Location" floatingLabelFixed={true} name="location" onChange={this.handleChange}/> <br /><br />
            <DatePicker hintText="Event date" name="date" onChange={(x, date) => this.setDate(x, date) }/><br />
          </Dialog>
        </section>
      </div>
    );
  }
}

export default Main;
