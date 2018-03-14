import React, { Component } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

// views
import TopNav from './components/Topnav';
import Login from './pages/Login';
import Home from './pages/Home';
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
          <Route path='/login' component={Login}/>
          <Route path='/home' component={Home}/>
          <Route path='/project_details' component={ProjectDetails}/>
        </Switch>
      </div>
    );
  }
}

export default App;
