import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from '../../utils/Modal';
import UserInfo from '../../../helpers/UserInfo';

import FloatingBottomToolbox from '../../utils/FloatingBottomToolbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import * as actions from "../../../actions";
import { userSettingsRef } from '../../../config/firebase';

class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      slug: "",
      slugChanged: false,
      
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

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value,
      slug: this.state.slugChanged 
        ? this.state.slug 
        : e.target.value.replace(/\s+/g, '-').toLowerCase()
    })
  }

  handleSlugChange = (e) => {
    if (e.target.value) {
      this.setState({
        slugChanged: true,
        slug: e.target.value,
      });
    } else {
      this.setState({
        slugChanged: false,
      });
    }
  }

  handleCancel = (e) => {
    this.setState({title: "", slug: ""});
    this.hideModal();
  }

  handleCreate = (e) => {
    const { createPost } = this.props;
    const { uid, auth, settings } = this.props;
    e.preventDefault();

    const userInfo = new UserInfo(auth, settings);
    console.log(userInfo.userInfo())
    const data = {
      title: this.state.title,
      slug: this.state.slug,
      date_created: new Date(),
      uid: uid,
      user: userInfo.userInfo()
    };
    createPost(data).then((postId) => {
      this.props.history.push(`/account/edit/${postId}`);
    })
  }

  render() {
    const actions = [
      {
        title: "Create New Post",
        icon: "file",
        action: this.showModal
      }
    ];

    return (
      <div className="container">
        <h1>DashBoard</h1>

        <Modal show={this.state.showDialog} handleClose={this.hideModal}>
        <ul>
            <li>
              <label>
                Title:
                <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
              </label>
            </li>
            <li>
              <label>
                Slug:
                <input type="text" value={this.state.slug} onChange={this.handleSlugChange}
                 />
              </label>
            </li>
            <li>
              <button onClick={this.handleCreate}>Create</button>
              <button onClick={this.handleCancel}>Cancel</button>
            </li>
          </ul>
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

const mapStateToProps = ({ data, auth, settings }) => {
  return {
    settings,
    auth,
    uid: auth.uid,
    userPosts: data.userPosts
  };
};

export default connect(mapStateToProps, actions)(DashBoard);