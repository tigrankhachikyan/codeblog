import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography';

import ListPostCard from "./ListPostCard";

import {
  fetchLatestPosts,
  fetchMostLikedPosts
} from "../actions";

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
  async componentDidMount() {
    const { latestPosts, fetchLatestPosts, fetchMostLikedPosts } = this.props;
    if (!latestPosts.length) {
      await Promise.all([
        fetchLatestPosts(),
        fetchMostLikedPosts()
      ]);
    }
  }

  render() {
    const { classes } = this.props;
    const { latestPosts, mostLikedPosts } = this.props;

    if (!latestPosts.length) return null;

    return (
    <div className={classes.root}>
      <Grid
        container
        justify="flex-start"
        direction="row"
        alignItems="flex-start"
      >
        <Grid item md={6}>
          <Typography variant="h5">
            Latest Posts
          </Typography>
          
          <Grid>
          {
            latestPosts.length > 0 && latestPosts.map((post, i) => {
              return <ListPostCard key={post.postId} post={post.data}/>
            })
          }
          </Grid>
        </Grid>
        <Grid item md={6}>
          <Typography variant="h5">
            Most Liked
          </Typography>
          <Grid>
          {
            mostLikedPosts.length > 0 && mostLikedPosts.map((post, i) => {
              return <ListPostCard key={post.postId} post={post.data}/>
            })
          }
          </Grid>
        </Grid>
      </Grid>
    </div>
    );
  }
}

const mapStateToProps = ({ data }) => {
  return {
    latestPosts: data.latestPosts,
    mostLikedPosts: data.mostLikedPosts
  };
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {
  fetchLatestPosts,
  fetchMostLikedPosts
})(withStyles(styles)(Home));