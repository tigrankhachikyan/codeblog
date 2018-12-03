import React, { Component } from 'react';
import { Route } from "react-router-dom";

import DashBoard from './DashBoard';
import Editor from './Editor';

export default class Account extends Component {
  render() {
    return (
      <div>
        <Route exact path={`/account/`} component={DashBoard}/>
        <Route exact path={'/account/edit/:id'} component={Editor}/>
      </div>
    );
  }
}