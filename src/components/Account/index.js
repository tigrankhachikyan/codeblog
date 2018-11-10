import React, { Component } from 'react';
import { Route } from "react-router-dom";

import DashBoard from './DashBoard';
import Editor from './Editor';
import Modal from '../utils/Modal';

import './index.css';

export default class Account extends Component {
  constructor() {
    super();
    this.state = {
      activeWindow: 'dashboard',
      showDialog: false,
    }
  }
  showModal = () => {
    this.setState({ showDialog: true });
  };

  hideModal = () => {
    this.setState({ showDialog: false });
  };

  render() {
    const { data } = this.props;
    return (
      <div className="Account">
        <aside className="toolbox">
          <button>Dashboard</button>
          <button onClick={this.showModal}>New Post</button>
        </aside>
        <main>
          <Modal show={this.state.showDialog} handleClose={this.hideModal}>
            Title: <input />
          </Modal>

          <Route exact path={`/account/`} component={DashBoard}/>
          <Route exact path={'/account/edit/:id'} component={Editor}/>
        </main>
      </div>
    );
  }
}