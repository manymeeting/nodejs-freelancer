import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import withAuth from '../utils/withAuth';
import {withRouter} from 'react-router';

// views

class Dashboard extends React.Component {
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return(
			<div>
			    <h1>Dashboard</h1>
			    <Route path={`${this.props.match.path}/published`} component={ProjBasicInfoContainer} />
			    <Route path={`${this.props.match.path}/bidded`} component={ProjBidListContainer} />
			</div>
		) 
	}
}

// project details page is open to registered users only
export default withAuth(withRouter(Dashboard));