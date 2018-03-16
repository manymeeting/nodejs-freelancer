import React, { Component } from 'react';
import ClientAuthService from './ClientAuthService';
import {withRouter} from 'react-router';
import { connect } from 'react-redux';
// redux-actions
import { fetchUserInfo } from "../actions/UserInfoActions";

export default function withAuth(AuthComponent) {
    const Auth = new ClientAuthService();

    var AuthWrapped = class AuthWrapped extends Component {
        constructor(props) {
		    super(props);   
		}

		componentWillMount() {
		    if (!Auth.isLoggedIn()) {
		        this.props.history.replace('/login')
		    }
		    else {
		        try {
		            const profile = Auth.getProfile()
		            // check if user info disappeared (in case of forced page refresh)
		            if(!this.props.userInfo.user_id)
		            {
		            	this.props.fetchUserInfo(profile.user.user_id);
		            }
		        }
		        catch(err){
		            Auth.logout()
		            this.props.history.replace('/login')
		        }
		    }
		}

		render() {
		    if (this.props.userInfo.user_id) {
		        return (
		            <AuthComponent />
		        );
		    }
		    else {
		        return null;
		    }
		}
    }


	const mapDispatchToProps = (dispatch) => {
	  return {
	    fetchUserInfo: (id) => dispatch(fetchUserInfo(id))
	  };
	}

	const mapStateToProps = state => ({
		userInfo: state.userInfo
	});

	AuthWrapped = connect(mapStateToProps, mapDispatchToProps)(AuthWrapped)

    return withRouter(AuthWrapped);
};
