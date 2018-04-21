import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import {withRouter} from 'react-router';

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
				<p className="fl-sub-header">Bids On This Project</p>
				<ProjectBidList />		
			</div>
		);
	}
}

ProjBidListContainer = withRouter(ProjBidListContainer);

export default ProjBidListContainer;
