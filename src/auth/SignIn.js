//import "./SignIn.css";
import React, { Component } from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import { signIn } from "../actions";
import PropTypes from "prop-types";
import GoogleSignInButton from "../components/utils/GoogleSignInButton";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false 
    };
  }

  render() {
    const { data, auth, signOut, signIn } = this.props;
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

    if (auth) return <Redirect to={from}  />;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div className="center">
        <GoogleSignInButton action={signIn}/>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { signIn })(SignIn);