import React, { Component } from 'react';
import axios from 'axios';
import toastr from "toastr";
import jwtDecode from "jwt-decode";

import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import DatePicker from "material-ui/DatePicker";

// foundation
import { Row, Column } from "react-foundation-components/lib/global/grid";

// local imports
import Navigation from './Navigation';
import { instance, ROOT, isTokenExpired } from "./url_config";

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
      token: localStorage.getItem("access_token"),
      open: false,
      event: {},
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
    console.log("getting event from api");
    axios
      .get(`${ROOT}/events/${eventId.toString()}`)
      .then(response => {
        this.setState({ event: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  // onchange handler for date picker
  setDate(x, date) {
    let event = Object.assign({}, this.state.event);
    event["date"] = date.toDateString();
    this.setState({ event });
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
    
    this.setState({ open: false });

    instance
      .put(`${ROOT}/events/${eventId.toString()}/`, payload)
      .then(() => {
          toastr.success('Event updated succesfully');
        })
      .catch(function (error) {
        toastr.warning(error.response.data.message);
      });
      this.props.history.replace(`/events/${eventId.toString()}`);
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
  handleChange =  e => {
    // let event = this.state.event;
    let event = Object.assign({}, this.state.event);
    event[e.target.name] = e.target.value;
    this.setState({ event });
  };

  render() {
    // action buttons for material UI dialog
    const action = [
      <RaisedButton
        label="close"
        secondary={true}
        style={{ float: 'left' }}
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
          {this.state.token && !isTokenExpired(this.state.token) ?
          <div className="column large-3 small-12">
              {this.state.event.created_by === jwtDecode(this.state.token).sub ?
              null
              :
              <button
                className="button expanded" onClick={this.handleRsvp}>
                RSVP
              </button>
              }
          </div>
          :null
          }
          <Dialog
            title="Update Event"
            actions={action}
            modal={true}
            open={this.state.open}
            onRequestClose={this.toggleOpenState}
            autoScrollBodyContent={true}
          >
            <Row>
              <form method="POST" onSubmit={this.handleSubmit}>
                <Row>
                  <Column large={6}>
                    <input type="text" name="event" placeholder="Event Name" required value={this.state.event.title || this.state.event.event} onChange={this.handleChange} />
                  </Column>
                  <Column large={6}>
                    <input type="text" name="category" placeholder="category" required value={ this.state.event.category } onChange={this.handleChange} />
                  </Column>
                </Row>
                <Row>
                  <Column large={6}>
                    <input type="text" name="location" placeholder="Event Location" required value={this.state.event.location} onChange={this.handleChange} />
                  </Column>
                  <Column large={6}>
                    <DatePicker
                      hintText="Event date"
                      name="date"
                      fullWidth={true}
                      inputStyle={styles.formstyle}
                      defaultDate={new Date(this.state.event.date)}
                      onChange={(x, date) => this.setDate(x, date)} />
                  </Column>
                </Row>
                <Row>
                  <Column small={12} medium={12} large={12}>
                    <textarea name="description" type="text" placeholder="Event description" cols="30" rows="5" onChange={this.handleChange}></textarea>
                  </Column>
                </Row>
              </form>
            </Row>
          </Dialog>
        </section>
      </div>
    );
  }
}

export default EventCardDetails;

