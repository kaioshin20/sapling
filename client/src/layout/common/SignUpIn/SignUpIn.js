import React, { Component } from 'react'

import CSS from './SignUpIn.module.css'
import '../../../assets/signIn.jpg'
import '../../../assets/signUp.jpg'

class SignUpIn extends Component {
  render() {
    return (
      <div className={CSS.cover}>
        <div className={CSS.form}>{this.props.children}</div>
        <div
          className={`${CSS.photo} ${
            this.props.useAs === 'signin' ? CSS.signin : CSS.signup
          }`}
        ></div>
      </div>
    )
  }
}

export default SignUpIn
