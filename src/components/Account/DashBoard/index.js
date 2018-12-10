import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
});

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
        : e.target.value.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()
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
    const { classes } = this.props;

    const actions = [
      {
        title: "Create New Post",
        icon: <AddBoxIcon />,
        action: this.showModal
      }
    ];

    return (
      <div className={classes.root}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          alignContent="center"
        >
          <Typography variant="h3" gutterBottom>
            DashBoard
          </Typography>
          <Grid item xs={12} md={8}>
              <UserPostsTable 
                posts={this.props.userPosts} 
                editPost={(postId) => this.editPost(postId)}
                removePost={(postId) => this.removePost(postId)}
              />
          </Grid>
          <Modal show={this.state.showDialog} handleClose={this.hideModal}  className='modal-contaner' >
            <ul className='modal-contaner'>
              <li>
                <label>
                  Title:
                  <input type="text" value={this.state.title} onChange={this.handleTitleChange}  className='modal-input' />
                </label>
              </li>
              <li>
                <label>
                  Slug:
                  <input  disabled={true} className='modal-input' type="text" value={this.state.slug} onChange={this.handleSlugChange }
                  />
                </label>
              </li>
              <li>

                <label>
                Excerpt:
                  <input className='excerpt-input' 
                  placeholder = 'Add excerpt' 
                  value={this.state.excerpt}  
                  onChange={e => this.setState({excerpt: e.target.value})} />
                  {/* <textarea
                    className='modal-input' 
                    placeholder = 'Add excerpt' 
                    value={this.state.excerpt}  
                    onChange={e => this.setState({excerpt: e.target.value})}
                  /> */}
                </label>
              </li>
              <li>
                <button className='creat-cancel' onClick={this.handleCreate}>Create</button>
                <button className='creat-cancel' onClick={this.handleCancel}>Cancel</button>
              </li>
            </ul>
          </Modal>
          
          <FloatingBottomToolbox 
            actions={actions}
          />
        </Grid>
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
})(withStyles(styles)(DashBoard)));