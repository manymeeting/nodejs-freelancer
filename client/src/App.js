import React, { Component } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

// views
import TopNav from './Topnav';
import Login from './Login';
import Home from './Home';
import ProjectDetails from './ProjectDetails';

class App extends Component {
  render() {
    return (
      <div>
        <TopNav />
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
