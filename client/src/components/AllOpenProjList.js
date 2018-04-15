import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class AllOpenProjList extends React.Component {
	constructor(props)
	{
		super(props);
	}
	render()
	{
		var allOpenProjects = this.props.allOpenProjects;
		if(allOpenProjects.length === 0)
		{
			return (
				<div className="fl-all-open-proj-container">
					<p>(no open projects)</p>
				</div>
			)
		}
		return (
			// list of projects
			<div className="fl-all-open-proj-container">
				<ul>
					{
						allOpenProjects.map((project) =>
							<li key={project._id}>
								<div className="fl-project-info-container">
									<p className="fl-project-title"><Link to={"/project_details/" + project._id} >{project.project_name}</Link></p>
									<div className="fl-list-row">
										<span className="fl-list-label">Description: </span>
										<span className="fl-project-desc">{project.project_description}</span>
									</div>
									<div className="fl-list-row">
										<span className="fl-list-label">Required Skills: </span>
										<span className="fl-project-skills">{project.project_skills}</span>
									</div>
									<div className="fl-list-row">
										<span className="fl-list-label">Budget Range: </span>
										<span className="fl-project-budget-range">{project.project_budget_range}</span> 
										<span className="fl-list-label fl-margin-l-5">Published By: </span>
										<span className="fl-project-employer-name"><Link to={"/users/" + project.employer_id + '/profile'} >{project.user_name}</Link></span>
									</div>
									<div className="fl-list-row">
										<Link to={"/projects/" + project._id} >Bid Now</Link>
									</div>

								</div>
							</li>
						)
					}
					
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => ({
  allOpenProjects: state.allOpenProjects.items,
  error: state.allOpenProjects.error
});

export default connect(mapStateToProps)(AllOpenProjList);
