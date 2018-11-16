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
  componentDidMount() {
    const postId = this.props.match.params.id;
    this.props.fetchPostById(postId).then(doc => {
      this.setState({ post: doc });
      Prism.highlightAll();
    });
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
            ? <Markdown markup={ this.state.post.body_markdown } />
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