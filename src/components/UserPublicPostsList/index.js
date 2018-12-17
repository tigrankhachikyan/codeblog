import React, { Component } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListPostCard from "../ListPostCard";

import { 
  fetchCurrentUserPosts
} from "../../actions/currentChannel";

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

class UserPublicPostsList extends Component {
  state = {
    uid: null,
    userPosts: [],
  };

  async componentDidMount() {
    const { username } = this.props.match.params;
    const { fetchCurrentUserPosts } = this.props;

    const userPosts = await fetchCurrentUserPosts(username);
    this.setState({userPosts});
  }

  render() {
    const { classes, posts } = this.props;
    const { username } = this.props.match.params;
    if (!posts) return null;

    return (
      <div className={classes.root}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item
            xs={12}
            md={6}
          >
            <h2>Welcome to {username}'s channel</h2>
          {
            posts && posts.map((post, i) => {
              return <Grid>
                <ListPostCard post={post}/>
              </Grid>
            })
          }
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, currentChannel }) => {
  return { 
    auth,
    posts: currentChannel.posts
  };
};

export default connect(mapStateToProps, {
  fetchCurrentUserPosts
})(withStyles(styles)(UserPublicPostsList))