import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography';

import ListPostCard from "./ListPostCard";

import {fetchLatestPosts} from "../actions";

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
    const { latestPosts, fetchLatestPosts } = this.props;
    if (!latestPosts.length) {
      fetchLatestPosts();
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
        justify="flex-start"
        direction="row"
        alignItems="flex-start"
        style={{flexWrap: "wrap"}}
      >
        <Grid item md={8} style={{
          display: "flex",
          flexWrap: "wrap",
        }}>
        {
          latestPosts.length > 0 && latestPosts.map((post, i) => {
            return <ListPostCard key={post.postId} post={post.data}/>
          })
        }
        </Grid>
        <Grid item md={4}>
        </Grid>
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

export default connect(mapStateToProps, {
  fetchLatestPosts
})(withStyles(styles)(Home));