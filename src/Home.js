import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "./actions";

import { Button } from 'react-bootstrap';

import './index.css';

class Home extends Component {
  
  componentDidMount() {
    const { data, fetchPosts } = this.props;
    if (data.latestPosts.length) return;
    fetchPosts();
  }

  render() {
    const { data } = this.props;
    return (
      <div className="Home">
        <h1>Code Blog</h1>
        <ul>
          {
            data.latestPosts.map((post, i) => {
              return <li key={i}>
                <div>
                  <h3>{post.data.title}</h3>
                  <p>{post.data.body_markdown}</p>
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