import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";

import  {fetchUser} from "./actions";
import {
  loadUserSettings,
  assignUserDefaultSettings
} from "./actions/modules/userSettings";

import Account from "./components/Account";

import requireAuth from "./auth/requireAuth";

import SignIn from "./auth/SignIn";
import Home from "./components/Home";
import About from "./components/About";
import NavBar from "./components/NavBar";
import PostView from "./components/PostView";
import PostViewSlug from "./components/PostViewSlug";
import UserPublicPostsList from "./components/UserPublicPostsList";
import UserSettings from "./components/Account/UserSettings"

import Toasts from "./components/Toasts";

import './index.css';

class App extends Component {

  async componentDidMount() {
    if (this.props.auth) return;
    try {
      await this.props.fetchUser();
      await this.loadUserSettings();
    } catch(err) {
      console.log(err);
      console.log("Failed to fetch user info");
    }
  }

  loadUserSettings = async () => {
    const { auth, settings } = this.props;
    if (settings.USER_NAME) return;

    try {
      await this.props.assignUserDefaultSettings(auth, {
        USER_NAME: auth.email.replace(/@.*$/, '')
      })
    } catch {
      console.log(auth);
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
            <Route exact path="/@:username" component={UserPublicPostsList} />
            <Route exact path="/@:username/:slug" component={PostViewSlug} />

            <Route exact path="/posts/:id" component={PostView} />
            <Route path="/about" component={About} />
            <Route path="/signin" component={SignIn}/>
            <Route path="/account" component={requireAuth(Account)}/>
            <Route path="/user-settings" component={requireAuth(UserSettings)}/>

            <Route path="/signout" render={() => {
              if (auth) {
                signOut();
              }
              return <Redirect to="/"/>
            }}/>
          </div>
          <Toasts />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ auth, settings }) => {
  return { auth, settings };
};

export default connect(mapStateToProps, {
  fetchUser,
  loadUserSettings,
  assignUserDefaultSettings
})(App);
