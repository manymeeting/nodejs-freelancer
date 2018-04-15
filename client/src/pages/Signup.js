import React from 'react';
import {withRouter} from 'react-router';
import update from 'react-addons-update'; // ES6
import ClientAuthService from '../utils/ClientAuthService';
import { inputValidation } from '../utils/formUtils'

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
    this.requiredInput = {
      userName: "User Name",
      email: "Email",
      password: "Password"
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
      <div id="signUpForm" className="fl-main-container">
        <h1 className="fl-main-header">Create New Account</h1>
        <form>
          <div className="form-group">
              <label>User Name:</label>
              <input type="text" className="form-control" name="username" onChange={this.handleInputChange} required/>
          </div>
          <div className="form-group">
              <label>Email Address:</label>
              <input type="email" className="form-control" name="email" onChange={this.handleInputChange} required/>
          </div>
          <div className="form-group">
              <label>Password:</label>
              <input type="password" className="form-control" name="password" onChange={this.handleInputChange} required/>
          </div>
          <button className="btn btn-primary" id="signUpSubmitBtn" onClick={this.onSumbit}>
            Sign Up
          </button>
        </form>
      </div>
    );
  }


  onSumbit(e)
  {
    e.preventDefault();
    if(!inputValidation(this.requiredInput, this))
    {
      console.log("Input Validation Failed")
      return;
    }
    var userName = this.state.input.username;
    var userEmail = this.state.input.email;
    var userPassword = this.state.input.password;
    var clientAuthService = new ClientAuthService();

    clientAuthService.fetch('/users', {
        method: 'POST',
        body: JSON.stringify({
            userName,
            userEmail,
            userPassword
        })
    }).then(data => {
        console.log("Signup Success!");
        // log out current user
        clientAuthService.logout();
        // redirect to login page
        this.props.history.push("/login");
    }).catch(error => {
        console.log("Signup Failed: " + error);
    });
  }

}

SignupForm = withRouter(SignupForm);


const Signup = () => (
  <SignupForm />
)
export default Signup;