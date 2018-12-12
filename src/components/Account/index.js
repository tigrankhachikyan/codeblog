import React, { Component } from 'react';
import { Route } from "react-router-dom";

import DashBoard from './DashBoard';
import Bookmarks from './Bookmarks';
import EditorController from './EditorController';

export default class Account extends Component {
  render() {
    return (
      <div>
        <Route exact path={`/account/`} component={DashBoard}/>
        <Route exact path={`/account/bookmarks`} component={Bookmarks}/>
        <Route exact path={'/account/edit/:id'} component={EditorController}/>
      </div>
    );
  }
}