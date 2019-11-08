import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"
import './Navbar.css'

class NavBar extends Component {

  isAuthenticated = () => sessionStorage.getItem("activeUser") !== null

  handleLogout = () => {
    this.props.clearUser();
    this.props.history.push('/');
    this.props.history.push("/login")
  }

  render() {

    return (
      <header>
        <nav role="navigation">
          <div id="menuToggle">
            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
            <ul id="menu">
              <li><Link className="nav-link" to="/">Home</Link></li>
              {/* {(this.props.user) ? */}
              <li><Link className="nav-link" to="/allProducts">All Products</Link></li>
              {/* : null } */}
              {/* {(this.props.user) ? */}
              <>
                <li><Link className="nav-link" to="/soldItems">Sold Products</Link></li>
                <li><Link className="nav-link" to="/MySoldItems">My Sold Products</Link></li>
                <li><Link className="nav-link" onClick={this.handleLogout}>Logout</Link></li>
              </>
            </ul>
          </div>
        </nav>
        <h1 className="text">Ford Gittings and Kane Jewelers Inventory<br />        </h1>
      </header>
    )
  }
}
export default withRouter(NavBar);