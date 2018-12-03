// import "./signUp.css";
import React, { Component } from "react";
// import {
//   Redirect,
//   Link
// } from "react-router-dom";
import { connect } from "react-redux";
import { 
//   signInWithGoogle,
//   signInWithFacebook,
  signInWithEmailAndPassword
 } from "../actions";


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      name: null,
      surname: null
    };
  }
  
  logInwithEmailAndPassword = (e) => {
    this.props.signInWithEmailAndPassword(this.state.email, this.state.password);
  }
  
  render() {
    // const { auth, signInWithGoogle, signInWithFacebook } = this.props;
    // let { from } = this.props.location.state || { from: { pathname: "/" } };
    // let { redirectToReferrer } = this.state;

    // if (auth) return <Redirect to={from} />;

    // if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div className='conteniner-signin'>
      <span className='signInText'>Create your Account</span>
      <hr/>
      
      <input 
        type="text" 
        placeholder='Name'
        className = 'signInInput'
        onChange={e => this.setState({name: e.target.value})}
      />
      <input 
        type="text" 
        placeholder='Surname'
        className = 'signInInput'
        onChange={e => this.setState({surname: e.target.value})}
      />

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
        onClick={this.logInwithEmailAndPassword}
      > Sign Up </button>
      
    </div>

    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { 
//   signInWithGoogle,
//   signInWithFacebook,
  signInWithEmailAndPassword
 })(SignUp);