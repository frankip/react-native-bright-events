import React, { Component } from 'react';
import axios from 'axios';
import toastr from "toastr";

// material Ui
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import FloatingActionButton from "material-ui/FloatingActionButton";
import DatePicker from "material-ui/DatePicker";
import ContentAdd from "material-ui/svg-icons/content/add";


// foundation
import { Row, Column } from "react-foundation-components/lib/global/grid";

// local imports
import EventCard from './EventCard';
import Navigation from './Navigation';
import { instance, ROOT, isTokenExpired } from "./url_config";

const styles = {
  formstyle : {
    margin: 2,
    padding: 4,
  }
}

let events = [];
class Main extends Component {
  constructor() {
    super();
    this.state = {
      eventList: [],
      isLoggedIn: false,
      open: false,
      payload: {},
      token: localStorage.getItem("access_token"),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fetchEvents(){
    axios
      .get(`${ROOT}/events/?limit=30`)
      .then(response => {
        events = response.data;
        this.setState(
          { ...this.state, eventList: response.data },
          () => { }
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentWillMount() {
    this.fetchEvents()
  }

  // toggle for openning and clossing the dialog
  toggleOpenState = () => {
    this.setState({open: !this.state.open});
  }

  // takes care of submiting and creating a new event
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ open: false });

    let payload = this.state.payload
    
    // axios instance for posting to the api endpoint events
    instance
      .post(ROOT + "/events/", payload)
      .then(response => {
        toastr.success(response.statusText);
        this.fetchEvents();
      })
      .catch(function(error) {
        toastr.warning(error.response.data.message);
      });
  };

  // Receives the data from the input and update the state
  handleChange = e => {
    const { payload } = this.state;
    payload[e.target.name] = e.target.value;
    this.setState({ ...this.state, payload});
  };

  // receives the date from datepicker and updates the state
  setDate(x, date){
    const { payload } = this.state;
    payload["date"] = date.toDateString();
    this.setState({ payload });
  }

  // searches through the events 
  handleSearch = e => {
    let searchStr = "";
    searchStr = e.target.value.toLowerCase().trim()
    let eventItem;
    
    let searchRes = [];
    
    if (searchStr !== ""){

      for (let eventIndex = 0; eventIndex < events.length; eventIndex++) {
        eventItem = events[eventIndex];

        if (eventItem.event
            .toLowerCase()
            .includes(
              searchStr
            ) || eventItem.location.toLowerCase().includes(searchStr)) {
          searchRes.push(eventItem);
        }
      }
      
      this.setState({eventList: searchRes});
    }
    else { this.setState({ eventList: events }); }
  }
  
  render() {
    // actions on the dialog modal
    const action = [
      <RaisedButton
        key={1}
        label="close"
        secondary={true}
        style={{ float: 'left' }}
        onClick={this.toggleOpenState}
      />,
      <RaisedButton
        key={2}
        label="Submit"
        primary={true}
        keyboardFocused={true}
        type="submit"
        onSubmit={this.handleSubmit}
      />,
    ];

    // loop through the events and pass them to the event card component
    const eventlist = this.state.eventList.map(event => (
      <EventCard
        key={event.id}
        id={event.id}
        event={event.event}
        location={event.location}
        date={event.date}
        category={event.category}
        description={event.description}
        created_by={event.created_by}
      />
    ));


    return <div>
        <Navigation />
        <section className="row">
          <div>
            <div className="input-group search-box">
              <span className="input-group-label">search</span>
              <input className="input-group-field medium-6 cell" type="search" name="search" onChange={this.handleSearch} />
            </div>
          </div>
          {this.state.token && !isTokenExpired(this.state.token) ?
            <FloatingActionButton className="fab" label="add event" onClick={this.toggleOpenState}>
              <ContentAdd />
            </FloatingActionButton> : null}
          <Row id="eventCard" largeUp={3} mediumUp={2} smallUp={1}>
            {eventlist}
          </Row>
          <Dialog title="Create a New Event" modal={false} open={this.state.open} onRequestClose={this.toggleOpenState} autoScrollBodyContent={true}>
            <Row>
              <form method="POST" onSubmit={this.handleSubmit}>
                <Row>
                  <Column large={6}>
                    <input type="text" name="event" placeholder="Event Name" required onChange={this.handleChange} />
                  </Column>
                  <Column large={6}>
                    <input type="text" name="category" placeholder="category" required onChange={this.handleChange} />
                  </Column>
                </Row>
                <Row>
                  <Column large={6}>
                    <input type="text" name="location" placeholder="Event Location" required onChange={this.handleChange} />
                  </Column>
                  <Column large={6}>
                    <DatePicker hintText="Event date" name="date" fullWidth={true} inputStyle={styles.formstyle} onChange={(x, date) => this.setDate(x, date)} />
                  </Column>
                </Row>
                <Row>
                  <Column small={12} medium={12} large={12}>
                    <textarea name="description" type="text" placeholder="Event description" cols="30" rows="5" onChange={this.handleChange} />
                  </Column>
                </Row>
                <div value="submit" style={{ textAlign: "right", padding: 8, margin: "24px -24px -24px -24px" }}>
                  {action}
                </div>
              </form>
            </Row>
          </Dialog>
        </section>
      </div>;
  }
}

export default Main;
