import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import {
  NavLink
} from "react-router-dom";
import * as actions from "./actions";
import logo from './images/logo.png';

import "./NavBar.css";

class NavBar extends Component {
  render_profile() {
    const { auth, signOut } = this.props;

    return <Fragment>
      <li style={{float: "right"}}>
        <NavLink to={'/account'}>
          {auth.displayName || 'Account'}
        </NavLink>
      </li>
      <li style={{float: "right"}}>
        <NavLink to={'/'} onClick={signOut}>Sign Out</NavLink>
      </li>
    </Fragment>
  }
  render_signin() {
    return <Fragment>
      <li style={{float: "right"}}>
        <NavLink to={'/signin'}>SignIn</NavLink>
      </li>

      <li style={{float: "right"}}>
        <NavLink to={'/signup'}>SignUp</NavLink>
      </li>
    </Fragment>
  }

  render() {
    const { auth } = this.props;
    return (
      <nav>
        <ul>
          <li><NavLink to={'/'}><img src={logo} height={35}/></NavLink></li>
          <li><NavLink to={'/about'}>About</NavLink></li>
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

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(mapStateToProps, actions)(NavBar);