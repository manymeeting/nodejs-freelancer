import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import withAuth from '../utils/withAuth';
import {withRouter} from 'react-router';
import { connect } from 'react-redux';
// redux-actions
import { fetchProjBasicInfo } from "../actions/ProjectBasicInfoActions"
// views
import ProjBasicInfoContainer from "../components/ProjBasicInfoContainer";
import ProjBidListContainer from "../components/ProjBidListContainer";
import ProjSubmissionPanelContainer from "../components/ProjSubmissionPanelContainer";

class ProjectDetails extends React.Component {
	constructor(props)
	{
		super(props);
	}

	componentDidMount()
	{
		this.props.fetchProjBasicInfo(this.props.match.params.id);
	}

	render()
	{
		return(
			<div className="fl-main-container">
			    <h1 className="fl-main-header">Project Details</h1>
			    <ProjBasicInfoContainer />
			    <ProjSubmissionPanelContainer />
			    <ProjBidListContainer />
			</div>
		) 
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProjBasicInfo: (id) => dispatch(fetchProjBasicInfo(id)) 
  };
}
const mapStateToProps = state => ({
	projectBasic: state.projectDetails.basic,
	userInfo: state.userInfo
});

ProjectDetails = connect(mapStateToProps, mapDispatchToProps)(ProjectDetails)

// project details page is open to registered users only
export default withAuth(withRouter(ProjectDetails));