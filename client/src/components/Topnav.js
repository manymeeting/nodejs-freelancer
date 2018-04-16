import React from 'react'
import {
  Link
} from 'react-router-dom';
import withAuth from '../utils/withAuth';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// resources
import '../css/nav.css';
import logo from '../images/logo.png';
import defaultAvatar from '../images/avatar-default.png';

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
      <nav className="fl-top-nav navbar navbar-expand-lg navbar-light">
        <div className="navbar-brand"><img alt="logo" className="fl-top-nav-logo" src={logo} /></div>

        <div className="fl-top-nav-links collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item fl-top-nav-item"><Link to='/home'>Home</Link></li>
            <li className="nav-item fl-top-nav-item"><Link to='/dashboard/published'>Dashboard</Link></li>
            <li className="nav-item fl-top-nav-item"><Link to='/post_project'>Post Project</Link></li>
            <li className="nav-item fl-top-nav-item"><Link to='/signup'>New Account</Link></li>
            <li className="nav-item fl-top-nav-item"><Link to='/transactions/income'>Transactions</Link></li>
          </ul>
        </div>

        <div className="fl-top-user-info">
          <span className="fl-top-user-avatar"><img alt="avatar" src={this.props.userInfo.user_avatarurl ? this.props.userInfo.user_avatarurl : defaultAvatar} /></span>
          <span className="fl-top-user-name"><Link to={`/user_profile/${this.props.userInfo._id}`}>{this.props.userInfo.user_name}</Link></span>
          <button className="btn btn-danger" id="signOutBtn" onClick={this.onSignOut}>Log out</button>
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