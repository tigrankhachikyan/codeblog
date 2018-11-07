import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "./actions";

import './index.css';

class Home extends Component {
  
  componentWillMount() {
    const { data, fetchPosts } = this.props;
    if (data.latestPosts.length) return;
    fetchPosts();
  }

  render() {
    const { data } = this.props;
    return (
      <div className="Home">
        <h1>Code Blog</h1>
        <pre>
          {
            JSON.stringify(data, null, 2)
          }
        </pre>
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