import React, { Component } from 'react';
import logo from './logo.svg';
import './static/App.css';
import Registration from './components/Registration';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Registration />
      </div>
    );
  }
}

export default App;
