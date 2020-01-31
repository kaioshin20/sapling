import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'

import LandingPage from './layout/landingPage/LandingPage'

function App() {
  return (
    <div>
      <Route path="/" exact component={LandingPage} />
      <Route path="/login" exact component={LandingPage} />
      <Route path="/signup" exact component={LandingPage} />
    </div>
  )
}

export default App
