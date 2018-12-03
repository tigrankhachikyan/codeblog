import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Modal from '../../utils/Modal';
import UserInfo from '../../../helpers/UserInfo';
import AddBoxIcon from '@material-ui/icons/AddBox';

import FloatingBottomToolbox from '../../utils/FloatingBottomToolbox';

import {
  createPost,
  fetchUserPosts,
  deletePostById
} from "../../../actions";

import UserPostsTable from './UserPostsTable';

class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      slug: "",
      excerpt: "",
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

    const data = {
      title: this.state.title,
      slug: this.state.slug,
      excerpt: this.state.excerpt,
      date_created: new Date(),
      uid: uid,
      user: userInfo.userInfo()
    };
    createPost(data).then((postId) => {
      this.props.history.push(`/account/edit/${postId}`);
    })
  }

  editPost = (postId) => {
    this.props.history.push(`/account/edit/${postId}`)
  }
  
  removePost = (postId) => {
    window.confirm("Are you sure you want to remove the post") &&
    this.props.deletePostById(postId);
  }
  
  render() {
    const actions = [
      {
        title: "Create New Post",
        icon: <AddBoxIcon />,
        action: this.showModal
      }
    ];

    return (
      <div className="container center">
        <h1>DashBoard</h1>
        <UserPostsTable 
          posts={this.props.userPosts} 
          editPost={(postId) => this.editPost(postId)}
          removePost={(postId) => this.removePost(postId)}
        />

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
                <input type="text" disabled value={this.state.slug} onChange={this.handleSlugChange}
                 />
              </label>
            </li>
            <li>
              <label>
              Excerpt:
                <textarea 
                  placeholder = 'Add excerpt' 
                  value={this.state.excerpt}  
                  onChange={e => this.setState({excerpt: e.target.value})}
                > </textarea>
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

export default withRouter(connect(mapStateToProps, {
  createPost,
  fetchUserPosts,
  deletePostById
})(DashBoard));