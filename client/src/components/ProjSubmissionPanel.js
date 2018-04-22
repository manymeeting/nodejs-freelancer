import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import { inputValidation } from '../utils/formUtils';
import { withRouter } from 'react-router';
// views
import clientConfig from '../config/clientConfig'
// redux-actions
import { postSubmission } from "../actions/PostSubmissionActions";
import { makePayment } from "../actions/ProjectPaymentActions";
import { updateProjStatus } from "../actions/UpdateProjectActions";
import { fetchProjBasicInfo } from "../actions/ProjectBasicInfoActions";
// utils
import { projectDataUtils } from "../utils/clientDataUtils";

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
		this.makePayment = this.makePayment.bind(this);
		this.onSumbit = this.onSumbit.bind(this);
		this.requiredInput = {
    		submissionComment: "Submission Comment"
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

		this.props.postSubmission(this.props.projectBasic._id, formData)
			.then(() => {
				this.props.fetchProjBasicInfo(this.props.projectBasic._id); // refresh page content
			})
	}

	makePayment(e)
	{
		e.preventDefault();
		
		var hiredBid = projectDataUtils.getHiredBid(this.props.projectBasic);

		this.props.makePayment({
			transFrom: this.props.projectBasic.employer_id,
		    transTo: hiredBid.bidder_id,
		    transAmount: parseFloat(hiredBid.bid_price),
		    transForProject: this.props.projectBasic._id,
		    transDate: Date()
		})
		.then(() => {
			this.props.updateProjStatus(this.props.projectBasic._id, "FINISHED");
		})
		.then(() => {
			this.props.fetchProjBasicInfo(this.props.projectBasic._id); // refresh page content
		})
	}

	render()
	{
		var projectSubmission = this.props.projectBasic.project_submission;
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
					{
						this.props.projectBasic.project_status === "STARTED" && 
						<button onClick={this.makePayment}>Make Payment</button>	
					}
					
				</div>
				
			) : (
				<p>(no submissons yet)</p>
			);

			return(
				<div>
					<p className="fl-sub-header">Project Submission</p>
					{submissionContainer}
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
    postSubmission: (id, formData) => dispatch(postSubmission(id, formData)),
    makePayment: (params) => dispatch(makePayment(params)),
    updateProjStatus: (id, status) => dispatch(updateProjStatus(id, status)),
    fetchProjBasicInfo: (id) => dispatch(fetchProjBasicInfo(id))
  };
}
const mapStateToProps = state => ({
  projectBasic: state.projectDetails.basic,
  userInfo: state.userInfo
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjSubmissionPanel));
