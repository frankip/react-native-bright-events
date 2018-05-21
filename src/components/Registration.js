import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import toastr from "toastr";

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      isLoged : false
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  handleOnSubmit(e) {
    e.preventDefault();
    const ROOT = 'http://127.0.0.1:5000/api';
    let payload = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
    }
    axios.post(ROOT + "/auth/register/", payload)
    .then((response) => {
    toastr.success(response.data.message);
    this.setState({isLoged: true})
      this.props.history.push("/login");
    })
    .catch(function (error) {
      toastr.warning(error.response.data.message);
    });
  }

  handleChange = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
    console.log(this.state)
    
  };
  render() {
    return <div className="body">
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
              <Link to="/signup">Signup</Link>
            </li>
            <li className="tab">
              <Link to="/login">login</Link>
            </li>
          </ul>
          <div className="tab-content">
            <div id="signup">
              <h3>Sign Up for Free</h3>

              <form onSubmit={this.handleOnSubmit}>
                <div className="top-row">
                  <div className="field-wrap">
                    <input type="text" name="first_name" placeholder="First Name" required ref="first_name" onChange={this.handleChange} />
                  </div>
                  <div className="field-wrap">
                  <input type="text" name="last_name" placeholder="Last Name" required ref="last_name" onChange={this.handleChange} />
                  </div>
                </div>
                <div className="field-wrap">
                <input type="email" name="email" placeholder="Email" required ref="email" onChange={this.handleChange} />
                </div>
                <div className="field-wrap">
                <input type="password" name="password" placeholder="password" required ref="password" onChange={this.handleChange} />
                </div>
                <div className="field-wrap">
                <input type="password" name="password" placeholder="confirm password" required ref="password" onChange={this.handleChange} />
                </div>
                {/* <a type="submit" value="submit" className="button button-block">Get Started</a>  */}
                <button type="submit" value="submit" className="button button-block">
                  Get Started
                </button>
              </form>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>;
  }
}

export default Registration;
