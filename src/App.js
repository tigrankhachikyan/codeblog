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

import SignIn from "./auth/SignIn";
import Home from "./Home";
import About from "./About";
import NavBar from "./NavBar";
import PostView from "./components/PostView";

import Toasts from "./components/Toasts";

import './index.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faFile, faColumns, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add([faSave,faFile, faColumns, faTimes]);

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