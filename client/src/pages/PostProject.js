import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import withAuth from '../utils/withAuth';
import update from 'react-addons-update';
import { inputValidation } from '../utils/formUtils'
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
		       	budgetRange: ""
		      }
		    };
		this.requiredInput = {
    		projectName: "Project Name",
    		projectDescription: "Project Description",
    		projectSkills: "Required Skills",
    		budgetRange: "Budget Range"
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
		if(!inputValidation(this.requiredInput, this))
		{
			console.log("Input Validation Failed")
			return;
		}
		
		// fill all hidden values
		var newProject = {
			projectName: this.state.input.projectName,
			employerID: this.props.userInfo.user_id,
			projectDescription: this.state.input.projectDescription,
			projectSkills: this.state.input.projectSkills,
			budgetRange: this.state.input.budgetRange,
			publishedDate: Date()
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
			<div className="fl-main-container">
			    <h1 className="fl-main-header">Post Project</h1>
			    <form id="postProjectForm">
					<div className="form-group">
			            <label>Project Name:</label>
			            <input type="text" className="form-control" name="projectName" onChange={this.handleInputChange} required/>
			        </div>
			        <div className="form-group">
			            <label>Project Description:</label>
			            <input type="text" className="form-control" name="projectDescription" onChange={this.handleInputChange} required/>
			        </div>
			        <div className="form-group">
			            <label>Required Skills:</label>
			            <input type="text" className="form-control" name="projectSkills" onChange={this.handleInputChange} required/>
			        </div>
			        <div className="form-group">
			            <label>Budget Range:</label>
			            <input type="text" className="form-control" name="budgetRange" onChange={this.handleInputChange} required/>
			        </div>

			        <button className="btn btn-primary" onClick={this.onSumbit}>Post Project</button>
				</form>
			</div>
			
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
