import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import * as actions from "./actions";

import Account from "./components/Account";
import DashBoard from "./components/Account/DashBoard";
import Editor from "./components/Account/Editor";

import requireAuth from "./auth/requireAuth";

import SignIn from "./SignIn";
import Home from "./Home";
import About from "./About";
import NavBar from "./NavBar";

import './index.css';

class App extends Component {
  
  componentWillMount() {
    const { auth } = this.props;
    if (auth) return;

    this.props.fetchUser();
  }

  render() {
    const { data, auth, signOut, signIn } = this.props;
    return (
      <Router>
        <div>
          <NavBar />
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/signin" component={SignIn}/>
            <Route path="/account" component={requireAuth(Account)}/>
            <Route path="/account/editor" component={requireAuth(Editor)}/>

            <Route path="/signout" render={() => {
              if (auth) {
                signOut();
              }
              return <Redirect to="/"/>
            }}/>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ data, auth }) => {
  return {
    data,
    auth
  };
};

export default connect(mapStateToProps, actions)(App);