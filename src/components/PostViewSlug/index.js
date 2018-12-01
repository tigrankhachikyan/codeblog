import React, { Component } from 'react';
import { connect } from "react-redux";
import { Markdown } from 'react-showdown';

import Spinner from '../utils/Spinner';

import { 
  fetchPostBodyById,
  fetchUserPostByUsernameAndSlug
} from "../../actions";

import "../../css/prism.css";

import './index.css';

class PostViewSlug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: null
    }
  }

  fetchPostData = async (username, slug) => {
    const result = /-([^-]+)$/.exec(slug);
    const postId = result[1];

    const [post, postBody] = await Promise.all([
      this.props.fetchUserPostByUsernameAndSlug(username, slug),
      this.props.fetchPostBodyById(postId)
    ]);

    return {
      postId: post.postId,
      ...post.data,
      ...postBody
    };
  }

  async componentDidMount() {
    const {username, slug} = this.props.match.params;
    try {
      const post = await this.fetchPostData(username, slug);
      this.setState({postData: post});
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="PostView">
        <div className="box">
        { 
          this.state.postData 
            ? <div>
                <h1>{this.state.postData.title}</h1>
                <Markdown markup={ this.state.postData.body_markdown } />
              </div>
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

export default connect(mapStateToProps, {
  fetchUserPostByUsernameAndSlug,
  fetchPostBodyById,
})(PostViewSlug);