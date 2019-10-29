import React, { Component } from 'react'
import Registration from "../auth/Registration"
import './Footer.css'


class Footer extends Component {
  render() {
    return (
      <>
      <footer className="footer">
          <div className="container">
              <Registration triggerRender={this.props.triggerRender} {...this.props}/>
          </div>
      </footer>
      </>
    )
  }
}

export default Footer