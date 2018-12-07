import React, { Component } from "react";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';

import { 
  signUpWithEmailAndPassword
 } from "../actions/auth";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
    };
  }

  render() {
    if (this.props.auth) {
      this.props.history.push('account');
    }
    
    return (
      <div className='conteniner-signin'>
      <span className='signInText'>Create your Account</span>
      <hr/>

      <input 
        type="email" 
        placeholder='Email'
        className = 'signInInput'
        onChange={e => this.setState({email: e.target.value})}
      />
      <input 
        type="password" 
        placeholder='Password'
        className='signInInput'
        onChange={e => this.setState({password: e.target.value})}
      />
      <button 
        className='logInButton' 
        onClick={() => {
          this.props.signUpWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.history.push('/account'))
            .catch(alert)
        }}
      > Sign Up </button>
      
    </div>

    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default withRouter(connect(mapStateToProps, { 
  signUpWithEmailAndPassword
 })(SignUp));