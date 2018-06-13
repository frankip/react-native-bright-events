import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';
import Validator from 'validator';

// local imports
import { ROOT } from './url_config';

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      payload: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      isLoged: false,
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // sends the registration payload to the api
  handleOnSubmit(e) {
    e.preventDefault();
    const payload = this.state.payload;

    if (!Validator.equals(payload.password, payload.confirmPassword)) {
      toastr.warning('Passwords do not match');
    } else {
      axios.post(`${ROOT}/auth/register/`, payload)
        .then((response) => {
          toastr.success(response.data.message);
          this.setState({ isLoged: true });
          this.props.history.push('/login');
        })
        .catch(function (error) {
          toastr.warning(error.response.data.message);
        });
    }
  }

  handleChange(e) {
    const { payload } = this.state;
    payload[e.target.name] = e.target.value;
    this.setState({ payload });
  }

  render() {
    return (
      <div className="body">
        <div className="intro">
          <div>
            <h1>
              Welcome to<br />
              <span>Bright Events</span>
            </h1>
            <p>
              create and manage different types of events while making them
              easily accessible to target markets
            </p>
          </div>
        </div>
        <div className="form">
          <ul className="tab-group">
            <li className="tab active">
              <Link href to="/signup">Signup</Link>
            </li>
            <li className="tab">
              <Link href to="/login">login</Link>
            </li>
          </ul>
          <div className="tab-content">
            <div id="signup">
              <h3>Sign Up for Free</h3>

              <form onSubmit={this.handleOnSubmit}>
                <div className="top-row">
                  <div className="field-wrap">
                    <input type="text" name="first_name" id="first_name" placeholder="First Name" required onChange={this.handleChange} />
                  </div>
                  <div className="field-wrap">
                    <input type="text" name="last_name" placeholder="Last Name" required onChange={this.handleChange} />
                  </div>
                </div>
                <div className="field-wrap">
                  <input type="email" name="email" placeholder="Email" required onChange={this.handleChange} />
                </div>
                <div className="field-wrap">
                  <input type="password" name="password" placeholder="password" required onChange={this.handleChange} />
                </div>
                <div className="field-wrap">
                  <input type="password" name="confirmPassword" placeholder="confirm password" onChange={this.handleChange} />
                </div>
                <button type="submit" value="submit" className="button button-block">
                  Get Started
                </button>
              </form>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;
