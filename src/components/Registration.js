import React from "react"
import { Link } from 'react-router-dom';
import * as firebase from 'firebase/app';

import { useFormik } from "formik"

export default function ContactForm() {

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name:"",
            email: "",
            password: "",
            confirmPassword:""
          },
          onSubmit: (values, { setSubmitting }) => {
            console.log('---->',JSON.stringify(values, null, 2))
            setSubmitting(false);
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
          
          <form onSubmit={formik.handleSubmit}>
          <div className="top-row">
            <div className="field-wrap">
              <input 
                type="text" 
                name="first_name" 
                id="first_name" 
                placeholder="First Name" 
                required
                onChange={formik.handleChange}
                value={formik.values.name} />
            </div>
            <div className="field-wrap">
              <input 
                type="text" 
                name="last_name" 
                placeholder="Last Name" 
                required
                onChange={formik.handleChange}
                value={formik.values.name}/>
            </div>
          </div>
          <div className="field-wrap">
            <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                required
                onChange={formik.handleChange}
                value={formik.values.name}
                />
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
          <div className="field-wrap">
            <input 
                type="password" 
                name="confirmPassword" 
                placeholder="confirm password" 
                required
                onChange={formik.handleChange}
                value={formik.values.name} />
          </div>
          <button 
                type="submit" 
                value="submit" 
                className="button button-block">

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