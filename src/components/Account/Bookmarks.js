import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListPostCard from "../ListPostCard";

import {
  fetchUserBookmarks
} from "../../actions";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
});

class Bookmarks extends Component {
  async componentDidMount() {
    await this.props.fetchUserBookmarks(this.props.uid);
  }

  render() {
    const { classes, userBookmarks } = this.props;
    
    return (
      <div className={classes.root}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          alignContent="center"
        >
          <Typography variant="h3" gutterBottom>
            Bookmarks
          </Typography>
          {
            userBookmarks.length > 0 && userBookmarks.map((bookmark, i) => {
              return <ListPostCard post={bookmark.post} />
            })
          }
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, data }) => {
  return {
    uid: auth.uid,
    userBookmarks: data.userBookmarks
  };
};

export default withRouter(connect(mapStateToProps, {
  fetchUserBookmarks
})(withStyles(styles)(Bookmarks)));