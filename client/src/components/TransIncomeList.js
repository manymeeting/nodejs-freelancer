import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class TransIncomeList extends React.Component {
	constructor(props)
	{
		super(props);
	}
	render()
	{
		var incomeTransactions = this.props.incomeTransactions;
		if(incomeTransactions.length === 0)
		{
			return (
				<div>
					<p className="fl-sub-header">Income Transactions</p>
					<p>(no income transactions)</p>
				</div>
			)
		}
		return (
			// list of projects
			<div>
				<p className="fl-sub-header">Income Transactions</p>
				<ul>
					{
						incomeTransactions.map((transaction) =>
							<li key={transaction._id}>
								<div className="fl-transaction-info-container">
									<div className="fl-list-row">
										<span className="fl-list-label">From: </span>
										<span>{transaction.trans_from}</span>
									</div>
									<div className="fl-list-row">
										<span className="fl-list-label">To: </span>
										<span>{transaction.trans_to}</span>
									</div>
									<div className="fl-list-row">
										<span className="fl-list-label">Amount: </span>
										<span>{transaction.trans_amount}</span> 
									</div>
									<div className="fl-list-row">
										<span className="fl-list-label">For Project: </span>
										<span>{transaction.trans_for_project}</span> 
									</div>
									<div className="fl-list-row">
										<span className="fl-list-label">For Project: </span>
										<span>{transaction.trans_date}</span> 
									</div>

								</div>
							</li>
						)
					}
					
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => ({
  incomeTransactions: state.incomeTransactions.items,
  error: state.incomeTransactions.error
});

export default connect(mapStateToProps)(TransIncomeList);
