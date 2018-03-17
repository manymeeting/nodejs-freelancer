import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';

// redux-actions
import { fetchProjBasicInfo } from "../actions/ProjectBasicInfoActions";

// views
import ProjectBasicInfo from "./ProjectBasicInfo";

class ProjBasicInfoContainer extends React.Component {
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

		return (
			<div>
				<p>Here is ProjBasicInfoContainer</p>
				<ProjectBasicInfo />		
			</div>
		);
	}
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchProjBasicInfo: (id) => dispatch(fetchProjBasicInfo(id))
  };
}

const mapStateToProps = state => ({
  projectBasic: state.projectDetails.basic
});


ProjBasicInfoContainer = withRouter(ProjBasicInfoContainer);

export default connect(mapStateToProps, mapDispatchToProps)(ProjBasicInfoContainer);
