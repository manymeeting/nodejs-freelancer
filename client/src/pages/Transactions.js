import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import withAuth from '../utils/withAuth';
import {withRouter} from 'react-router';

// views
import TransIncomeListContainer from "../components/TransIncomeListContainer";
import TransExpenseListContainer from "../components/TransExpenseListContainer";
import BalanceBoard from "../components/BalanceBoard";

class Transactions extends React.Component {
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return(
			<div className="fl-main-container">
			    <h1 className="fl-main-header">Transactions</h1>
			    <div>
			    	<ul className="fl-nopadding-ul">
			            <li className="fl-nav-item"><Link to={`${this.props.match.path}/balance`}>My Balance</Link></li>
			            <li className="fl-nav-item"><Link to={`${this.props.match.path}/income`}>Income</Link></li>
			            <li className="fl-nav-item"><Link to={`${this.props.match.path}/expense`}>Expense</Link></li>
			        </ul>
			    </div>
			    <Route path={`${this.props.match.path}/balance`} component={BalanceBoard} />
			    <Route path={`${this.props.match.path}/income`} component={TransIncomeListContainer} />
			    <Route path={`${this.props.match.path}/expense`} component={TransExpenseListContainer} />
			</div>
		) 
	}
}

// project details page is open to registered users only
export default withAuth(withRouter(Transactions));