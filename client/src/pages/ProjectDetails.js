import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import withAuth from '../utils/withAuth';
import {withRouter} from 'react-router';

// views
import ProjBasicInfoContainer from "../components/ProjBasicInfoContainer";
import ProjBidListContainer from "../components/ProjBidListContainer";

class ProjectDetails extends React.Component {
	constructor(props)
	{
		super(props);
	}

	render()
	{
		console.log(JSON.stringify(this.props.match, null, 2));
		return(
			<div>
			    <h1>Project Details</h1>
			    <Route path={`${this.props.match.path}/:id`} component={ProjBasicInfoContainer} />
			    <Route path={`${this.props.match.path}/:id`} component={ProjBidListContainer} />
			</div>
		) 
	}
}

// project details page is open to registered users only
export default withAuth(withRouter(ProjectDetails));