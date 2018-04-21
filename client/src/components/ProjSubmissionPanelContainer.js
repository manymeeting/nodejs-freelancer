import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
// views
import ProjSubmissionPanel from "./ProjSubmissionPanel";
// utils
import { projectDataUtils } from "../utils/clientDataUtils";

class projSubmissionPanelContainer extends React.Component {
	constructor(props)
	{
		super(props);
	}

	render()
	{
		var projectSubmission = this.props.projectBasic.project_submission; 
		var hiredBid = projectDataUtils.getHiredBid(this.props.projectBasic);

		var isHiredBidder = hiredBid && (hiredBid.bidder_id === this.props.userInfo._id);
		var isEmployer = this.props.projectBasic.employer_id === this.props.userInfo._id;

		return (
			<div>
				{ (isHiredBidder || isEmployer) &&
					<ProjSubmissionPanel />		
				}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	userInfo: state.userInfo,
	projectBasic: state.projectDetails.basic
});


export default connect(mapStateToProps)(projSubmissionPanelContainer);
