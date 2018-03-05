import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';
import {withRouter} from 'react-router';
import ClientAuthService from './utils/authclient';

class InputForm extends React.Component {
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <div id="loginForm">
        <h3>Form</h3>
        <div className="container">
          <form>
            <span>Email</span><input type="text" name="email" id="inputEmail"/><br/>
            <span>Password</span><input type="text" name="password" id="inputPassword"/><br/>
          </form>
          <button id="loginSubmitBtn" onClick={this.onSumbit.bind(this)}>
            Login
          </button>
        </div>
      </div>
    );
  }


  onSumbit()
  {
    const location = {
      pathname: '/signup',
      state: {}
    };
    this.props.history.push(location)
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