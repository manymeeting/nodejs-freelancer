import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import TopNav from './Topnav';
import Login from './Login'
import {
  Switch,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <TopNav />
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='/login' component={Login}/>
          <Route path='/home' component={Login}/>
        </Switch>
      </div>
    );
  }
}

export default App;
