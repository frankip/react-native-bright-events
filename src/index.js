import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './static/index.css';
import App from './App';

const Application = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(<Application />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}