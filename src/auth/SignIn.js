//import "./SignIn.css";
import React, { Component } from "react";
import {
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import { signInWithGoogle } from "../actions";
import GoogleSignInButton from "../components/utils/GoogleSignInButton";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false 
    };
  }

  render() {
    const { auth, signInWithGoogle } = this.props;
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

    if (auth) return <Redirect to={from}  />;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div className = 'conteniner-signin'>
      <span className = 'signInText'> Login </span> 
      <span className = 'signInText'> Sign Up </span>
      <hr/>

      <GoogleSignInButton action={signInWithGoogle}/>
      
      <button type="button" className="facebook-button" onClick={() => {}}>
        <span className="facebook-button__text">LOG IN WITH FACEBOOK </span>
      </button>
      
      <hr/>
      
      <input type="email" placeholder= 'Email' className = 'signInInput' />
      <input type="password" placeholder= 'Password' className = 'signInInput' />
      
      <button className= 'logInButton'> LOG IN </button>
      
      <a href = '#'> <p> Forget password? </p> </a>
    </div>

    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { GoogleSignInButton })(SignIn);