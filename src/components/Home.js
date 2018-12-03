import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { connect } from "react-redux";

import ListPostCard from "./ListPostCard";

import {fetchPosts} from "../actions";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    height: 240,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
    color: theme.palette.text.secondary,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});


class Home extends Component {
  componentDidMount() {
    const { latestPosts, fetchPosts } = this.props;
    if (!latestPosts.length) {
      fetchPosts();
    }
  }

  render() {
    const { classes } = this.props;
    const { latestPosts } = this.props;

    if (!latestPosts.length) return null;

    return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
      >
        {
          latestPosts.length > 0 && latestPosts.map((post, i) => {
            return <Grid key={post.postId}
              item 
              xs={12}
              style={{margin: 10}}
            >
              <ListPostCard post={post}/>
            </Grid>
          })
        }
      </Grid>
    </div>
    );
  }
}

const mapStateToProps = ({ data }) => {
  return {
    latestPosts: data.latestPosts
  };
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {fetchPosts})(withStyles(styles)(Home));