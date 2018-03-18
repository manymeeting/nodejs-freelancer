import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class AllPublishedProjList extends React.Component {
	constructor(props)
	{
		super(props);
	}
	render()
	{
		var allPublishedProjects = this.props.allPublishedProjects;
		return (
			// list of projects
			<div>
				<p className="fl-sub-header">All Published Projects</p>
				<ul className="fl-nopadding-ul">
					{
						allPublishedProjects.map((project) =>
							<li key={project.project_id}>
								<div className="fl-project-info-container">
									<p className="fl-project-title"><Link to={"/project_details/" + project.project_id} >{project.project_name}</Link></p>
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
										<span className="fl-project-budget-range">{project.budget_range}</span> 
									</div>
									<div className="fl-list-row">
										<span className="fl-list-label">Status: </span>
										<span className="fl-project-budget-range">{project.status}</span> 
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
  allPublishedProjects: state.allPublishedProjects.items,
  error: state.allPublishedProjects.error
});

export default connect(mapStateToProps)(AllPublishedProjList);
