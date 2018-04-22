import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// views
import BidInputForm from './BidInputForm'
import clientConfig from '../config/clientConfig'
import { projectDataUtils } from "../utils/clientDataUtils";

class ProjectBasicInfo extends React.Component {
	constructor(props)
	{
		super(props);
	}
	render()
	{
		var isBidded = projectDataUtils.findBidOnUser(this.props.projectBasic,this.props.userInfo._id);
		var projectSkills = this.props.projectBasic.project_skills ? this.props.projectBasic.project_skills : [];
		// initialize employer with empty object to avoid undefined.key err on the initial state 
		var employer = this.props.projectBasic.employer ? this.props.projectBasic.employer : {};
		return(
			<div>
				{ this.props.projectBasic.employer_id !== this.props.userInfo._id && !isBidded &&
					<BidInputForm />
				}
				
				<p className="fl-sub-header">Project Basic Info</p>
				<div className="fl-details-row">
					<span className="fl-details-label">Project Name: </span>
					<span>{this.props.projectBasic.project_name}</span>
				</div>
				<div className="fl-details-row">
					<span className="fl-details-label">Project Status: </span>
					<span>{this.props.projectBasic.project_status}</span>
				</div>
				<div className="fl-details-row">
					<span className="fl-details-label">Description: </span>
					<span>{this.props.projectBasic.project_description}</span>
				</div>
				<div className="fl-details-row">
					<span className="fl-details-label">Budget Range: </span>
					<span>{this.props.projectBasic.project_budget_range}</span>
				</div>
				<div className="fl-details-row">
					<span className="fl-details-label">Skills: </span>
					{
						projectSkills.map((skill) => {
							return(
								<span key={skill}> { skill + " " } </span>
							)
						})
					}
					
				</div>
				<div className="fl-details-row">
					<span className="fl-details-label">Published Date: </span>
					<span>{this.props.projectBasic.project_published_date}</span>
				</div>
				<div className="fl-details-row">
					<span className="fl-details-label">Employer: </span>
					<span><Link to={"/user_profile/" + employer._id} >{employer.user_name}</Link></span>
				</div>
				{this.props.projectBasic.project_files &&
					<div className="fl-details-row">
						<span className="fl-details-label">Instrunction Files: </span>
						<span><a target="_blank" href={clientConfig.servers.fileDownload + this.props.projectBasic.project_files} >Download</a></span>
					</div>
				}
			</div>
		)
	}
}

const mapStateToProps = state => ({
  projectBasic: state.projectDetails.basic,
  userInfo: state.userInfo
});

export default connect(mapStateToProps)(ProjectBasicInfo);
