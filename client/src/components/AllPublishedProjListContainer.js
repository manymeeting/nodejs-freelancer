import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';

// redux-actions
import { fetchAllPublishedProject } from "../actions/AllPublishedProjectActions";

// views
import AllPublishedProjList from "./AllPublishedProjList";

class AllPublishedProjListContainer extends React.Component {
	constructor(props)
	{
		super(props);
	}

	componentDidMount()
	{
		this.props.fetchAllPublishedProject(this.props.userInfo.user_id);
	}

	render()
	{
		return (
			<div>
				<p>All Published</p>
				<AllPublishedProjList />		
			</div>
		);
	}
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllPublishedProject: (id) => dispatch(fetchAllPublishedProject(id))
  };
}

const mapStateToProps = state => ({
	userInfo: state.userInfo,
	allPublishedProjects: state.allPublishedProjects.items,
	loading: state.allPublishedProjects.loading,
	error: state.allPublishedProjects.error
});


export default connect(mapStateToProps, mapDispatchToProps)(AllPublishedProjListContainer);
