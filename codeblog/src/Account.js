import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "./actions";

import './index.css';

class Account extends Component {
  
  // componentWillMount() {
  //   this.props.fetchPosts();
  // }

  render() {
    const { data } = this.props;
    return (
      <div className="Home">
        <h1>Code Blog</h1>
        <h1>Account</h1>
      </div>
    );
  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(Account);