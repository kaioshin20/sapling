import React, { Component } from 'react'

import UserContext from '../../contextStore/usercontext'
import css from './DashBoard.module.css'

class Dashboard extends Component {
  static contextType = UserContext

  render() {
    let value = this.context
    return (
      <div>
        <header>
          <span>
            Sapling<span className={css.subscript}> | Aayush</span>
            <a href="#" className={css.logout}>
              Logout
            </a>
          </span>
        </header>
        <br></br>
        <h1>Previous Events:</h1>
        <br></br>
        <div className={css.content}>
          <div className={css.previous}>
            <div className={css.card}>
              Location: Rajouri Garden <br></br>
              Organiser: Rajat <br></br>
              <button>Inserested</button>
            </div>
            <div className={css.card}>
              Location: Vikas Puri <br></br>
              Organiser: Aayush <br></br>
              <button>Inserested</button>
            </div>
            <div className={css.card}>
              Location: Kirti Nagar <br></br>
              Organiser: Yash <br></br>
              <button>Inserested</button>
            </div>
          </div>
          <br></br>
          <h1>Upcomming Events:</h1>
          <br></br>
          <div className={css.upcomming}>
            <div className={css.card}>
              Location: Lakshmi Nagar <br></br>
              Organiser: Rajat <br></br>
              <button>Inserested</button>
            </div>
            <div className={css.card}>
              Location: Navada <br></br>
              Organiser: Aayush <br></br>
              <button>Inserested</button>
            </div>
            <div className={css.card}>
              Location: Hauz Khas <br></br>
              Organiser: Yash <br></br>
              <button>Inserested</button>
            </div>
          </div>
          <br></br>
          <h1>Active members in locality:</h1>
          <br></br>
          <div className={css.people}>
            <div className={css.left}>
              <ul>
                <li>Aayush Agarwal</li>
                <li>Yash Handa</li>
                <li>Rajat Cambo</li>
              </ul>
            </div>
            <div className={css.right}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTzg9xqIlTy6s_zu3VEKKm1VgLECZSupxp8ttiiCxeb1qhIbP8R"></img>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
