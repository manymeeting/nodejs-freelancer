import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class AllBiddedProjList extends React.Component {
	constructor(props)
	{
		super(props);
	}
	render()
	{
		var allBiddedProjects = this.props.allBiddedProjects;
		return (
			// list of projects
			<div>
				<ul>
					{
						allBiddedProjects.map((project) =>
							<li key={project.bid_date}>
								<div className="project-info-container">
									<div>
										<h3 className="project-title"><Link to={"/project_details/" + project.project_id} >{project.project_name}</Link></h3>
										<p className="project-desc">{project.project_description}</p>
										<p className="project-skills">{project.project_skills}</p>
									</div>
									<div>
										<p className="project-budget-range">{project.budget_range}</p>
										<p className="project-employer-name">{project.user_name}</p>
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
  allBiddedProjects: state.allBiddedProjects.items,
  error: state.allBiddedProjects.error
});

export default connect(mapStateToProps)(AllBiddedProjList);
