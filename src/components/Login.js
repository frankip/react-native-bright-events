import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import toastr from "toastr";
// local imports

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  handleOnSubmit(e) {
    e.preventDefault();
    const ROOT = "http://127.0.0.1:5000/api";
    // console.log(this.state.first_name);
    let payload = { 
      email: this.state.email, 
      password: this.state.password 
    };
    // console.log(payload);

    axios
      .post(ROOT + "/auth/login/", payload)
      .then(function(response) {
        toastr.success(response.data.message);
        console.log(response.data);
      })
      .catch(function(error) {
        toastr.warning(error.response.data.message);
        console.log(error.response.data.message);
      });
      this.props.history.push("/");
    e.target.reset();
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state)
  };

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
            <li className="tab">
              <Link to="/signup">Signup</Link>
            </li>
            <li className="tab active">
              <Link to="/login">login</Link>
            </li>
          </ul>
          <div className="tab-content">
            <div id="signup">
              <h3>Welcome Back!</h3>
              <form method="POST" onSubmit={this.handleOnSubmit}>
                <div className="field-wrap">
                  <label>
                    {" "}
                    Email Address<span className="req">*</span>{" "}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    ref="email"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="field-wrap">
                  <label>
                    {" "}
                    Set A Password<span className="req">*</span>{" "}
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    ref="password"
                    onChange={this.handleChange}
                  />
                </div>
                <p className="forgot">
                  <Link to="/">Forgot Password?</Link>
                </p>
                <button value="submit" className="button button-block">
                  Log In
                </button>
                {/* <a className="button button-block" href="index.html">Log In</a> */}
              </form>
            </div>
            <div id="login">
              <h3>Welcome Back!</h3>
              <form action="index.html" method="post">
                <div className="field-wrap">
                  <label>
                    {" "}
                    Email Address<span className="req">*</span>{" "}
                  </label>
                  <input type="email" required />
                </div>
                <div className="field-wrap">
                  <label>
                    {" "}
                    Password<span className="req">*</span>{" "}
                  </label>
                  <input type="password" required />
                </div>
                <p className="forgot" />
                <a className="button button-block" href="index.html">
                  Log In
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
