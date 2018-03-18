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
		return (
			// list of projects
			<div className="fl-all-open-proj-container">
				<ul>
					{
						allOpenProjects.map((project) =>
							<li key={project.project_id}>
								<div className="fl-project-info-container">
									<div>
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
											<span className="fl-list-label fl-margin-l-5">Published By: </span>
											<span className="fl-project-employer-name"><Link to={"/user_profile/" + project.employer_id} >{project.user_name}</Link></span>
										</div>
										<div className="fl-list-row">
											<Link to={"/project_details/" + project.project_id} >Bid Now</Link>
										</div>
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
