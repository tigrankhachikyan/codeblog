import React, { Component } from 'react';
import { Route } from "react-router-dom";

import DashBoard from './DashBoard';
import Editor from './Editor';

import './index.css';

export default class Account extends Component {
  constructor() {
    super();
    this.state = {
      activeWindow: 'dashboard',
    }
  }
  render() {
    const { data } = this.props;
    return (
      <div className="Account">
        <main>
          <Route exact path={`/account/`} component={DashBoard}/>
          <Route exact path={'/account/edit/:id'} component={Editor}/>
        </main>
      </div>
    );
  }
}