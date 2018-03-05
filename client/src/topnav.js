import React from 'react'
import {
  Route,
  Link
} from 'react-router-dom';

import logo from './images/logo-565.png';
import avatar from './images/avatar-128.png';


class TopNav extends React.Component {

  render()
  {
    return (
      <nav className="fl-top-nav">
        <div className="logo"><img src={logo} /></div>

        <div className="fl-top-nav-links">
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/signup'>Sign Up</Link></li>
            <li><Link to='/dashboard'>Dashboard</Link></li>
          </ul>
        </div>

        <div className="fl-top-user-info">
          <span className="fl-top-user-avatar"><img src={avatar} /></span>
          <span className="fl-top-user-name"></span>
        </div>
      </nav>
    );
  }


}

export default TopNav