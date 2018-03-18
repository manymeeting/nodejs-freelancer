import React from 'react';
import {withRouter} from 'react-router';
import update from 'react-addons-update'; // ES6
import ClientAuthService from '../utils/ClientAuthService';
import { connect } from 'react-redux';

// redux-actions
import { fetchUserInfo } from "../actions/UserInfoActions";
// resources
import '../css/login-signup.css';

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
      <div className="container fl-login-container">
        <form>
          <div className="form-group">
            <label>Email address:</label>
            <input type="text" className="form-control" name="email" id="inputEmail" onChange={this.handleInputChange} />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" className="form-control" name="password" id="inputPassword" onChange={this.handleInputChange} />
          </div>
          <button id="loginSubmitBtn" onClick={this.onSumbit} className="btn btn-primary">Login</button>
        </form>
        
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
        console.log("Validation Passed!");
        // set token into localstorage for client auth services
        clientAuthService.login(data.token);
        console.log(clientAuthService.getProfile());
        return clientAuthService.getProfile();
    }).then((decodedData) => {
        // fetch user info
        var userID = decodedData.user.user_id;
        this.props.fetchUserInfo(userID);
    }).then(() => {
        // redirect to home page
        this.props.history.push("/home");
    }).catch(error => {
        console.log("Login Failed: " + error);
    });
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserInfo: (id) => dispatch(fetchUserInfo(id))
  };
}

InputForm = connect(null, mapDispatchToProps)(InputForm)
InputForm = withRouter(InputForm);

const Login = () => (
  <div className="container">
    <h1 className="fl-login-header">login</h1>
    <InputForm />
  </div>
  
)
export default Login;