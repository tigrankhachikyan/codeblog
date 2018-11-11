import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Markdown } from 'react-showdown';
import FloatingBottomToolbox from '../utils/FloatingBottomToolbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//import './index.css';

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
    console.log(this.state);
    return (
      <div className="container">
        {
          this.state.post && <Markdown markup={ this.state.post.body_markdown } />
        }
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { };
};

export default connect(mapStateToProps, actions)(PostView);