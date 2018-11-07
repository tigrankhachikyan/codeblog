import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../actions";

class Editor extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <h1>Editor</h1>
        <p>{this.props.match.params.id}</p>
      </div>
    );
  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(Editor);