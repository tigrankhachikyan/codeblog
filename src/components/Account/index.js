import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import * as actions from "../../actions";

import DashBoard from './DashBoard';
import Editor from './Editor';
import Modal from '../utils/Modal';

import './index.css';

class Account extends Component {
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
          <Route path={`/account/edit/:id`} component={Editor}/>
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(Account);