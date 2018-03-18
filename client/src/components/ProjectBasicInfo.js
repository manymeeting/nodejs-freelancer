import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// views
import BidInputForm from './BidInputForm'

class ProjectBasicInfo extends React.Component {
	constructor(props)
	{
		super(props);
	}
	render()
	{
		return(
			<div>
				<BidInputForm />
				<p className="fl-sub-header">Project Basic Info</p>
				<div className="fl-details-row">
					<span className="fl-details-label">Project Name: </span>
					<span>{this.props.projectBasic.project_name}</span>
				</div>
				<div className="fl-details-row">
					<span className="fl-details-label">Description: </span>
					<span>{this.props.projectBasic.project_description}</span>
				</div>
				<div className="fl-details-row">
					<span className="fl-details-label">Budget Range: </span>
					<span>{this.props.projectBasic.budget_range}</span>
				</div>
				<div className="fl-details-row">
					<span className="fl-details-label">Skills: </span>
					<span>{this.props.projectBasic.project_skills}</span>
				</div>
				<div className="fl-details-row">
					<span className="fl-details-label">Employer: </span>
					<span><Link to={"/user_profile/" + this.props.projectBasic.employer_id} >{this.props.projectBasic.user_name}</Link></span>
				</div>

				<p className="fl-sub-header">Bids On This Project</p>

				<p>PJ Details: {JSON.stringify(this.props.projectBasic, null, 2)}</p>
			</div>
		)
	}
}

const mapStateToProps = state => ({
  projectBasic: state.projectDetails.basic
});

export default connect(mapStateToProps)(ProjectBasicInfo);
