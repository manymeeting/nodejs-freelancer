import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';

// redux-actions
import { fetchProjBidList } from "../actions/ProjectBidListActions";

// views
import ProjectBidList from "./ProjectBidList";

class ProjBidListContainer extends React.Component {
	constructor(props)
	{
		super(props);
	}

	componentDidMount()
	{
		this.props.fetchProjBidList(this.props.match.params.id);
	}

	render()
	{

		return (
			<div>
				<p>Here is ProjBidListContainer</p>
				<ProjectBidList />		
			</div>
		);
	}
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchProjBidList: (id) => dispatch(fetchProjBidList(id))
  };
}

const mapStateToProps = state => ({
  projectBidList: state.projectDetails.bids
});


ProjBidListContainer = withRouter(ProjBidListContainer);

export default connect(mapStateToProps, mapDispatchToProps)(ProjBidListContainer);
