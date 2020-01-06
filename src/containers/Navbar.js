import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {logout} from '../store/actions/auth';

class Navbar extends Component {

  logout = e => {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <nav className="nav navbar navbar-expand">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              <i className="fab fa-rocketchat fa-2x"></i>
              Banter-chat
            </Link>
          </div>
          { this.props.currentUser.isAuthenticated ? (
            <ul className="row nav-navbar-nav navbar-right">
              <li className="nav-item">
                <Link to={`/users/${this.props.currentUser.user.id}/messages/new`}>New Message</Link>
              </li>
              <li className="nav-item">
                <Link to="/" onClick={this.logout}>Log out</Link>
              </li>
            </ul>
          ) : (
            <ul className="nav navbar-nav navbar-right">
              <li className="nav-item">
                <Link to="/signup">Sign up</Link>
              </li>
              <li className="nav-item">
                <Link to="/signin">Log in</Link>
              </li>
            </ul>
          )
        }
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, {logout})(Navbar);
