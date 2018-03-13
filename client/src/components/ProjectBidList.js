import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ProjectBidList extends React.Component {
	constructor(props)
	{
		super(props);
	}
	render()
	{
		return(
			<div>
				<p>Project Bids</p>
				<p>Bids: {JSON.stringify(this.props.projectBidList, null, 2)}</p>
			</div>
		)
	}
}

const mapStateToProps = state => ({
  projectBidList: state.projectDetails.bids
});

export default connect(mapStateToProps)(ProjectBidList);
