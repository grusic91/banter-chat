import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => (
  <div className="home-hero">
    <h1>What's going on?</h1>
    <h4>New to Banter?</h4>
    <Link to="/register" className="btn btn-primary">
      Sign up here
    </Link>
  </div>
);

export default Homepage;
