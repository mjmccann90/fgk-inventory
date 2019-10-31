import React, { Component,useState } from 'react'
import Footer from '../footer/Footer'
import { Jumbotron, Container} from 'reactstrap';
import "../auth/Auth.css";




class Home extends Component {


//Carousel,
//CarouselItem,
//CarouselControl,
//CarouselIndicators,
//CarouselCaption 

  
  render() {
    
    return (
      <>
      <div>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Fluid jumbotron</h1>
          <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
        </Container>
      </Jumbotron>
    </div>
    <div>put example compononet here</div>
      <div><Footer triggerRender={this.props.triggerRender} {...this.props}/></div>
      </>
    )
  }
}

export default Home
