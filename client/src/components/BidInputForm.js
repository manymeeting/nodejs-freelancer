import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import { inputValidation } from '../utils/formUtils'
// redux-actions
import { addBidOnProject } from "../actions/BidOnProjectActions";
import { fetchProjBasicInfo } from "../actions/ProjectBasicInfoActions";

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
    	this.requiredInput = {
    		bidPrice: "Bid Price",
    		bidPeriod: "Bid Period"
    	};

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
		if(!inputValidation(this.requiredInput, this))
		{
			console.log("Input Validation Failed")
			return;
		}
		if(isNaN(this.state.input.bidPrice))
		{
			alert("Bid Price must be a number")
			return;
		}
		// fill all hidden values
		var newBid = {
			projectID: this.props.projectBasic._id,
			bidderID: this.props.userInfo._id,
			employerID: this.props.projectBasic.employer._id,
			bidPeriod: this.state.input.bidPeriod,
			bidPrice: this.state.input.bidPrice,
			bidDate: Date(),
		};
		
		this.props.addBidOnProject(newBid)
			.then(() => {
					this.props.fetchProjBasicInfo(this.props.projectBasic._id) // reload project details
				});
	}


	render()
	{
		return(
			<form>
				<div className="form-group">
		            <label>Bid Period (Days):</label>
		            <input type="text" className="form-control" name="bidPeriod" id="inputBidPeriod" onChange={this.handleInputChange} />
		        </div>
		        <div className="form-group">
		            <label>Bid Price (USD):</label>
		            <input type="text" className="form-control" name="bidPrice" id="inputBidPrice" onChange={this.handleInputChange} />
		        </div>
		        <button id="bidSumbitBtn" onClick={this.onSumbit} className="btn btn-primary">Submit Bid</button>
			</form>
		)
	}
}


const mapDispatchToProps = (dispatch) => {
  return {
    addBidOnProject: (bid) => dispatch(addBidOnProject(bid)),
    fetchProjBasicInfo: (id) => dispatch(fetchProjBasicInfo(id))
  };
}

const mapStateToProps = state => ({
	projectBasic: state.projectDetails.basic,
	userInfo: state.userInfo
});


export default connect(mapStateToProps, mapDispatchToProps)(BidInputForm);
