import React from 'react';
import Moment from 'react-moment'; // formate dates
import {Link} from 'react-router-dom';
import DefaultProfileImg from '../images/default-profile-image.png';

export const MessageItem = (
  { date, profileImageUrl, text, username, removeMessage, isCorrectUser }) => (
  <div>
    <li className="list-group-item">
      <img
        src={profileImageUrl || DefaultProfileImg}
        alt={username}
        height="100"
        width="100"
        className="timeline-image"
      />
      <div className="message-area">
        <Link to="/">@{username} &nbsp;</Link>
        <span className="text-muted">
          <Moment className="text-muted" format="Do MMM YYY">
            {date}
          </Moment>
        </span>
        <p>{text}</p>
        { isCorrectUser && (
          <Link to="/" className="btn btn-danger" onClick={removeMessage}>
            DELETE
          </Link>
        )}
      </div>
    </li>
  </div>
)
