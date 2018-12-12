import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Editor from "../Editor";

//import debounce from 'lodash/debounce';
import { loadPost, closeEditPost } from "../../../actions/editPost";

import './index.css';

class EditorController extends PureComponent {
  async componentDidMount() {
    const postId = this.props.match.params.id;

    try {
      await this.props.loadPost(this.props.uid, postId);
    } catch(e) {
      console.log("Error:", e);
    }
  }
  componentWillUnmount() {
   this.props.closeEditPost(); 
  }
  render() {
    const post = this.props.editPost;

    if (post.error !== null) {
      return <h2> Error: {post.error}</h2>
    }
    if (post.loading) {
      return <LinearProgress />
    }

    return (
      <div>
      { post.loading && <LinearProgress /> }
      { 
        post.loading === false && post.error === null &&
        <Editor postId={post.header.postId}/>
      }
      </div>
    );
  }
}

const mapStateToProps = ({ auth, editPost }) => {
  return {
    uid: auth.uid,
    editPost,
  };
};

export default connect(mapStateToProps, {
  loadPost,
  closeEditPost
})(EditorController);