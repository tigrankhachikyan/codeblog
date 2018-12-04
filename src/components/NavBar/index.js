import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import {
  withRouter
} from "react-router-dom";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';

import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import * as actions from "../../actions";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class NavBar extends Component {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth } = this.props;

    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton
              onClick={() => this.props.history.push('/')}
              color="inherit"
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              ```Code Blog```
            </Typography>
            {auth ? (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                {
                  this.props.auth.photoURL 
                    ? <Avatar alt={this.props.auth.displayName} src={this.props.auth.photoURL} className={classes.avatar} />
                    : <AccountCircle />
                }
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={() => {
                    this.props.history.push('/account');
                    this.handleClose();
                  }}>My account</MenuItem>
                  <MenuItem onClick={() => {
                    this.props.history.push('/user-settings');
                    this.handleClose();
                  }}>Settings</MenuItem>
                  <MenuItem onClick={this.props.signOut}>Sign Out</MenuItem>
                </Menu>
              </div>
            )
          :
            <Fragment>
              <Button color="inherit" onClick={() => this.props.history.push('/signup')}>SignUp</Button>
              <Button color="inherit" onClick={() => this.props.history.push('/signin')}>Login</Button>
            </Fragment>
          }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default withRouter(
  connect(mapStateToProps, actions)(withStyles(styles)(NavBar))
)

