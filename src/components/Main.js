import React, { Component } from 'react';
import axios from 'axios';
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import FloatingActionButton from "material-ui/FloatingActionButton";
import DatePicker from "material-ui/DatePicker";
import TextField from "material-ui/TextField";

// local imports
import EventCard from './EventCard';
import Navigation from './Navigation';


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
        this.setState({ ...this.state, eventList: response.data }, () => {
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    console.log("submit button");
    console.log(this.firstname);
    
    this.setState({ open: false });
    
  };

  render() {
    const action = [
      <FlatButton
        label="close"
        primary={true}
        onClick={this.handleClose}
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
        
        <FloatingActionButton iconClassName="add" label="add event" onClick={this.handleOpen} />

          <Dialog 
          title="Create a New Event" 
            actions={action} 
            modal={true}
            open={this.state.open} 
            onRequestClose={this.handleClose}
            autoScrollBodyContent={true}
          >
            <TextField floatingLabelText="Event Name" floatingLabelFixed={true} ref="first_name"  /> <br /> <br />\
            <TextField floatingLabelText="Description" /> <br /><br />
            <TextField floatingLabelText="Event Location" floatingLabelFixed={true} /> <br /><br />
            <DatePicker hintText="Event date" /><br />
          </Dialog>
        </section>
      </div>
    );
  }
}

export default Main;
