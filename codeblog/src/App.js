import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "./actions";

import './index.css';

class App extends Component {
  
  componentWillMount() {
    console.log(this.props);
    this.props.fetchPosts();
  }

  render() {
    const { data } = this.props;
    return (
      <div className="App">
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

export default connect(mapStateToProps, actions)(App);