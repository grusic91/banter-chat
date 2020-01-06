// landing page
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageTimeline } from './MessageTimeline';

const Homepage = ({ currentUser }) => {
  if(!currentUser.isAuthenticated) {
    return(
      <div className="home-hero">
        <h1>What's going on?</h1>
        <h4>New to Banter?</h4>
        <Link to="/register" className="btn btn-primary">
          Sign up here
        </Link>
      </div>
    )
  }
  return (
    <div>
      <MessageTimeline
        profileImageUrl={currentUser.user.profileImageUrl}
        username={currentUser.user.username}/>
    </div>
  )
}

export default Homepage;
