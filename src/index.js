import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './static/index.css';
import App from './App';

import Firebase, { FirebaseContext } from './Firebase';

const Application = () => (
  <MuiThemeProvider>
    <FirebaseContext.Provider value={Firebase}>
    <App />
    </FirebaseContext.Provider>
  </MuiThemeProvider>
);

ReactDOM.render(<Application />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}