import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// redux-actions
import { hireBid } from "../actions/HireBidActions";
import { fetchProjBasicInfo } from "../actions/ProjectBasicInfoActions"
class ProjectBidList extends React.Component {
	constructor(props)
	{
		super(props);
		this.onHire = this.onHire.bind(this);
	}
	render()
	{
		var projectBidList = this.props.projectBidList;
		if(projectBidList.length === 0)
		{
			return(<div> (no bids) </div>);
		}
		return(
			<div>
				<ul className="fl-nopadding-ul">

					{
						projectBidList.map((bid) =>
							<li key={bid.bid_id}>
								<div className="fl-bid-info-container">
									<div className="fl-list-row">
										<span className="fl-list-label">Bidder: </span>
										<span className="fl-bid-bidder"><Link to={"/user_profile/" + bid.bidder_id} >{bid.user_name}</Link></span>
									</div>
									<div className="fl-list-row">
										<span className="fl-list-label">Price (USD): </span>
										<span className="fl-bid-price">{bid.bid_price}</span>
									</div>
									<div className="fl-list-row">
										<span className="fl-list-label">Period (Days): </span>
										<span className="fl-bid-period">{bid.bid_period}</span> 
									</div>
									<div className="fl-list-row">
										{
											bid.employer_id === this.props.userInfo.user_id && this.props.projectBasic.status === "OPEN" &&
											<button className="btn btn-primary" onClick={this.onHire} bid_id={bid.bid_id}>Hire</button>
										}
									</div>

								</div>
							</li>
						)
					}
					
				</ul>
			</div>
		)
	}

	onHire(e)
	{
		e.preventDefault();

		var bidID = e.target.getAttribute("bid_id");
		var params = {
			bidID: bidID,
			projectID: this.props.projectBasic.project_id
		};

		this.props
			.hireBid(params)
			.then(() => {
				this.props.fetchProjBasicInfo(this.props.projectBasic.project_id);
			});
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    hireBid: (params) => dispatch(hireBid(params)),
    fetchProjBasicInfo: (id) => dispatch(fetchProjBasicInfo(id)) 
  };
}
const mapStateToProps = state => ({
	projectBasic: state.projectDetails.basic,
	projectBidList: state.projectDetails.bids,
	userInfo: state.userInfo
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBidList);
