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
		if(allBiddedProjects.length === 0)
		{
			return (
				<div>
					<p className="fl-sub-header">All Bids</p>
					<p>(no bidded projects)</p>
				</div>
			)
		}
		return (
			// list of projects
			<div>
				<p className="fl-sub-header">All Bids</p>
				<ul>
					{
						allBiddedProjects.map((project) =>
							<li key={project.bid_date}>
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
									</div>
									<div className="fl-list-row">
										<span className="fl-list-label">Your Bid Price (USD): </span>
										<span className="fl-project-budget-range">{project.bid_price}</span> 
									</div>
									<div className="fl-list-row">
										<span className="fl-list-label">Status: </span>
										<span className="fl-project-budget-range">{project.project_status}</span> 
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
