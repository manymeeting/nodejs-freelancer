import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';

// redux-actions
import { fetchExpenseTransactions } from "../actions/TransactionActions";

// views
import TransExpenseList from "./TransExpenseList";

class TransExpenseListContainer extends React.Component {
	constructor(props)
	{
		super(props);
	}

	componentDidMount()
	{
		this.props.fetchExpenseTransactions(this.props.userInfo._id);
	}

	render()
	{
		return (
			<TransExpenseList />
		);
	}
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchExpenseTransactions: (id) => dispatch(fetchExpenseTransactions(id))
  };
}

const mapStateToProps = state => ({
	userInfo: state.userInfo,
	incomeTransactions: state.incomeTransactions.items,
	loading: state.incomeTransactions.loading,
	error: state.incomeTransactions.error
});


export default connect(mapStateToProps, mapDispatchToProps)(TransExpenseListContainer);
