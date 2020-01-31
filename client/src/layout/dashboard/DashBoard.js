import React, { Component } from 'react'

import UserContext from '../../contextStore/usercontext'

class Dashboard extends Component {
  static contextType = UserContext

  render() {
    let value = this.context
    return
    ;<div>
      <header>
        <div className="row">
          <div className="col s4">Logo</div>
        </div>
      </header>
    </div>
  }
}

export default Dashboard
