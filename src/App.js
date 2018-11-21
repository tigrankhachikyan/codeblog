import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";

import * as actions from "./actions";

import Account from "./components/Account";
import DashBoard from "./components/Account/DashBoard";

import requireAuth from "./auth/requireAuth";

import SignIn from "./auth/SignIn";
import Home from "./components/Home";
import About from "./components/About";
import NavBar from "./components/NavBar";
import PostView from "./components/PostView";
import UserSettings from "./components/Account/UserSettings"

import Toasts from "./components/Toasts";

import './index.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faFile, faColumns, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

library.add([faSave,faFile, faColumns, faTimes, faEdit]);

class App extends Component {
  
  componentDidMount() {
    const { auth } = this.props;
    if (auth) return;

    this.props.fetchUser();
  }

  render() {
    const { auth, signOut } = this.props;
    return (
      <Router>
        <div>
          <NavBar />
          <div>
            <Route exact path="/" component={Home} />
            {/* <Route exact path="/:uid/:slug" render={(props) => {
              const uid = props.match.params.uid;
              const slug = props.match.params.slug;
              fetchUserPostBySlug(uid, slug).then(post => {

              })
            }} /> */}
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

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, actions)(App);