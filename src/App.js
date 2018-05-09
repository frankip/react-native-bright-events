import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// local imports
import Approutes from './Routes';
import './static/App.css';
import Navigation from './components/Navigation';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* <Navigation /> */}
          <Approutes />
        </div>
      </Router>
    );
  }
}

export default App;
