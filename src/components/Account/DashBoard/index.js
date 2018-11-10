import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../../../actions";

class DashBoard extends Component {
  render() {
    const { data } = this.props;
    console.log(this.props);
    return (
      <div>
        <h1>DashBoard</h1>
        <ul>
          {
            data.latestPosts.map((post, i) => {
              return <li key={i}>
                <div>
                  <h3><Link to={`/account/edit/${post.postId}`}>{post.data.title}</Link></h3>
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

export default connect(mapStateToProps, actions)(DashBoard);