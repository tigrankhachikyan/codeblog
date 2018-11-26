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

  // fetchPostData = async (username, slug) => {
  //   const {fetchPostById, fetchPostBodyById} = this.props;
    
  //   const [post, postBody] = await Promise.all([
  //     fetchUserPostByUsernameAndSlug(postId),
  //     fetchPostBodyById(postId)
  //   ]);

  //   return {...post, ...postBody};
  // }

  async componentDidMount() {
    const {username, slug} = this.props.match.params;

    const {
      fetchPostBodyById,
      fetchUserPostByUsernameAndSlug
    } = this.props;

    try {
      const post = await fetchUserPostByUsernameAndSlug(username, slug);
      const postBody = await fetchPostBodyById(post.postId);
      this.setState({postData: {
        postId: post.postId,
        ...post.data,
        ...postBody
      }});
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

export default connect(mapStateToProps, {
  fetchUserPostByUsernameAndSlug,
  fetchPostBodyById,
})(PostViewSlug);