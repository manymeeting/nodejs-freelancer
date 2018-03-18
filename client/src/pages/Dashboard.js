import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import withAuth from '../utils/withAuth';
import {withRouter} from 'react-router';

// views
import AllPublishedProjListContainer from "../components/AllPublishedProjListContainer";
import AllBiddedProjListContainer from "../components/AllBiddedProjListContainer";

class Dashboard extends React.Component {
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return(
			<div className="fl-main-container">
			    <h1 className="fl-main-header">Dashboard</h1>
			    <div>
			    	<ul className="fl-nopadding-ul">
			            <li className="fl-nav-item"><Link to={`${this.props.match.path}/published`}>Published</Link></li>
			            <li className="fl-nav-item"><Link to={`${this.props.match.path}/bidded`}>Bidded</Link></li>
			        </ul>
			    </div>
			    <Route path={`${this.props.match.path}/published`} component={AllPublishedProjListContainer} />
			    <Route path={`${this.props.match.path}/bidded`} component={AllBiddedProjListContainer} />
			</div>
		) 
	}
}

// project details page is open to registered users only
export default withAuth(withRouter(Dashboard));