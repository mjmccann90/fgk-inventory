import React, { Component } from 'react';
import { Route, withRouter, Redirect } from "react-router-dom"
import Login from "./auth/Login"
import Home from './home/Home'


class ApplicationViews extends Component {


    render() {

        return (
            <React.Fragment>
                <Route path="/login" render={props => {
                    return <Login setUser={this.props.setUser} {...props} />
                }} />
                <Route exact path="/" render={(props) => {
                    return <Home />
                }} />

            </React.Fragment>
        )
    }
}
export default ApplicationViews