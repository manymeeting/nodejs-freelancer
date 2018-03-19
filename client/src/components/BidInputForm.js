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
    	this.requiredInput = {
    		bidPrice: "Bid Price",
    		bidPeriod: "Bid Period"
    	};
    	this.validateInput = this.validateInput.bind(this);

	}

	handleInputChange(event)
	{
		var newState = {input:{}};
		newState.input[event.target.name] = {$set: event.target.value};

		this.setState(update(this.state, newState));
	}

	validateInput()
	{
		for(let key in this.requiredInput)
		{
			if(this.state.input[key] === "")
			{
				alert("Please input value in " + this.requiredInput[key]);
				return false;
			}
		}
		return true;
	}

	onSumbit(e)
	{
		e.preventDefault();
		if(!this.validateInput())
		{
			console.log("Input Validation Failed")
			return;
		}
		// fill all hidden values
		var newBid = {
			projectID: this.props.projectBasic.project_id,
			bidderID: this.props.userInfo.user_id,
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
    fetchProjBidList: (id) => dispatch(fetchProjBidList(id))
  };
}

const mapStateToProps = state => ({
	projectBasic: state.projectDetails.basic,
	userInfo: state.userInfo
});


export default connect(mapStateToProps, mapDispatchToProps)(BidInputForm);
