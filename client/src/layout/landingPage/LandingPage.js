import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import Footer from '../common/footer/Footer'
import CSS from './LandingPage.module.css'
import '../../assets/forest.jpg'
import '../../assets/plants.jpg'

class LandingPage extends Component {
  render() {
    return (
      <div className={CSS.parentGrid}>
        <div className={CSS.hero}>
          <div>
            <h1 className={CSS.heading}>Saplings</h1>
            <p className={CSS.subHeading}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            </p>
          </div>
          <div></div>
        </div>
        <section className={CSS.user}>
          <div className={CSS.sign}>
            <div className={CSS.motoCover}>
              <p className={CSS.moto}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore <br />
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore <br />
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore
              </p>
              <div>
                <Link to="/signup" className={`${CSS.signUp} ${CSS.button}`}>
                  Sign UP
                </Link>
                <Link to="/login" className={`${CSS.button} ${CSS.logIn}`}>
                  Log IN
                </Link>
              </div>
            </div>
            <div>
              <div className={CSS.fancyCover}></div>
              <div className={CSS.fancyPhoto}></div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default LandingPage
