import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import withAuth from '../utils/withAuth';
import update from 'react-addons-update';
// redux-actions
import { postProject } from "../actions/PostProjectActions";

class PostProject extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = {
		      input: {
		        projectName: "",
		       	projectDescription: "",
		       	projectSkills: "",
		       	budgeRange: ""
		      }
		    };
		this.handleInputChange = this.handleInputChange.bind(this);
    	this.onSumbit = this.onSumbit.bind(this);

	}

	handleInputChange(event)
	{
		var newState = {input:{}};
		newState.input[event.target.name] = {$set: event.target.value};

		this.setState(update(this.state, newState));
	}

	onSumbit(e)
	{
		e.preventDefault();
		console.log(this.props);
		
		// fill all hidden values
		var newProject = {
			projectName: this.state.input.projectName,
			employerID: this.props.userInfo.user_id,
			projectDescription: this.state.input.projectDescription,
			projectSkills: this.state.input.projectSkills,
			budgeRange: this.state.input.budgeRange,
			publishedData: Date()
		};
		
		this.props.postProject(newProject)
			.then((id) => {
				// jump to project details page
				this.props.history.push('/project_details/' + id);
			});
	}


	render()
	{
		return(
			<form id="postProjectForm">
				<span>Project Name</span><input type="text" name="projectName" onChange={this.handleInputChange} required="required"/><br/>
				<span>Project Description</span><textarea name="projectDescription" onChange={this.handleInputChange} required="required" form="postProjectForm"></textarea>
				
				<span>Skills Required</span><input type="text" name="projectSkills" onChange={this.handleInputChange} required="required" /><br/>
				<span>Budget Range</span><input type="text" name="budgeRange" onChange={this.handleInputChange} required="required" /><br/>

		        <button onClick={this.onSumbit}>Post Project</button>
			</form>
		)
	}
}


const mapDispatchToProps = (dispatch) => {
  return {
    postProject: (newProject) => dispatch(postProject(newProject)),
  };
}

const mapStateToProps = state => ({
	userInfo: state.userInfo
});

PostProject = connect(mapStateToProps, mapDispatchToProps)(PostProject);
PostProject = withRouter(PostProject);
PostProject = withAuth(PostProject);
export default PostProject;
