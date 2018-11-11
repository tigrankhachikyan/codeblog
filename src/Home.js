import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "./actions";

import './index.css';

class Home extends Component {
  
  componentDidMount() {
    const { data, fetchPosts } = this.props;
    if (data.latestPosts.length) return;
    fetchPosts();
  }

  render() {
    const { data } = this.props;
    console.log(data);
    return (
      <div className="Home">
        <h1>Code Blog</h1>
        <ul>
          {
            data.latestPosts.map((post, i) => {
              return <li key={i}>
                <div>
                  <Link to={`/posts/${post.postId}`}>{post.data.title}</Link>
                  <p>{post.data.body_markdown.substr(0, 50)}</p>
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
    data
  };
};

export default connect(mapStateToProps, actions)(Home);