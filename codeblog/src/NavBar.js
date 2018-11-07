import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Link,
} from "react-router-dom";
import * as actions from "./actions";
import "./NavBar.css";

class NavBar extends Component {
  render() {
    const { data, auth, signOut, signIn } = this.props;
    return (
      <nav>
        <ul>
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/about'}>About</Link></li>
          {
            auth && <li><Link to={'/account'}>Account</Link></li>
          }
          {
            !auth && <li><Link to={'/signin'}>SignIn</Link></li>
          }
          {
            auth && <li><a onClick={signOut}>Sign Out</a></li>
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