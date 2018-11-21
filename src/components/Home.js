import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../actions";

class Home extends Component {
  
  componentDidMount() {
    const { latestPosts, fetchPosts } = this.props;
    if (latestPosts.length) return;
    fetchPosts();
  }

  render() {
    const { latestPosts } = this.props;
    return (
      <div className="Home">
        <h1>Code Blog</h1>
        <ul>
          {
            latestPosts.map((post, i) => {
              return <li key={i}>
                <div>
                  <Link to={`/posts/${post.postId}`}>{post.data.title}</Link>
                </div>
              </li>
            })
          }
        </ul>

      </div>
    );
  }
}

const mapStateToProps = ({ data }) => {
  return {
    latestPosts: data.latestPosts
  };
};

export default connect(mapStateToProps, actions)(Home);