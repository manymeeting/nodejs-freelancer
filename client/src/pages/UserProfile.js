import React from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import withAuth from '../utils/withAuth';
import update from 'react-addons-update';
// redux-actions
import { fetchUserProfile } from "../actions/UserProfileActions";
// views
import UserProfileForm from '../components/UserProfileForm';

class UserProfile extends React.Component {
	constructor(props)
	{
		super(props);

	}

	render()
	{
		return (
			<Route path={`${this.props.match.path}/:id`} component={UserProfileForm} />
		)
		
	}
}


UserProfile = withAuth(withRouter(UserProfile));
export default UserProfile;
