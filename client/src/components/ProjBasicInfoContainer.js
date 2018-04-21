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

	render()
	{

		return (
			<div>
				<ProjectBasicInfo />		
			</div>
		);
	}
}


ProjBasicInfoContainer = withRouter(ProjBasicInfoContainer);

export default ProjBasicInfoContainer;
