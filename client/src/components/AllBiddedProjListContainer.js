import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';

// redux-actions
import { fetchAllBiddedProject } from "../actions/AllBiddedProjectActions";

// views
import AllBiddedProjList from "./AllBiddedProjList";

class AllBiddedProjListContainer extends React.Component {
	constructor(props)
	{
		super(props);
	}

	componentDidMount()
	{
		this.props.fetchAllBiddedProject(this.props.userInfo.user_id);
	}

	render()
	{
		return (
			<div>
				<p>All Published</p>
				<AllBiddedProjList />		
			</div>
		);
	}
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllBiddedProject: (id) => dispatch(fetchAllBiddedProject(id))
  };
}

const mapStateToProps = state => ({
	userInfo: state.userInfo,
	allBiddedProjects: state.allBiddedProjects.items,
	loading: state.allBiddedProjects.loading,
	error: state.allBiddedProjects.error
});


export default connect(mapStateToProps, mapDispatchToProps)(AllBiddedProjListContainer);
