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
		       	projectSkillsRaw: "",
		       	budgetRange: ""
		      }
		    };
		this.requiredInput = {
    		projectName: "Project Name",
    		projectDescription: "Project Description",
    		projectSkillsRaw: "Required Skills",
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
		var formData = new FormData(e.target);
		formData.append('employerID', this.props.userInfo._id);
		formData.append('publishedDate', Date());
		formData.append('projectSkills', JSON.stringify(this.state.input.projectSkillsRaw.split(",")));
		
		this.props.postProject(formData)
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
			    <form id="postProjectForm" encType="multipart/form-data" onSubmit={this.onSumbit}>
					<div className="form-group">
			            <label>Project Name:</label>
			            <input type="text" className="form-control" name="projectName" onChange={this.handleInputChange} required/>
			        </div>
			        <div className="form-group">
			            <label>Project Description:</label>
			            <input type="text" className="form-control" name="projectDescription" onChange={this.handleInputChange} required/>
			        </div>
			        <div className="form-group">
			            <label>Required Skills (use "," to split):</label>
			            <input type="text" className="form-control" name="projectSkillsRaw" onChange={this.handleInputChange} required/>
			        </div>
			        <div className="form-group">
			            <label>Budget Range:</label>
			            <input type="text" className="form-control" name="budgetRange" onChange={this.handleInputChange} required/>
			        </div>
			        <div className="form-group">
			            <label>Instruction Files:</label>
			            <input type="file" className="form-control" name="file"/>
			        </div>
			        
			        <input type="submit" className="btn btn-primary" value="Post Project"/>
			        
				</form>
			</div>
			
		)
	}
}


const mapDispatchToProps = (dispatch) => {
  return {
    postProject: (formData) => dispatch(postProject(formData)),
  };
}

const mapStateToProps = state => ({
	userInfo: state.userInfo
});

PostProject = connect(mapStateToProps, mapDispatchToProps)(PostProject);
PostProject = withRouter(PostProject);
PostProject = withAuth(PostProject);
export default PostProject;
