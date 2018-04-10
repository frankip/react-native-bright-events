import React, { Component } from 'react';

// local imports
import Approutes from './Routes';
import './static/App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Approutes />
      </div>
    );
  }
}

export default App;
