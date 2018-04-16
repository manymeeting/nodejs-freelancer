import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import withAuth from '../utils/withAuth';
import {withRouter} from 'react-router';
// resources
import '../css/home.css';
// views
import HomepageProjListContainer from "../components/HomepageProjListContainer";

class Home extends React.Component {
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return (
			<div className="fl-main-container">
			    <h1 className="fl-main-header">Home</h1>
			    <div>
			    	<ul className="fl-nopadding-ul">
			            <li className="fl-nav-item"><Link to={`${this.props.match.path}`}>Open</Link></li>
			            <li className="fl-nav-item"><Link to={`${this.props.match.path}/relevant`}>Relevent</Link></li>
			        </ul>
			    </div>
			    <Route exact path={`${this.props.match.path}`} render={() =>  <HomepageProjListContainer type={"all"}/> }/>
				<Route exact path={`${this.props.match.path}/relevant`} render={ () => <HomepageProjListContainer type={"relevant"}/> }/>
			    <Route exact path={`${this.props.match.path}/search`} render={ () => <HomepageProjListContainer type={"search"} searchStr={this.state.searchStr}/> }/>
			</div>
		)
	}
}


// home page is open to registered users only
export default withAuth(withRouter(Home));