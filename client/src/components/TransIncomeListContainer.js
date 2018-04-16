import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';

// redux-actions
import { fetchIncomeTransactions } from "../actions/IncomeTransactionActions";

// views
import TransIncomeList from "./TransIncomeList";

class TransIncomeListContainer extends React.Component {
	constructor(props)
	{
		super(props);
	}

	componentDidMount()
	{
		this.props.fetchIncomeTransactions(this.props.userInfo._id);
	}

	render()
	{
		return (
			<TransIncomeList />
		);
	}
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchIncomeTransactions: (id) => dispatch(fetchIncomeTransactions(id))
  };
}

const mapStateToProps = state => ({
	userInfo: state.userInfo,
	incomeTransactions: state.incomeTransactions.items,
	loading: state.incomeTransactions.loading,
	error: state.incomeTransactions.error
});


export default connect(mapStateToProps, mapDispatchToProps)(TransIncomeListContainer);
