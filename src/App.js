import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// local imports
import Approutes from './Routes';
import './static/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      token: '',
      authUser: null,
    };
  }

  render() {
    return (
        <Router>
          <div className="App">
            {/* <Navigation /> */}
            <Approutes authUser={this.state.authUser}/>
          </div>
        </Router>
    );
  }
}

export default App;
