import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import TopNav from './topnav';
import Login from './login'
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
