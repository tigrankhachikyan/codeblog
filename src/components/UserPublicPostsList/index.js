import React, { Component } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListPostCard from "../ListPostCard";

import { getUserByUserName } from "../../actions/modules/userSettings";
import { fetchUserPosts } from "../../actions";

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
    const {username} = this.props.match.params;
    const {getUserByUserName, fetchUserPosts} = this.props;

    const user = await getUserByUserName(username);
    const userPosts = await fetchUserPosts(user.uid);
    this.setState({userPosts});
  }

  render() {
    const { classes } = this.props;
    const { username } = this.props.match.params;

    if (!this.state.userPosts.length) return null;

    return (
      <div className={classes.root}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <h2>Welcome to {username}'s channel</h2>
          {
            this.state.userPosts.length > 0 && this.state.userPosts.map((post, i) => {
              return <Grid key={post.postId}
                item 
                xs={12}
                style={{margin: 10}}
              >
                <ListPostCard post={{data: post}}/>
              </Grid>
            })
          }
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, {
  getUserByUserName,
  fetchUserPosts
})(withStyles(styles)(UserPublicPostsList))