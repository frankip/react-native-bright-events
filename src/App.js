import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// local imports
import Approutes from './Routes';
import './static/App.css';
import Navigation from './components/Navigation';

// instanciate new context
export const MyContext = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      token: '',

    };
  }

  handleUpdateState = (data) => {
    this.setState({ isLoggedIn: data.loggedin, token: data.token });
  }

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          updateState: this.handleUpdatestate,
      }}
      >
        {this.props.children}
        <Router>
          <div className="App">
            {/* <Navigation /> */}
            <Approutes />
          </div>
        </Router>
      </MyContext.Provider>
    );
  }
}

export default App;
