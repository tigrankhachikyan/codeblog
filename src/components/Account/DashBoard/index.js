import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from '../../utils/Modal';

import FloatingBottomToolbox from '../../utils/FloatingBottomToolbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import * as actions from "../../../actions";
import dataReducer from '../../../reducers/dataReducer';

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
    if (this.props.userPosts.length) return;
    fetchUserPosts(uid);
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
      <div className="container">
        <h1>DashBoard</h1>

        <Modal show={this.state.showDialog} handleClose={this.hideModal}>
          Title: <input />
        </Modal>
        
        <FloatingBottomToolbox 
          actions={actions}
        />

        <table>
          <tbody>
          {
            this.props.userPosts.map((post, i) => {
              return <tr key={i}>
                <td>
                  <Link to={`/posts/${post.postId}`}>{post.title}</Link>
                </td>
                {/* <td>
                  <Link to={`/posts/${post.postId}`}>{post.excerpt}</Link>
                </td> */}
                <td>
                  <Link 
                    style={{marginLeft: 10}}
                    to={`/account/edit/${post.postId}`}
                  >
                    <FontAwesomeIcon icon="edit" />
                  </Link>
                </td>
              </tr>
            })
          }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ data, auth }) => {
  return {
    uid: auth.uid,
    userPosts: data.userPosts
  };
};

export default connect(mapStateToProps, actions)(DashBoard);