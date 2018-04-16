import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';

// redux-actions
import { fetchAllOpenProjects } from "../actions/AllOpenProjectActions";
// import { fetchRelevantProjects } from "../actions/RelevantProjectActions";
// import { fetchSearchedProjects } from "../actions/SearchProjectActions";

// views
import HomepageProjList from "./HomepageProjList";

class HomepageProjListContainer extends React.Component {
	constructor(props)
	{
		super(props);
	}

	componentDidMount()
	{
		console.log(this.props.type);
		if(this.props.type === "all")
		{
			this.props.fetchAllOpenProjects();
		}
		else if(this.props.type === "relevant")
		{
			this.props.fetchRelevantProjects();
		}
		else if(this.props.type === "search")
		{
			this.props.fetchSearchedProjects(this.props.searchStr);
		}
		
	}

	render()
	{
		var projects = [];
		if(this.props.type === "all")
		{
			projects = this.props.allOpenProjects;
		}
		else if(this.props.type === "relevant")
		{
			projects = this.props.relevantProjects;
		}
		else if(this.props.type === "search")
		{
			projects = this.props.searchedProjects;
		}

		return (
			<HomepageProjList projects={projects}/>
		);
	}
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllOpenProjects: () => dispatch(fetchAllOpenProjects()),
    // fetchRelevantProjects: () => dispatch(fetchRelevantProjects()),
    // fetchSearchedProjects: (searchStr) => dispatch(fetchSearchedProjects(searchStr))
  };
}

const mapStateToProps = state => ({
  allOpenProjects: state.allOpenProjects.items,
  // relevantProjects: state.relevantProjects.items,
  // searchedProjects: state.searchedProjects.items
});


export default connect(mapStateToProps, mapDispatchToProps)(HomepageProjListContainer);
