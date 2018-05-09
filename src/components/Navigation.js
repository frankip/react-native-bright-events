import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {
  render() {
    return (
      <div>
        <nav className="nav">
          <a className="toggle-nav" href="#">&#9776;</a>
          <div className="nav-mobile">
            <ul className="left">
              <li>
                <Link to="/" className="fa fa-home">Home</Link>
                {/* <a href="index.html"><i className="fa fa-home"></i> Home</a> */}
              </li>
              <li>
                <Link to="/" className="fa fa-book">Categories</Link>
                {/* <a href="#"><i className="fa fa-book"></i> Categories</a> */}
              </li>
              <li>
                <Link to="/" className="fa fa-fire" >Most Popular</Link>
                {/* <a href="#"><i className="fa fa-fire"></i> Most Popular</a> */}
              </li>
            </ul>
            <ul className="right">
              <li>
                <Link to="/login" className="fa fa-user"> logout</Link>
                {/* <a href="sign-in.html"><i className="fa fa-user"></i> Logout</a> */}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigation;
