// Purpose of the File: to hold functionality for sessionStorage for login, renders the <Navbar> and <ApplicationViews.js>
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ApplicationViews from './components/ApplicationViews'
import Navbar from './components/nav/Navbar'
class App extends Component {
  //On startup, there is no user (user: false)
  state = {
    user: sessionStorage.getItem("userId") !== null
  }

  // Check if userId are in session storage
  //returns true/false
  isAuthenticated = () => sessionStorage.getItem("userId") !== null

  setUser = (authObj) => {
    sessionStorage.setItem(
      "userId",
      JSON.stringify(authObj)
    )
  }
  triggerRender = () => {
    this.setState({
      user: this.isAuthenticated()
    });
  }

  clearUser = () => {
    sessionStorage.clear();

    this.setState({
      user: this.isAuthenticated()
  });
  }

  render() {
    return (
      <React.Fragment>
        <Navbar clearUser={this.clearUser}/>
        <ApplicationViews user={this.state.user}
          setUser={this.setUser}
          triggerRender={this.triggerRender} {...this.props}/>
          {/* <Login setUser={this.props.setUser} {...props} /> */}

      </React.Fragment>
    )
  }
}


export default App;
