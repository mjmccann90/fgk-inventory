import React, { Component } from 'react';
import { Link, withRouter} from "react-router-dom"
import './Navbar.css'

class NavBar extends Component {

  isAuthenticated = () => sessionStorage.getItem("activeUser") !== null

  handleLogout = () => {
    this.props.clearUser();
    this.props.history.push('/');
    this.props.history.push("/login")
}

  render(){

    return (
      <header>
        <h1  className="text">Ford Gittings and Kane Jewelers Inventory<br />
          <small>Maybe some quote</small>
        </h1>
        <nav>
          <ul className="container">
            <li><Link className="nav-link" to="/">Home</Link></li>
            {/* {(this.props.user) ? */}
                <li><Link className="nav-link" to="/allProducts">All Products</Link></li>
            {/* : null } */}
            {/* {(this.props.user) ? */}
                <>
                <li><Link className="nav-link" to="/soldItems">Sold Products</Link></li>
                <li><Link className="nav-link" to="/MySoldItems">My Sold Products</Link></li>
                <li><span className="nav-link" onClick={this.handleLogout}>Logout</span></li>
                </>
          </ul>
        </nav>
      </header>
    )
  }
}
export default withRouter (NavBar);