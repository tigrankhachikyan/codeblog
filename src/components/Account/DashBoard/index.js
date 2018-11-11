import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from '../../utils/Modal';

import FloatingBottomToolbox from '../../utils/FloatingBottomToolbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import * as actions from "../../../actions";

class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
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
    const actions = [
      <a className="round-button" onClick={this.showModal}>
        <FontAwesomeIcon icon="file" />
      </a>,
    ];

    return (
      <div>
        <h1>DashBoard</h1>

        <Modal show={this.state.showDialog} handleClose={this.hideModal}>
          Title: <input />
        </Modal>
        
        <FloatingBottomToolbox 
          actions={actions}
        />

        <ul>
          {
            data.latestPosts.map((post, i) => {
              return <li key={i}>
                <div>
                  <h3><Link to={`/account/edit/${post.postId}`}>{post.data.title}</Link></h3>
                  <p>{post.data.body_markdown}</p>
                </div>
              </li>
            })
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(DashBoard);