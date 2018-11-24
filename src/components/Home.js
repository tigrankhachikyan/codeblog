import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../actions";

class Home extends Component {
  
  componentDidMount() {
    const { latestPosts, fetchPosts } = this.props;
    if (!latestPosts.length) {
      fetchPosts();
    }
  }

  render() {
    const { latestPosts } = this.props;
    if (!latestPosts.length) return null;

    return (
      <div className="Home">
        <h1>Code Blog</h1>
        <ul>
          {
            latestPosts.length > 0 && latestPosts.map((post, i) => {
              const {userName} = post.data.user;
              return <li key={i}>
                <div style={{
                  height: 50,
                  widows: 200,
                  marginBottom: 10,
                }}>
                  <Link to={`/@${userName}/${post.data.slug}`}>{post.data.title}</Link>
                  <p>Published by <Link to={`/@${userName}`}>@{userName}</Link></p>
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