import React, { Component } from 'react';
import { connect } from "react-redux";
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {
  updateUserSettings,
} from "../../../actions/modules/userSettings";

import isEqual from 'lodash/isEqual';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: "50vw"
  },
  button: {
    margin: theme.spacing.unit * 3,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});


class UserSettings extends Component {
  state = {
    settings: this.props.settings,
    settingsChanged: false,
  }

  render() {
    const { classes } = this.props;
    const { settings } = this.state;

    if (!Object.keys(settings).length) return null;

    return (
      <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        alignContent="center"
      >
      <Grid item xs={8}>
        <Typography variant="h3" gutterBottom>
          User Settings
         </Typography>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Setting</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* USER_NAME */}
              <TableRow className={classes.row}>
                <TableCell>
                  User Name
                </TableCell>
                <TableCell>
                  <TextField
                    defaultValue={settings.USER_NAME}
                    onChange={(e) => {this.setState({settings: {...this.state.settings, USER_NAME: e.target.value}})}}
                  />
                </TableCell>
              </TableRow>

              {/* AUTO_SAVE_DRAFT */}
              <TableRow className={classes.row}>
                <TableCell>
                  Auto Save?
                </TableCell>
                <TableCell>
                  <Switch
                    checked={settings.AUTO_SAVE_DRAFT}
                    onChange={(e) => {this.setState({settings: {...this.state.settings, AUTO_SAVE_DRAFT: e.target.checked}})}}
                    color="primary"
                  />
                </TableCell>
              </TableRow>

              {/* AUTO_SAVE_DRAFT_INTERVAL */}
              <TableRow className={classes.row}>
                <TableCell>
                  Auto Save?
                </TableCell>
                <TableCell>
                  <TextField
                    label="Seconds"
                    value={settings.AUTO_SAVE_DRAFT_INTERVAL / 1000}
                    onChange={(e) => {this.setState({settings: {...this.state.settings, AUTO_SAVE_DRAFT_INTERVAL: e.target.value * 1000}})}}
                    type="number"
                    disabled={!settings.AUTO_SAVE_DRAFT}
                  />
                  </TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </Paper>
        </Grid>
          {
            ! isEqual(settings, this.props.settings) &&
            <div>
              <Button 
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {this.props.updateUserSettings(this.props.uid, this.state.settings)}}
              >
                Save Changes
              </Button>
              <Button 
                variant="contained" 
                color="secondary" 
                className={classes.button}
                onClick={() => {this.setState({settings: this.props.settings})}}
              >
                Discard Changes
              </Button>
            </div>
          }
        </Grid>
        </div>
    );
  }
}

const mapStateToProps = ({ auth, settings }) => {
  return {
    uid: auth.uid,
    settings
  };
};

export default connect(mapStateToProps, {
  updateUserSettings, 
})( withStyles(styles)(UserSettings));
