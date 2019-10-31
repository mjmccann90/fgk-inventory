import React, { Component } from 'react';
import { Route, withRouter, Redirect } from "react-router-dom"
import Login from "./auth/Login"
import Home from './home/Home'
import Footer from './footer/Footer'
import ProductList from './product/ProductList'
import SoldProductList from './soldProduct/SoldProductList'



class ApplicationViews extends Component {


    render() {

        return (
            <React.Fragment>
                <Route path="/login" render={props => {
                    return <Login setUser={this.props.setUser} {...props} />
                }} />
                <Route exact path="/" render={(props) => {
                    return <Home triggerRender={this.props.triggerRender} {...props} />
                }} />
                {this.props.user ?
                    <Footer {...this.props} />
                    : null
                }
                <Route path="/allProducts" render={(props) => {
                    return <ProductList  />
                }} />
                <Route path="/soldItems" render={(props) => {
                    return <SoldProductList  />
                }} />
            </React.Fragment>
        )
    }
}
// locationId={parseInt(props.match.params.locationId)} {...props}
export default ApplicationViews