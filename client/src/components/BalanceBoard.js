import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import { inputValidation } from '../utils/formUtils';
import { withRouter } from 'react-router';

// redux-actions
import { makeTransaction } from "../actions/TransactionActions";
import { fetchUserInfo } from "../actions/UserInfoActions";

class BalanceBoard extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = {
		      input: {
		        updateBalanceAmt: ""
		      }
		    };

		this.updateBalance = this.updateBalance.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.requiredInput = {
    		updateBalanceAmt: "Update Balance Amount"
    	};
	}

	handleInputChange(event)
	{
		var newState = {input:{}};
		newState.input[event.target.name] = {$set: event.target.value};

		this.setState(update(this.state, newState));
	}

	updateBalance(e)
	{
		e.preventDefault();
		if(!inputValidation(this.requiredInput, this))
		{
			console.log("Input Validation Failed")
			return;
		}
		if(isNaN(this.state.input.updateBalanceAmt))
		{
			alert("Amount must be a number")
			return;
		}

		var inputAmount = parseFloat(this.state.input.updateBalanceAmt);
		this.props.makeTransaction({
			transFrom: inputAmount >= 0 ? "" : this.props.userInfo._id,
		    transTo: inputAmount < 0 ? "" : this.props.userInfo._id,
		    transAmount: Math.abs(inputAmount),
		    transForProject: "",
		    transDate: Date()
		})
		.then(() => {
			// reload user info
			this.props.fetchUserInfo(this.props.userInfo._id);
		})
	}

	render()
	{
		return(
			<div>
				<p className="fl-sub-header">My Balance</p>
				<div className="fl-details-row">
					<span className="fl-details-label">Current Balance (USD): </span>
					<span>{this.props.userInfo.user_balance}</span>
				</div>
				<form>
					<div className="form-group">
			            <label>Add or Withdraw (minus number) Money:</label>
			            <input type="text" className="form-control" name="updateBalanceAmt" onChange={this.handleInputChange} />
			        </div>
			        <button onClick={this.updateBalance} className="btn btn-primary">Update Balance</button>
				</form>
			</div>
		)
	
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    makeTransaction: (params) => dispatch(makeTransaction(params)),
    fetchUserInfo: (id) => dispatch(fetchUserInfo(id))
  };
}
const mapStateToProps = state => ({
  userInfo: state.userInfo
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BalanceBoard));
