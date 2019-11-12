import React, { Component,useState } from 'react'
import Footer from '../footer/Footer'
import { Jumbotron, Container} from 'reactstrap';
import "../auth/Auth.css";
// import Carousel from './Carousel'




class Home extends Component {
  render() {
    return (
      <>
      <div>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Welcome to FGK Inventory,Mark</h1>
        </Container>
      </Jumbotron>
    </div>
    {/* <div className="carousel"><Carousel/></div> */}
      <div><Footer triggerRender={this.props.triggerRender} {...this.props}/></div>
      </>
    )
  }
}

export default Home
