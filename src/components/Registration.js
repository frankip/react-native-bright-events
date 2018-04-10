import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  handleOnSubmit(e) {
    console.log(
      this.refs.first_name.value,
      this.refs.last_name.value,
      this.refs.email.value,
      this.refs.password.value);
    // console.log(e);
    const values = new FormData();
    values.set('first_name', this.refs.first_name.value);
    values.set('last_name', this.refs.last_name.value);
    values.set('email', this.refs.email.value);
    values.set('password', this.refs.password.value);

    // this.props.UserReg(values);
    e.preventDefault();
    e.target.reset();
    // this.refs.first_name.value='';
    // this.refs.last_name.value='';
    // this.refs.email.value='';
    // this.refs.password.value='';
  }

  // handleChange = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };
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
              <Link to="/">Signup</Link>
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
                    <label>
                      {' '}
                      First Name<span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      required
                      ref="first_name"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="field-wrap">
                    <label>
                      {' '}
                      Last Name<span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      required
                      ref="last_name"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="field-wrap">
                  <label>
                    {' '}
                    Email Address<span className="req">*</span>{' '}
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
                    {' '}
                    Set A Password<span className="req">*</span>{' '}
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    ref="password"
                    onChange={this.handleChange}
                  />
                </div>
                {/* <a type="submit" value="submit" className="button button-block">Get Started</a>  */}
                <button
                  type="submit"
                  value="submit"
                  className="button button-block"
                >
                  Get Started
                </button>
              </form>
            </div>
            <div id="login">
              <h3>Welcome Back!</h3>
              <form action="index.html" method="post">
                <div className="field-wrap">
                  <label>
                    {' '}
                    Email Address<span className="req">*</span>{' '}
                  </label>
                  <input type="email" required />{' '}
                </div>
                <div className="field-wrap">
                  <label>
                    {' '}
                    Password<span className="req">*</span>{' '}
                  </label>
                  <input type="password" required />{' '}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;
