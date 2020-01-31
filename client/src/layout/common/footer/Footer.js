import React, { Component } from 'react'

import CSS from './Footer.module.css'

class Footer extends Component {
  render() {
    return (
      <footer className={CSS.cover}>
        <div>main footer</div>
        <div>
          <p>C Sapling</p>
        </div>
      </footer>
    )
  }
}

export default Footer
