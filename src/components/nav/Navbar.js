import React, { Component } from 'react';
import { Link, withRouter} from "react-router-dom"
import './Navbar.css'

class NavBar extends Component {

  handleLogout = () => {
    this.props.clearUser();
    this.props.history.push('/');
}

  render(){

    return (
      <header>
        <h1  className="text">Ford Gittings and Kane Inventory<br />
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
                <li><Link className="nav-link" to="/soldItems">Sold Items</Link></li>
                <li><span className="nav-link" onClick={this.handleLogout}>Logout</span></li>
                </>
            {/* } */}
          </ul>
        </nav>
      </header>
    )
  }
}
export default withRouter (NavBar);