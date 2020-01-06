import React from 'react'

import { Link } from 'react-router-dom';

import { useFormik } from "formik"

const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
          },
          onSubmit(values) {
            console.log(values)
          }
    })
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
                  <div id="login">
                    <h3>Welcome Back!</h3>
                    <form onSubmit={formik.handleSubmit}>
                      <div className="field-wrap">
                        <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        required 
                        onChange={formik.handleChange}
                        value={formik.values.name} />
                      </div>
                      <div className="field-wrap">
                      <input 
                        type="password" 
                        name="password" 
                        placeholder="password" 
                        required 
                        onChange={formik.handleChange}
                        value={formik.values.name} />
                      </div>
                      <p className="forgot">
                        <Link to="/signup">Forgot Password?</Link>
                      </p>
                      <button value="submit" className="button button-block">
                        Log In
                      </button>
                    </form>
                  </div>
                  <div>
                  </div>
                </div>
              </div>
            </div>
    )
}

export default Login
