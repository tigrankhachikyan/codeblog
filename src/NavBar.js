import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import {
  Link,
} from "react-router-dom";
import * as actions from "./actions";
import logo from './images/logo.png';

import "./NavBar.css";

class NavBar extends Component {
  render_profile() {
    const { auth, signOut } = this.props;

    return <Fragment>
      <li style={{float: "right"}}>
        <Link to={'/account'}>
          {auth.displayName || 'Account'}
        </Link>
      </li>
      <li style={{float: "right"}}>
        <Link to={'/'} onClick={signOut}>Sign Out</Link>
      </li>
    </Fragment>
  }
  render_signin() {
    return <Fragment>
      <li style={{float: "right"}}>
        <Link to={'/signin'}>SignIn</Link>
      </li>

      <li style={{float: "right"}}>
        <Link to={'/signup'}>SignUp</Link>
      </li>
    </Fragment>
  }

  render() {
    const { data, auth, signOut, signIn } = this.props;
    return (
      <nav>
        <ul>
          <li><Link to={'/'}><img src={logo} height={35}/></Link></li>
          <li><Link to={'/about'}>About</Link></li>
            {
              auth 
                ? this.render_profile()
                : this.render_signin()
            }
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = ({ data, auth }) => {
  return {
    data,
    auth
  };
};

export default connect(mapStateToProps, actions)(NavBar);