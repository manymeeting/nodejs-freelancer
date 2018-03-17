import React from 'react'
import {
  Link
} from 'react-router-dom';
import withAuth from '../utils/withAuth';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// resources
import '../css/nav.css';
import logo from '../images/logo-565.png';
import avatar from '../images/avatar-128.png';

// utils
import ClientAuthService from '../utils/ClientAuthService';

class TopNav extends React.Component {

  constructor(props)
  {
    super(props);
    this.onSignOut = this.onSignOut.bind(this);
  }

  onSignOut()
  {
    var clientAuthService = new ClientAuthService();
    clientAuthService.logout();
    this.props.history.push("/login");
  }

  render()
  {
    return (
      <nav className="fl-top-nav navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-brand"><img alt="logo" className="fl-top-nav-logo" src={logo} /></div>

        <div className="fl-top-nav-links collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"><Link to='/home'>Home</Link></li>
            <li className="nav-item"><Link to='/signup'>Sign Up</Link></li>
            <li className="nav-item"><Link to='/dashboard/published'>Dashboard</Link></li>
            <li className="nav-item"><Link to='/post_project'>Post Project</Link></li>
          </ul>
        </div>

        <div className="fl-top-user-info">
          <span className="fl-top-user-avatar"><img  alt="avatar" src={avatar} /></span>
          <span className="fl-top-user-name"><Link to={`/user_profile/${this.props.userInfo.user_id}`}>{this.props.userInfo.user_name}</Link></span>
          <button id="signOutBtn" onClick={this.onSignOut}>Log out</button>
        </div>
      </nav>
    );
  }


}

const mapStateToProps = state => ({
  userInfo: state.userInfo
});
TopNav = connect(mapStateToProps)(TopNav);

export default withAuth(withRouter(TopNav));