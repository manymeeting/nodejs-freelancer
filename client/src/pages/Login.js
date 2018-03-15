import React from 'react';
import {withRouter} from 'react-router';
import update from 'react-addons-update'; // ES6
import ClientAuthService from '../utils/ClientAuthService';

class InputForm extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      input: {
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
            <span>Email</span><input type="text" name="email" id="inputEmail" onChange={this.handleInputChange} /><br/>
            <span>Password</span><input type="text" name="password" id="inputPassword" onChange={this.handleInputChange} /><br/>
          </form>
          
          <button id="loginSubmitBtn" onClick={this.onSumbit}>
            Login
          </button>
        </div>
      </div>
    );
  }


  onSumbit(e)
  {
    e.preventDefault();
    var email = this.state.input.email;
    var password = this.state.input.password;
    var clientAuthService = new ClientAuthService();

    clientAuthService.fetch('/api_auth_user', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        })
    }).then(data => {
        console.log("Login Success!");
        // set token into localstorage for client auth services
        clientAuthService.login(data.token);
        // redirect to home page
        this.props.history.push("/home");
    }).catch(error => {
        console.log("Login Failed: " + error);
    });
  }

}

InputForm = withRouter(InputForm);

const Login = () => (
  <div>
    <p>Login</p>
    <InputForm />
  </div>
)
export default Login;