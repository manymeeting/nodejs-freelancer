import React, { Component } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
// resources
import './css/common.css';
// views
import TopNav from './components/Topnav';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import PostProject from './pages/PostProject';
import ProjectDetails from './pages/ProjectDetails';
import ClientAuthService from './utils/ClientAuthService';
import Transactions from './pages/Transactions';

class App extends Component {
  render() {
    var clientAuthService = new ClientAuthService(); 
    return (
      <div className="container">
        {
          clientAuthService.isLoggedIn() && 
          <TopNav />
        }
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='/signup' component={Signup}/>
          <Route path='/login' component={Login}/>
          <Route path='/home' component={Home}/>
          <Route path='/dashboard' component={Dashboard}/>
          <Route path='/post_project' component={PostProject}/>
          <Route path='/project_details' component={ProjectDetails}/>
          <Route path='/user_profile' component={UserProfile}/>
          <Route path='/transactions' component={Transactions}/>
        </Switch>
      </div>
    );
  }
}

export default App;
