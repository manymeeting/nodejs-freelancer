import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import update from 'react-addons-update'; // ES6

// redux-actions
import { validateUser } from "../actions/ValidateUserActions";

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


  onSumbit()
  {
    var email = this.state.input.email;
    var password = this.state.input.password;
    
    this.props.validateUser(email, password, this.props.history);
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    validateUser: (email, password, history) => dispatch(validateUser(email, password, history))
  };
}

InputForm = connect(null, mapDispatchToProps)(InputForm)
InputForm = withRouter(InputForm);

const Login = () => (
  <div>
    <p>Login</p>
    <InputForm />
  </div>
)
export default Login;