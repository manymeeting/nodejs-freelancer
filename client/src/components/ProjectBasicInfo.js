import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ProjectBasicInfo extends React.Component {
	constructor(props)
	{
		super(props);
	}
	render()
	{
		return(
			<div>
				<p>Project Basic Info</p>
				<p>PJ Details: {JSON.stringify(this.props.projectBasic, null, 2)}</p>
			</div>
		)
	}
}

const mapStateToProps = state => ({
  projectBasic: state.projectDetails.basic
});

export default connect(mapStateToProps)(ProjectBasicInfo);
