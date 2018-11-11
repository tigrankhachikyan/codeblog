
import PropTypes from "prop-types";
import React, { Component } from "react";

class Toast extends Component {
  render() {
    return (
      <li className="toast" style={{ backgroundColor: this.props.color }}>
        <p className="toast__content">
          {this.props.text}
        </p>
        <button className="toast__dismiss" onClick={this.props.onDismissClick}>
          x
        </button>
      </li>
    );
  }
  // In our application toast notifications can't be changed once they are created,
  // so we're just going to return false for shouldComponentUpdate to prevent
  // unnecessary rendering when a new toast is added/removed from the collection.
  shouldComponentUpdate() {
    return false;
  }
}

Toast.propTypes = {
  color: PropTypes.string,
  onDismissClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default Toast;