import React, { Component } from 'react'
import Footer from '../footer/Footer'
import "../auth/Auth.css";




class Home extends Component {
  render() {
    return (
      <>
      <div><Footer triggerRender={this.props.triggerRender} {...this.props}/></div>
      </>
    )
  }
}

export default Home