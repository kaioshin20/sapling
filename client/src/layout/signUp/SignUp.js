import React, { Component } from 'react'

import CSS from './SignUp.module.css'
import SignUpIN from '../common/SignUpIn/SignUpIn'

class SignIn extends Component {
  render() {
    return (
      <SignUpIN useAs="signup">
        <h2 style={{ textAlign: 'center' }}>Sign Up !</h2>
        <form>
          <input type="text" name="name" placeholder="Your Name"></input>
          <input type="email" name="email" placeholder="Your Email Id"></input>
          <input
            type="password"
            name="password"
            placeholder="Your Password"
          ></input>
          <input
            type="text"
            name="location"
            placeholder="Your Location"
          ></input>
          <input type="tel" name="contact" placeholder="contact no."></input>
          <button>Submit</button>
          <button
            style={{
              display: 'inline',
              width: '30%',
              margin: '10px 5% 10px 15%'
            }}
          >
            Google
          </button>
          <button
            style={{
              display: 'inline',
              width: '30%',
              margin: '10px 10% 10px 5%'
            }}
          >
            FaceBook
          </button>
        </form>
      </SignUpIN>
    )
  }
}

export default SignIn
