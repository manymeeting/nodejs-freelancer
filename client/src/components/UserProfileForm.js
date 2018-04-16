import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import withAuth from '../utils/withAuth';
import update from 'react-addons-update';
import { inputValidation } from '../utils/formUtils'
// redux-actions
import { fetchUserProfile, updateUserProfile, updateUserAvatar } from "../actions/UserProfileActions";
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
    	this.updateAvatar = this.updateAvatar.bind(this);

    	this.requiredInput = {
    		userName: "User Name",
    		userEmail: "Email"
    	};
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

	updateAvatar(e)
	{
		e.preventDefault();
		var formData = new FormData(e.target);
		formData.append('id', this.props.userInfo._id);
		
		this.props.updateUserAvatar(this.props.userInfo._id, formData)
			.then(() => {
				// update user info
				this.props.fetchUserInfo(this.props.userInfo._id);
			});

	}

	onSumbit(e)
	{
		e.preventDefault();
			
		if(!inputValidation(this.requiredInput, this))
		{
			console.log("Input Validation Failed")
			return;
		}
		// fill all hidden values
		var newProfile = {
			userName: this.state.input.userName,
			userEmail: this.state.input.userEmail,
			userPhone: this.state.input.userPhone,
			userAbout: this.state.input.userAbout,
			userSkills: this.state.input.userSkills.split(",")
		};


		this.props.updateUserProfile(this.props.userInfo._id, newProfile)
			.then(() => {
				// update user info
				this.props.fetchUserInfo(this.props.userInfo._id);
			});
	}


	render()
	{
		if(this.props.match.params.id == this.props.userInfo._id)
		{
			// editable profile
			return(
				<div className="fl-main-container">
					<h1 className="fl-main-header">User Profile</h1>
					<form id="userAvatarForm" encType="multipart/form-data" onSubmit={this.updateAvatar}>
						<div className="form-group">
				            <label>New Avatar:</label>
				            <input type="file" className="form-control" name="file" ref={(ref) => { this.newAvatar = ref; }}/>
				        </div>
						<input type="submit" className="btn btn-primary" value="Upload"/>
					</form>
					<form id="userProfileForm">
						<div className="form-group">
				            <label>User Name:</label>
				            <input type="text" className="form-control" name="userName" value={this.state.input.userName} onChange={this.handleInputChange} required/>
				        </div>
				        <div className="form-group">
				            <label>Email Address:</label>
				            <input type="text" className="form-control" name="userEmail" value={this.state.input.userEmail} onChange={this.handleInputChange} required/>
				        </div>
				        <div className="form-group">
				            <label>Phone:</label>
				            <input type="text" className="form-control" name="userPhone" value={this.state.input.userPhone} onChange={this.handleInputChange} />
				        </div>
				        <div className="form-group">
				            <label>About:</label>
				            <input type="text" className="form-control" name="userAbout" value={this.state.input.userAbout} onChange={this.handleInputChange} />
				        </div>
				        <div className="form-group">
				            <label>Skills:</label>
				            <input type="text" className="form-control" name="userSkills" value={this.state.input.userSkills} onChange={this.handleInputChange} />
				        </div>
						
				        <button className="btn btn-primary" onClick={this.onSumbit}>Update Profile</button>
					</form>

				</div>
				
			)
		}
		else
		{
			// read only profile
			return(
				<div className="fl-main-container">
					<h1 className="fl-main-header">User Profile</h1>
					<div className="fl-details-row">
						<span className="fl-details-label">User Name: </span>
						<span>{this.props.userProfile.user_name}</span>
					</div>
					<div className="fl-details-row">
						<span className="fl-details-label">User Email: </span>
						<span>{this.props.userProfile.user_email}</span>
					</div>
					<div className="fl-details-row">
						<span className="fl-details-label">Phone: </span>
						<span>{this.props.userProfile.user_phone}</span>
					</div>
					<div className="fl-details-row">
						<span className="fl-details-label">About: </span>
						<span>{this.props.userProfile.user_about}</span>
					</div>
					<div className="fl-details-row">
						<span className="fl-details-label">Skills: </span>
						<span>{this.props.userProfile.user_skills}</span>
					</div>
					
				</div>
			)
		}
	
	}
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserProfile: (id) => dispatch(fetchUserProfile(id)),
    fetchUserInfo: (id) => dispatch(fetchUserInfo(id)),
    updateUserProfile: (id, params) => dispatch(updateUserProfile(id, params)),
    updateUserAvatar: (id, formData) => dispatch(updateUserAvatar(id, formData))
  };
}

const mapStateToProps = state => ({
	userInfo: state.userInfo,
	userProfile: state.userProfile
});

UserProfileForm = connect(mapStateToProps, mapDispatchToProps)(UserProfileForm);
UserProfileForm = withRouter(UserProfileForm);
export default UserProfileForm;
