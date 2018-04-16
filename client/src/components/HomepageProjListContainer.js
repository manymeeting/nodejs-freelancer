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
			projects = this.getRelevantProjects(this.props.allOpenProjects, this.props.userInfo.user_skills);
		}
		else if(this.props.type === "search")
		{
			projects = this.props.searchedProjects;
		}

		return (
			<HomepageProjList projects={projects}/>
		);
	}

	getRelevantProjects(allProjects, userSkills)
	{
		var relevantProjects = [];
		relevantProjects = allProjects.map(project => {
			if(!project.project_skills || project.project_skills.length === 0) return null;
			var skillCount = 0
			for(var i = 0; i < project.project_skills.length; i++)
			{
				if(userSkills.indexOf(project.project_skills[i]) >= 0)
				{
					skillCount++;
				}
				if(skillCount >= 3) break;
			}
			return skillCount >= 3 ? project : null;
		})
		.filter(project => {
			return project === null ? false : true;
		});
		return relevantProjects;
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
	userInfo: state.userInfo,
	allOpenProjects: state.allOpenProjects.items,
	// relevantProjects: state.relevantProjects.items,
	// searchedProjects: state.searchedProjects.items
});


export default connect(mapStateToProps, mapDispatchToProps)(HomepageProjListContainer);
