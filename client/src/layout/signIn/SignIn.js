import React, { Component } from 'react'
import axios from 'axios'

import CSS from './SignIn.module.css'
import SignUpIN from '../common/SignUpIn/SignUpIn'
import UserContext from '../../contextStore/usercontext'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  static contextType = UserContext

  onClickHandler(e) {
    e.preventDefault()
    console.log(this.state);
    // do fetch command here to backend
    axios
      .post(`http://localhost:5000/login`, {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        const person = res.data
        console.log(person)
        this.context.valueChanger({
          user: person
        })
        this.props.history.push('/dashboard')
      })
      .catch(err=>{
        console.log(err);
      })
  }

  onChangeHandle(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return (
      <SignUpIN useAs="signin">
        <form>
          <h2 style={{ textAlign: 'center', marginTop: '40px' }}>Sign In !</h2>
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
