import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import update from 'react-addons-update';
// redux-actions
import { addBidOnProject } from "../actions/BidOnProjectActions";
import { fetchProjBidList } from "../actions/ProjectBidListActions";

class BidInputForm extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = {
		      input: {
		        bidPeriod: "",
		        bidPrice:""
		      }
		    };
		this.handleInputChange = this.handleInputChange.bind(this);
    	this.onSumbit = this.onSumbit.bind(this);

	}

	handleInputChange(event)
	{
		var newState = {input:{}};
		newState.input[event.target.name] = {$set: event.target.value};

		this.setState(update(this.state, newState));
	}

	onSumbit(e)
	{
		e.preventDefault();
		
		// fill all hidden values
		var newBid = {
			projectID: this.props.projectBasic.project_id,
			bidderID: this.props.projectBasic.user_id,
			employerID: this.props.projectBasic.employer_id,
			bidPeriod: this.state.input.bidPeriod,
			bidPrice: this.state.input.bidPrice,
			bidDate: Date(),
		};
		
		this.props.addBidOnProject(newBid)
			.then(() => {
					this.props.fetchProjBidList(this.props.projectBasic.project_id)
				});
	}


	render()
	{
		return(
			<form>
				<span>Bid Period</span><input type="text" name="bidPeriod" id="inputBidPeriod" onChange={this.handleInputChange} /><br/>
            	<span>Bid Price</span><input type="text" name="bidPrice" id="inputBidPrice" onChange={this.handleInputChange} /><br/>
		        <button onClick={this.onSumbit}>Submit Bid</button>
			</form>
		)
	}
}


const mapDispatchToProps = (dispatch) => {
  return {
    addBidOnProject: (bid) => dispatch(addBidOnProject(bid)),
    fetchProjBidList: (id) => dispatch(fetchProjBidList(id))
  };
}

const mapStateToProps = state => ({
	projectBasic: state.projectDetails.basic
});


export default connect(mapStateToProps, mapDispatchToProps)(BidInputForm);
