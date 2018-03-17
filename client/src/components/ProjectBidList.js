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
		return(
			<div>
				<p>Project Bids</p>
				<ul>

					{
						projectBidList.map((bid) =>
							<li key={bid.bid_id}>
								<div className="bid-indo-container">
									<div>
										<h3 className="bid-bidder-name"><Link to={"/user_profile/" + bid.bidder_id} >{bid.user_name}</Link></h3>
										<p className="bid-price"><label>Price: </label>{bid.bid_price}</p>
										<p className="bid-period"><label>Period (In Days): </label>{bid.bid_period}</p>
									</div>
									<div>
										{
											bid.employer_id === this.props.userInfo.user_id && this.props.projectBasic.status === "OPEN" &&
											<button onClick={this.onHire} bid_id={bid.bid_id}>Hire</button>
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
