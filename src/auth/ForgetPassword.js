//import "./SignIn.css";
import React, { Component } from "react";
import '../index.css'


class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      email: null,
      password: null
    };
  }
  
  render() {

    return (
      <div className='conteniner-forget'>
      <span className='signInText'>Forget Pasword</span> 
      <hr/>
      <input 
        type="email" 
        placeholder='Email'
        className = 'signInInput'
        onChange={e => this.setState({email: e.target.value})}
      />
      <button 
        className='logInButton' 
      > Reset Password </button>
      <p className = 'resetPasswordText'>*Password reset link will be sent to your email. 
        You will have 24 hours to reset your passwordPassword reset link will be sent to your email. 
        You will have 24 hours to reset your password </p>
    </div>

    );
  }
}

export default ForgetPassword;