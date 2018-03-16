import React, { Component } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

// views
import TopNav from './components/Topnav';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import ClientAuthService from './utils/ClientAuthService';

class App extends Component {
  render() {
    var clientAuthService = new ClientAuthService(); 
    return (
      <div>
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
          <Route path='/project_details' component={ProjectDetails}/>
        </Switch>
      </div>
    );
  }
}

export default App;
