import React from 'react'
import {
  Route,
  Link
} from 'react-router-dom';
import {Nav, NavItem} from 'react-bootstrap';

import './css/nav.css';

import logo from './images/logo-565.png';
import avatar from './images/avatar-128.png';


class TopNav extends React.Component {

  render()
  {
    return (
      <nav className="fl-top-nav navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-brand"><img className="fl-top-nav-logo" src={logo} /></div>

        <div className="fl-top-nav-links collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"><Link to='/'>Home</Link></li>
            <li className="nav-item"><Link to='/signup'>Sign Up</Link></li>
            <li className="nav-item"><Link to='/dashboard'>Dashboard</Link></li>
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