import React, { Component } from 'react';
import axios from 'axios';
import toastr from "toastr";

// material Ui
import {GridList, GridTile} from 'material-ui/GridList';
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import FloatingActionButton from "material-ui/FloatingActionButton";
import DatePicker from "material-ui/DatePicker";
import TextField from "material-ui/TextField";

// foundation
import { Row, Column } from "react-foundation-components/lib/global/grid";


// local imports
import EventCard from './EventCard';
import Navigation from './Navigation';
import { instance, ROOT } from './url_config';

const styles = {
  formstyle : {
    margin: 2,
    padding: 4,
  }
}


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

    let payload = {
      event : this.state.event,
      location : this.state.location,
      category : this.state.category,
      description : this.state.description,
      date: this.state.date 
    }
    
    instance
      .post(ROOT + "/events/", payload)
      .then(response => {
        toastr.success(response.statusText);
        
      })
      .catch(function(error) {
        toastr.warning(error.response.data.message);
        
      });
  };

  handleChange = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  setDate(x, date){
    this.setState({ date: date.toDateString() });
    
  }
  handleSearch = (text) => {

    const eventlist = this.state.eventlist;
    let searchRes = []

    // if(text){
    // for(let event : eventlist){
    //   if(text in event.event || text in event.location || text in event.description){
    //     searchRes.append(event);
    //   }
    // }
    this.setState({eventlist: searchRes});
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

    const eventlist = this.state.eventList.map((event) => 
       (
        <EventCard
          key={event.id}
          id={event.id}
          event={event.event}
          location={event.location}
          date={event.date}
          category={event.category}
        />
      )
    );


    return (
    <div>
        <Navigation />
        <section className="row">
          <FloatingActionButton iconClassName="add" label="add event" onClick={this.toggleOpenState} />
          <Row id="eventCard" largeUp={3} mediumUp={2} smallUp={1}>
              {eventlist}
        </Row>
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
                  name="category" 
                  fullWidth={true} 
                  inputStyle={styles.formstyle} 
                  onChange={this.handleChange} /> <br />
            </Column>
             </Row>
            <Row>
              <Column large={6}>
                  <TextField floatingLabelText="Event Location" floatingLabelFixed={true} name="location" fullWidth={true} inputStyle={styles.formstyle} onChange={this.handleChange} />
            </Column>
            <Column large={6}>
            <DatePicker hintText="Event date" name="date" fullWidth={true} inputStyle={styles.formstyle} onChange={(x, date) => this.setDate(x, date)} />
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
                  onChange={this.handleChange} /> <br />
            </Column>
            </Row>
            <br />
          </Row>
          </Dialog>
        </section>
      </div>);
  }
}

export default Main;
