import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import withAuth from '../utils/withAuth';
import update from 'react-addons-update';
// redux-actions
import { fetchUserProfile, updateUserProfile } from "../actions/UserProfileActions";
import { fetchUserInfo } from "../actions/UserInfoActions";

class UserProfileForm extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = {
		      input: {
		        userName: "",
		       	userEmail: "",
		       	userPhone: "",
		       	userAbout: "",
		       	userSkills: ""
		      }
		    };
		this.handleInputChange = this.handleInputChange.bind(this);
    	this.onSumbit = this.onSumbit.bind(this);

	}

	componentDidMount()
	{
		this.props.fetchUserProfile(this.props.match.params.id)
			.then(() => {
				this.setState({
					input: {
						userName: this.props.userProfile.user_name ? this.props.userProfile.user_name : "",
				       	userEmail: this.props.userProfile.user_email ? this.props.userProfile.user_email : "",
				       	userPhone: this.props.userProfile.user_phone ? this.props.userProfile.user_phone : "",
				       	userAbout: this.props.userProfile.user_about ? this.props.userProfile.user_about : "",
				       	userSkills: this.props.userProfile.user_skills ? this.props.userProfile.user_skills : ""
					}
				})
			});
	}

	handleInputChange(event)
	{
		var newState = {input:{}};
		newState.input[event.target.name] = {$set: event.target.value};

		this.setState(update(this.state, newState));
	}

	onSumbit(e)
	{
		e.preventDefault();
		
		// fill all hidden values
		var newProfile = {
			userName: this.state.input.userName,
			userEmail: this.state.input.userEmail,
			userPhone: this.state.input.userPhone,
			userAbout: this.state.input.userAbout,
			userSkills: this.state.input.userSkills
		};
		
		this.props.updateUserProfile(this.props.userInfo.user_id, newProfile)
			.then(() => {
				// update user info
				this.props.fetchUserInfo(this.props.userInfo.user_id);
			});
	}


	render()
	{
		if(this.props.match.params.id == this.props.userInfo.user_id)
		{
			// editable profile
			return(
				<div>
					<form id="UserProfileForm">
						<span>Name</span><input type="text" name="userName" value={this.state.input.userName} onChange={this.handleInputChange} required="required"/><br/>
						<span>Email</span><input type="email" name="userEmail" value={this.state.input.userEmail} onChange={this.handleInputChange} required="required"/><br/>
						<span>Phone</span><input type="text" name="userPhone" value={this.state.input.userPhone} onChange={this.handleInputChange} /><br/>
						<span>About</span><input type="text" name="userAbout" value={this.state.input.userAbout} onChange={this.handleInputChange} /><br/>
						<span>Skills</span><input type="text" name="userSkills" value={this.state.input.userSkills} onChange={this.handleInputChange} /><br/>
						
				        <button onClick={this.onSumbit}>Update Profile</button>
					</form>
				</div>
				
			)
		}
		else
		{
			// read only profile
			return(
				<div>
					<span>Name</span><span>{this.props.userProfile.user_name}</span><br/>
					<span>Email</span><span>{this.props.userProfile.user_email}</span><br/>
					<span>Phone</span><span>{this.props.userProfile.user_phone}</span><br/>
					<span>About</span><span>{this.props.userProfile.user_about}</span><br/>
					<span>Skills</span><span>{this.props.userProfile.user_skills}</span><br/>
					
				</div>
			)
		}
	
	}
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserProfile: (id) => dispatch(fetchUserProfile(id)),
    fetchUserInfo: (id) => dispatch(fetchUserInfo(id)),
    updateUserProfile: (id, params) => dispatch(updateUserProfile(id, params))
  };
}

const mapStateToProps = state => ({
	userInfo: state.userInfo,
	userProfile: state.userProfile
});

UserProfileForm = connect(mapStateToProps, mapDispatchToProps)(UserProfileForm);
UserProfileForm = withRouter(UserProfileForm);
export default UserProfileForm;
