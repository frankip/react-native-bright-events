import React, { Component } from 'react';
import axios from 'axios';
import toastr from "toastr";

import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import DatePicker from "material-ui/DatePicker";
import TextField from "material-ui/TextField";

// foundation
import { Row, Column } from "react-foundation-components/lib/global/grid";

// local imports
import Navigation from './Navigation';
import { instance, ROOT } from "./url_config";

const styles = {
  formstyle: {
    margin: 2,
    padding: 4,
  }
}

class EventCardDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      token: '',
      open: false
    };
  }
  // toggle opening and closing dialog
  toggleOpenState = () => {
    this.setState({
      open: !this.state.open
    });
  };

  // fetch event details if there are no props
  getEventFromId() {
    const eventId = this.props.match.params.id;
    let event = {};

    axios
      .get(`${ROOT}/events/${eventId.toString()}`)
      .then(response => {
        this.setState({ event: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
    return event;
  }
  // onchange handler for date picker
  setDate(x, date) {
    this.setState({ date: date.toDateString() });
  }

  componentWillMount() {
    if (this.props.location.state) {
      this.setState({ event: this.props.location.state.event });
    } else {
      this.getEventFromId();
    }
  }

  // Make rsvp reservation
  handleRsvp = () => {
    let eventId = this.props.match.params.id;

    instance
      .post(`${ROOT}/events/${eventId.toString()}/rsvp/`)
      .then(response => {
        toastr.success(response.data.message);
      })
      .catch(function(error) {
        toastr.warning(error.response.data.message);
      });
  };

  // Edit and post event
  handleEdit = () => {
    let eventId = this.props.match.params.id;
    let payload = this.state.event;
    payload["date"] = this.state.date;

    instance
      .put(`${ROOT}/events/${eventId.toString()}/`, payload)
      .then(response => {
        toastr.success(response.data.message);
      })
      .catch(function (error) {
        toastr.warning(error.response.data.message);
      });
  };

  // delete event
  handleDelete = () => {
    let IDEvent = this.state.event.id;
    instance
      .delete(`${ROOT}/events/${IDEvent.toString()}`)
      .then(response => {
        toastr.success(response.data.message);
        this.props.history.push("/");
      })
      .catch(function(error) {
        toastr.warning(error.response.data.message);
        console.log(error.response.data.message);
      });
  };

  // get data from input and update state 
  handleChange = e => {
    const event = this.state.event
    event[e.target.name] = e.target.value
    this.setState({ ...this.state, event });
    
  };

  render() {
    // action buttons for material UI dialog
    const action = [
      <RaisedButton
        label="close"
        primary={true}
        onClick={this.toggleOpenState}
      />,
      <RaisedButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleEdit}
      />
    ];

    return (
      <div>
        <Navigation />
        <section className="row wide event-container">
          <div className="overlay" />
          <h2 className="text-display">
            {this.state.event.title || this.state.event.event}
          </h2>
          <h3 className="text-display">{this.state.event.date}</h3>
          <h4 className="text-display">{this.state.event.location}</h4>
        </section>
        <section className="row event-description">
          <div className="column large-8 small-12">
            <h3>Description</h3>
            <p>
              Odit et sint temporibus facilis omnis molestiae et. Et laborum
              sint dolorem eveniet. Qui quaerat reprehenderit omnis provident.
              Necessitatibus blanditiis esse delectus ipsum. Non quibusdam
              quaerat laborum. Fugit ipsa possimus blanditiis possimus cumque
              perspiciatis.{" "}
            </p>
          </div>
          <div className="column large-3 small-12">
            <button className="button expanded" onClick={this.handleRsvp}>
              RSVP
            </button>
            <div className="row interactions">
              <div className="right">
                <li>
                  <a href="#" onClick={this.toggleOpenState}>
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
          <Dialog
            title="Create a New Event"
            actions={action}
            modal={true}
            open={this.state.open}
            onRequestClose={this.toggleOpenState}
            autoScrollBodyContent={true}
          >
            <Row>
              <Row>
                <Column large={6}>
                  <TextField
                    floatingLabelText="Event Name"
                    floatingLabelFixed={true}
                    defaultValue={
                      this.state.event.title || this.state.event.event
                    }
                    fullWidth={true}
                    name="event"
                    onChange={this.handleChange}
                    inputStyle={styles.formstyle}
                  />
                </Column>
                <Column large={6}>
                  <TextField
                    floatingLabelText="category"
                    floatingLabelFixed={true}
                    defaultValue={this.state.event.category}
                    name="category"
                    fullWidth={true}
                    inputStyle={styles.formstyle}
                    onChange={this.handleChange}
                  />{" "}
                  <br />
                </Column>
              </Row>
              <Row>
                <Column large={6}>
                  <TextField
                    floatingLabelText="Event Location"
                    floatingLabelFixed={true}
                    name="location"
                    defaultValue={this.state.event.location}
                    fullWidth={true}
                    inputStyle={styles.formstyle}
                    onChange={this.handleChange}
                  />
                </Column>
                <Column large={6}>
                  <DatePicker
                    hintText="Event date"
                    name="date"
                    mode="landscape"
                    fullWidth={true}
                    defaultDate={new Date(this.state.event.date)}
                    inputStyle={styles.formstyle}
                    onChange={(x, date) => this.setDate(x, date)}
                  />
                </Column>
              </Row>
              <Row>
                <Column small={12} medium={12} large={12}>
                  <TextField
                    floatingLabelText="Description"
                    name="description"
                    multiLine={true}
                    fullWidth={true}
                    rows={4}
                    onChange={this.handleChange}
                  />{" "}
                  <br />
                </Column>
              </Row>
              <br />
            </Row>
          </Dialog>
        </section>
      </div>
    );
  }
}

export default EventCardDetails;

