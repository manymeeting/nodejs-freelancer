import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import withAuth from '../utils/withAuth';
import {withRouter} from 'react-router';
import update from 'react-addons-update';
// resources
import '../css/home.css';
// views
import HomepageProjListContainer from "../components/HomepageProjListContainer";

class Home extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = {
		      input: {
		        projectSearchStr: ""
		      }
		    };
		this.handleInputChange = this.handleInputChange.bind(this);
    	this.onSearch = this.onSearch.bind(this);
	}

	handleInputChange(event)
	{
		var newState = {input:{}};
		newState.input[event.target.name] = {$set: event.target.value};

		this.setState(update(this.state, newState));
	}

	onSearch(e)
	{
		e.preventDefault();
		this.props.history.push("/home/search" + this.state.input.projectSearchStr);
	}

	render()
	{
		return (
			<div className="fl-main-container">
			    <h1 className="fl-main-header">Home</h1>
			    <div>
			    	<form>
			    		<div className="form-group">
				            <label>Search Project:</label>
				            <input type="text" className="form-control" name="projectSearchStr" onChange={this.handleInputChange} required/>
				        	<button id="searchProjectBtn" className="btn btn-primary" onClick={this.onSearch}>Search</button>
				        </div>
			    	</form>
			    </div>
			    <div>
			    	<ul className="fl-nopadding-ul">
			            <li className="fl-nav-item"><Link to={`${this.props.match.path}`}>Open</Link></li>
			            <li className="fl-nav-item"><Link to={`${this.props.match.path}/relevant`}>Relevent</Link></li>
			        </ul>
			    </div>
			    <Route exact path={`${this.props.match.path}`} render={() =>  <HomepageProjListContainer type={"all"}/> }/>
				<Route exact path={`${this.props.match.path}/relevant`} render={ () => <HomepageProjListContainer type={"relevant"}/> }/>
			    <Route exact path={`${this.props.match.path}/search:searchStr`} render={ () => <HomepageProjListContainer type={"search"}/> }/>
			</div>
		)
	}
}


// home page is open to registered users only
export default withAuth(withRouter(Home));