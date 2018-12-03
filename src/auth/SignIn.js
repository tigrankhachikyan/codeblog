//import "./SignIn.css";
import React, { Component } from "react";
import {
  Redirect,
  Link
} from "react-router-dom";
import { connect } from "react-redux";
import { 
  signInWithGoogle,
  signInWithFacebook,
  signInWithEmailAndPassword
 } from "../actions";

import GoogleSignInButton from "../components/utils/GoogleSignInButton";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      email: null,
      password: null
    };
  }
  
  logInwithEmailAndPassword = (e) => {
    this.props.signInWithEmailAndPassword(this.state.email, this.state.password);
  }
  
  render() {
    const { auth, signInWithGoogle, signInWithFacebook } = this.props;
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

    if (auth) return <Redirect to={from} />;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div className='conteniner-signin'>
      <span className='signInText'>Login</span> 
      <span className='signInText'>Sign Up</span>
      <hr/>

      <GoogleSignInButton action={signInWithGoogle}/>
      
      <button type="button" className="facebook-button" onClick={signInWithFacebook}>
        <span className="facebook-button__text">Log in with Facebook </span>
      </button>
      
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
        onClick={this.logInwithEmailAndPassword}
      > LOG IN </button>
      
      <p><Link to = {'/forget-password'} >Forget password?</Link></p>
    </div>

    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { 
  signInWithGoogle,
  signInWithFacebook,
  signInWithEmailAndPassword
 })(SignIn);