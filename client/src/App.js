import React, { Component } from 'react';
import TopNav from './Topnav';
import Login from './Login';
import Home from './Home';
import {
  Switch,
  Route
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <TopNav />
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='/login' component={Login}/>
          <Route path='/home' component={Home}/>
        </Switch>
      </div>
    );
  }
}

export default App;
