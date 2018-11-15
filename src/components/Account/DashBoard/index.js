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
      userPosts: []
    }
  }
  componentDidMount() {
    const { fetchUserPosts, uid } = this.props;
    fetchUserPosts(uid).then(posts => {
      this.setState({userPosts: posts});
    })
  }
  showModal = () => {
    this.setState({ showDialog: true });
  };

  hideModal = () => {
    this.setState({ showDialog: false });
  };

  render() {
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
            this.state.userPosts.map((post, i) => {
              return <li key={i}>
                <div>
                  <h3><Link to={`/account/edit/${post.postId}`}>{post.title}</Link></h3>
                  <p>{post.body_markdown.substr(0,50) + "..."}</p>
                </div>
              </li>
            })
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    uid: auth.uid
  };
};

export default connect(mapStateToProps, actions)(DashBoard);