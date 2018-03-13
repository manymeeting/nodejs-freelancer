// import React from 'react';
// import {
//   Route,
//   Link
// } from 'react-router-dom';
// import { connect } from 'react-redux';
// import {withRouter} from 'react-router';

// // redux-actions
// import { fetchProjBidsInfo } from "./actions/ProjectBasicInfoActions";

// // views
// import ProjectBasicInfo from "./ProjectBasicInfo";

// class ProjBidListContainer extends React.Component {
// 	constructor(props)
// 	{
// 		super(props);
// 	}

// 	componentDidMount()
// 	{
// 		console.log(JSON.stringify(this.props.match, null, 2));
// 		this.props.fetchProjBidsInfo(this.props.match.params.id);
// 	}

// 	render()
// 	{

// 		return (
// 			<div>
// 				<p>Here is ProjBidListContainer</p>
// 				<ProjectBasicInfo />		
// 			</div>
// 		);
// 	}
// }


// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchProjBidsInfo: (id) => dispatch(fetchProjBidsInfo(id))
//   };
// }

// const mapStateToProps = state => ({
//   projectBasic: state.projectDetails.basic
// });


// ProjBidListContainer = withRouter(ProjBidListContainer);

// export default connect(mapStateToProps, mapDispatchToProps)(ProjBidListContainer);
