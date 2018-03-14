import React from 'react';
import {withRouter} from 'react-router';
import update from 'react-addons-update'; // ES6
import ClientAuthService from '../utils/ClientAuthService';

class SignupForm extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      input: {
        username: "",
        email: "",
        password: ""
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSumbit = this.onSumbit.bind(this);
  }

  handleInputChange(event)
  {
    var newState = {input:{}};
    newState.input[event.target.name] = {$set: event.target.value};
    
    this.setState(update(this.state, newState));
  }

  render()
  {
    return (
      <div id="loginForm">
        <h3>Form</h3>
        <div className="container">
          <form>
            <span>Name</span><input type="text" name="username" id="inputName" onChange={this.handleInputChange} /><br/>
            <span>Email</span><input type="email" name="email" id="inputEmail" onChange={this.handleInputChange} /><br/>
            <span>Password</span><input type="password" name="password" id="inputPassword" onChange={this.handleInputChange} /><br/>
          </form>
          
          <button id="loginSubmitBtn" onClick={this.onSumbit}>
            Login
          </button>
        </div>
      </div>
    );
  }


  onSumbit()
  {
    var username = this.state.input.username;
    var email = this.state.input.email;
    var password = this.state.input.password;
    var clientAuthService = new ClientAuthService();

    clientAuthService.fetch('/api_add_user', {
        method: 'PUT',
        body: JSON.stringify({
            username,
            email,
            password
        })
    }).then(data => {
        console.log("Signup Success!");
        // redirect to login page
        this.props.history.push("/login");
    }).catch(error => {
        console.log("Signup Failed: " + error);
    });
  }

}

SignupForm = withRouter(SignupForm);


const Signup = () => (
  <div>
    <p>Signup</p>
    <SignupForm />
  </div>
)
export default Signup;