import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';

// redux-actions
import { fetchAllOpenProjects } from "./actions/AllOpenProjectActions";

// views
import AllOpenProjList from "./AllOpenProjList";

class AllOpenProjListContainer extends React.Component {
	constructor(props)
	{
		super(props);
	}

	componentDidMount()
	{
		this.props.fetchAllOpenProjects();
	}

	render()
	{

		console.log(JSON.stringify(this.props.allOpenProjects, null, 2));		
		return (
			<div>
				<p>Here I am</p>
				<AllOpenProjList allOpenProjects={this.props.allOpenProjects}/>		
			</div>
		);
	}
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllOpenProjects: () => dispatch(fetchAllOpenProjects())
  };
}

const mapStateToProps = state => ({
  allOpenProjects: state.allOpenProjects.items,
  loading: state.allOpenProjects.loading,
  error: state.allOpenProjects.error
});


export default connect(mapStateToProps, mapDispatchToProps)(AllOpenProjListContainer);
