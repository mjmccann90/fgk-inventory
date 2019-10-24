// Purpose of the File: to hold functionality for sessionStorage for login, renders the <Navbar> and <ApplicationViews.js>
import React, { Component } from 'react'
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
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <ApplicationViews user={this.state.user}
          setUser={this.setUser}
          triggerRender={this.triggerRender} />
      </React.Fragment>
    )
  }
}
        {/* <NavBar user={this.state.user} triggerRender={this.triggerRender} clearUser={this.clearUser} /> */}


export default App;
