import React, { Component } from "react";
import { connect } from "react-redux";

export default function withAuth(ComponentToBeRenderd) {
  class Authenticate extends Component {
    componentDidMount() {
      /**
        * when the component mounts we make sure if isAuthenticated is false
      **/
      if(this.props.isAuthenticated === false) {
        this.props.history.push("/signin"); //redirect signin
      }
    }
    shouldComponentUpdate(nextProps) {
      /* if component is changed check if user is still logged in
      otherwise redirect to signin page*/
      if(nextProps.isAuthenticated === false) {
        this.props.history.push("/signin")
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
