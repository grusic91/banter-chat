import React, { Component } from "react";
import { connect } from "react-redux";

export default function withAuth(ComponentToBeRenderd) {
  class Authenticate extends Component {
    UNSAFE_componentWillMoutn() {
      if(!this.props.isAuthenticated === false) {
        this.props.history.push("/login"); //signin
      }
    }
    UNSAFE_componentWillUpdate(nextProps) {
      if(nextProps.isAuthenticated === false) {
        this.props.history.push("/login")
      }
    }

    render() {
      return <ComponentToBeRenderd {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { isAuthenticated: state.currentUser.isAuthenticated }
  }

  return connect(mapStateToProps)(Authenticate);
}
