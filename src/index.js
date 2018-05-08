import React from 'react';
import ReactDOM from 'react-dom';
import './static/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const Application = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(<Application />, document.getElementById('root'));
registerServiceWorker();
