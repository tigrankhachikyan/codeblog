import React, { Component } from 'react';
import { connect } from "react-redux";

import * as actions from "../../actions";

class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    return (
      <div>
        <h2>User Settings</h2>
      </div>
    );
  }
}

const mapStateToProps = ({ data }) => {
  return {
    
  };
};

export default connect(mapStateToProps, actions)(UserSettings);