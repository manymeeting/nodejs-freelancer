import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// views
import ProjectBidList from "./ProjectBidList";

class ProjBidListContainer extends React.Component {
	constructor(props)
	{
		super(props);
	}

	render()
	{

		return (
			<div>
				{ this.props.projectBasic.project_status === "OPEN" &&
					<ProjectBidList />	
				}	
			</div>
		);
	}
}

const mapStateToProps = state => ({
	projectBasic: state.projectDetails.basic
});


export default withRouter(connect(mapStateToProps)(ProjBidListContainer));;
