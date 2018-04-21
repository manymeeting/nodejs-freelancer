import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import { inputValidation } from '../utils/formUtils'
// views
import clientConfig from '../config/clientConfig'
// redux-actions
import { postSubmission } from "../actions/PostSubmissionActions";

class ProjSubmissionPanel extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = {
		      input: {
		        submissionComment: ""
		      }
		    };

		this.handleInputChange = this.handleInputChange.bind(this);
		this.requiredInput = {
    		submissionComment: "Submission Input"
    	};
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
			
		if(!inputValidation(this.requiredInput, this))
		{
			console.log("Input Validation Failed")
			return;
		}

		var formData = new FormData(e.target);
		formData.append('submissionDate', Date());

		this.props.postSubmission(formData)
			.then(() => {
				// reload project details page
				this.props.history.push('/project_details/' + this.props.projectBasic._id);
			});
	}

	render()
	{
		var projectSubmission = this.props.projectBasic.project_submission;
		console.log(projectSubmission);
		if(this.props.projectBasic.employer_id == this.props.userInfo._id)
		{
			// project submission view for employer
			var submissionContainer = projectSubmission ? (
				<div>
					<div className="fl-details-row">
						<span className="fl-details-label">Submission Date: </span>
						<span>{projectSubmission.submission_date}</span>
					</div>
					<div className="fl-details-row">
						<span className="fl-details-label">Submission Comment: </span>
						<span>{projectSubmission.submission_comment}</span>
					</div>
					<div className="fl-details-row">
						<span className="fl-details-label">Submission Files: </span>
						<span><a target="_blank" href={clientConfig.servers.fileDownload + projectSubmission.submission_files} >Download</a></span>
					</div>
				</div>
				
			) : (
				<p>(no submisson yet)</p>
			);

			return(
				<div>
					<p className="fl-sub-header">Project Submission</p>
					{submissionContainer}

					<button>Make Payment</button>
				</div>
			)
			
		}
		else
		{
			// project submission form for bidder
			var submissionContainer = projectSubmission ? (
				<div>
					<p>(You have posted your submission)</p>
					<div className="fl-details-row">
						<span className="fl-details-label">Submission Date: </span>
						<span>{projectSubmission.submission_date}</span>
					</div>
					<div className="fl-details-row">
						<span className="fl-details-label">Submission Comment: </span>
						<span>{projectSubmission.submission_comment}</span>
					</div>
					<div className="fl-details-row">
						<span className="fl-details-label">Submission Files: </span>
						<span><a target="_blank" href={clientConfig.servers.fileDownload + projectSubmission.submission_files} >Download</a></span>
					</div>
				</div>
				
			) : (
				<form onSubmit={this.onSumbit}>
					<div className="form-group">
			            <label>Submission File:</label>
			            <input type="file" className="form-control" name="file"/>
			        </div>
			        <div className="form-group">
			            <label>Submission Comment:</label>
			            <input type="text" className="form-control" name="submissionComment" id="inputSubmissionComment" onChange={this.handleInputChange} />
			        </div>
			        <input type="submit" id="postSubmissionBtn" className="btn btn-primary" value="Post Submission"/>
				</form>
			);
			
			return(
				<div>
					<p className="fl-sub-header">Project Submission</p>
					{submissionContainer}
				</div>
				
			)
		}
	
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    postSubmission: (formData) => dispatch(postSubmission(formData)),
  };
}
const mapStateToProps = state => ({
  projectBasic: state.projectDetails.basic,
  userInfo: state.userInfo
});

export default connect(mapStateToProps)(ProjSubmissionPanel);
