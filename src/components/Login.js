import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { useFormik } from "formik"


import * as ROUTES from '../constants/routes';
import Firebase, { withFirebase } from '../Firebase'

import { doSignInWithEmailAndPassword, FirebaseAppAuth } from "../Firebase/firebaseConfig";


const handleSubmit = (values, actions) => {
  const user = doSignInWithEmailAndPassword( values.email, values.password)
  .then (result => {
    console.log('logged in', result);

  }).catch (error => {
    console.log(error);
    alert(JSON.stringify(error, null, 2));
  });

  
  actions.resetForm();
  actions.setSubmitting(false);
  return user
};

const LoginForm = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
          },
          enableReinitialize: true,
          onSubmit: (values, actions) => {
            console.log(values)
            handleSubmit(values, actions)
          },
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
                    <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
                  </li>
                  <li className="tab active">
                    <Link to={ROUTES.SIGN_IN}>Sign In</Link>
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

const Login = withRouter(withFirebase(LoginForm));

export default Login
