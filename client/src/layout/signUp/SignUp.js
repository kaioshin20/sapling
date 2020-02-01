import React, { Component } from 'react'
import axios from 'axios'

import CSS from './SignUp.module.css'
import SignUpIN from '../common/SignUpIn/SignUpIn'
import UserContext from '../../contextStore/usercontext'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      name: '',
      location: '',
      contact: ''
    }
  }

  static contextType = UserContext

  onClickHandler(e) {
    e.preventDefault()
    // do fetch command here to backend
    axios
      .post(`http://localhost:5000/register`, {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        location: this.state.location,
        contact: this.state.contact
      })
      .then(res => {
        const person = res.data
        this.context.valueChanger({
          user: person
        })
        this.props.history.push('/dashboard')
      })
      .catch(err => {
        console.log(err)
      })
  }

  onChangeHandle(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <SignUpIN useAs="signup">
        <h2 style={{ textAlign: 'center' }}>Sign Up !</h2>
        <form>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={this.onChangeHandle.bind(this)}
            value={this.state.name}
          ></input>
          <input
            type="email"
            name="email"
            placeholder="Your Email Id"
            onChange={this.onChangeHandle.bind(this)}
            value={this.state.email}
          ></input>
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            onChange={this.onChangeHandle.bind(this)}
            value={this.state.password}
          ></input>
          <input
            type="text"
            name="location"
            placeholder="Your Location"
            onChange={this.onChangeHandle.bind(this)}
            value={this.state.location}
          ></input>
          <input
            type="tel"
            name="contact"
            placeholder="contact no."
            onChange={this.onChangeHandle.bind(this)}
            value={this.state.contact}
          ></input>
          <button onClick={this.onClickHandler.bind(this)}>Submit</button>
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
