import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";

import  { fetchUser, signOut } from "./actions/auth";

import Home from "./components/Home";
import About from "./components/About";
import NavBar from "./components/NavBar";
import PostViewSlug from "./components/PostViewSlug";
import Toasts from "./components/Toasts";

import UserPublicPostsList from "./components/UserPublicPostsList";

import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import ForgetPassword from "./auth/ForgetPassword";
import requireAuth from "./auth/requireAuth";
import UserSettings from "./components/Account/UserSettings";
import Account from "./components/Account";

import './index.css';

class App extends PureComponent {

  async componentDidMount() {
    if (this.props.auth) return;
    try {
      await this.props.fetchUser();
    } catch(err) {
      console.log("Failed to fetch user info", err);
    }
  }


  render() {
    const { auth, signOut } = this.props;

    return (
      <Router>
        <div>
          <NavBar />
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/account" component={requireAuth(Account)}/>

            <Route exact path="/about"   component={About} />
            <Route exact path="/signin"  component={SignIn}/>
            <Route exact path="/forget-password" component={ForgetPassword}/>
            <Route exact path="/signup"  component={SignUp}/>
            <Route exact path="/@:username" component={UserPublicPostsList} />
            <Route exact path="/@:username/:slug" component={PostViewSlug} />
            <Route exact path="/post/:slug"       component={PostViewSlug} />

            <Route exact path="/user-settings" component={requireAuth(UserSettings)}/>

            <Route path="/signout" render={() => {
              if (auth) {
                signOut();
              }
              return <Redirect to={'/'}/>
            }}/>

          </div>
          <Toasts />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, {
  signOut,
  fetchUser,
})(App);
