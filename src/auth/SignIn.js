//import "./SignIn.css";
import React, { Component } from "react";
import {
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import { signIn } from "../actions";
import GoogleSignInButton from "../components/utils/GoogleSignInButton";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false 
    };
  }

  render() {
    const { auth, signIn } = this.props;
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

    if (auth) return <Redirect to={from}  />;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div>
        <GoogleSignInButton action={signIn}/>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { signIn })(SignIn);