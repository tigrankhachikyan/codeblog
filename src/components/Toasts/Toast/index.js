
import PropTypes from "prop-types";
import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class Toast extends Component {
  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={true}
        autoHideDuration={8 * 1000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.props.text}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.props.onDismissClick}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
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