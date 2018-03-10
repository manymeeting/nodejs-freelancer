import React, { Component } from 'react';
import ClientAuthService from './ClientAuthService';
import {withRouter} from 'react-router';

export default function withAuth(AuthComponent) {
    const Auth = new AuthService();

    class AuthWrapped extends Component {
        constructor() {
		    super();
		    this.state = {
		        user: null
		    }
		}

		componentWillMount() {
		    if (!Auth.isLoggedIn()) {
		        this.props.history.replace('/login')
		    }
		    else {
		        try {
		            const profile = Auth.getProfile()
		            this.setState({
		                user: profile
		            })
		        }
		        catch(err){
		            Auth.logout()
		            this.props.history.replace('/login')
		        }
		    }
		}

		render() {
		    if (this.state.user) {
		        return (
		            <AuthComponent />
		        );
		    }
		    else {
		        return null;
		    }
		}
    }
    return withRouter(AuthWrapped);;
}