import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';


class InputForm extends React.Component {

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
          <button id="loginSubmitBtn">
            Login
          </button>
        </div>
      </div>
    );
  }


}


const Login = () => (
  <div>
    <p>Login</p>
  </div>
)
export default Login