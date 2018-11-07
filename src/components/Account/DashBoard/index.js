import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../actions";

class DashBoard extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <h1>DashBoard</h1>
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