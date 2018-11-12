import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Markdown } from 'react-showdown';
import FloatingBottomToolbox from '../utils/FloatingBottomToolbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Spinner from '../utils/Spinner';

import Prism from "prismjs";
import "../../css/prism.css";
import PostBody from './PostBody';
import Tools from './Tools';
import Comments from  './Comments';

import './index.css';

class PostView extends Component {
  constructor() {
    super();
    this.state = {
      post: null
    }
  }

  fetchPostData = async (postId) => {
    const {fetchPostById, fetchPostBodyById} = this.props;

    const [post, postBody] = await Promise.all([
      fetchPostById(postId),
      fetchPostBodyById(postId)
    ]);

    return {...post, ...postBody};
  }

  componentDidMount() {
    const postId = this.props.match.params.id;

    this.fetchPostData(postId)
      .then(post => this.setState({post}))
      // Highlight syntax after content is loaded
      .then(() => setTimeout(() => Prism.highlightAll(), 0));
  }

  componentDidUpdate(prevProps) {
    const postId = this.props.match.params.id;
    if (prevProps.match.params.id !== postId ) {
      this.props.fetchPostById(postId).then(doc => {
        this.setState({ post: doc });
      });
    }
  }

  render() {
    return (
      <div>
        <div  className = 'app'>
        <div className = 'test'>
            <Tools/>
        { this.state.post
          ? <PostBody
              title={this.state.post.title}
              body={<Markdown markup={ this.state.post.body_markdown } />}
            />
          : <Spinner />
        }
        </div>
            <Comments/>
        </div>

        < hr/>
        <div className="container">
          {
            this.state.post && <Markdown markup={ this.state.post.body_markdown } />
          }
        </div>
      </div>
    );
  }
}

// TODO. do we need redux here??
const mapStateToProps = ({ auth }) => {
  return { };
};

export default connect(mapStateToProps, actions)(PostView);
