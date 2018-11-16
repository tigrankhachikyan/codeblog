import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Markdown } from 'react-showdown';
import FloatingBottomToolbox from '../utils/FloatingBottomToolbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Spinner from '../utils/Spinner';

import Prism from "prismjs";
import "../../css/prism.css";

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
      <div className="PostView">
        <div className="box">
        { 
          this.state.post 
            ? <div>
                <h1>{this.state.post.title}</h1>
                <Markdown markup={ this.state.post.body_markdown } />
              </div>
            //? <pre>{ this.state.post.body_markdown } </pre>
            : <Spinner />
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