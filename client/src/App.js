import React, { Component } from 'react'
import './App.css'
import { Route } from 'react-router-dom'

import LandingPage from './layout/landingPage/LandingPage'
import SignIn from './layout/signIn/SignIn'
import SignUp from './layout/signUp/SignUp'
import Dashboard from './layout/dashboard/DashBoard'
import UserContext from './contextStore/usercontext'
import Events from './layout/Events/Events'

class App extends Component {
  constructor(props) {
    super(props)

    this.valueChanger = userState => {
      this.setState(userState)
    }

    this.state = {
      user: {
        name: '',
        email: '',
        location: '',
        contactNo: ''
      },
      valueChanger: this.valueChanger
    }
  }

  render() {
    return (
      <div>
        <UserContext.Provider value={this.state}>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/events" exact component={Events} />
        </UserContext.Provider>
      </div>
    )
  }
}

export default App
