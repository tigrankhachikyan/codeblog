import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Badge from '@material-ui/core/Badge';

import { 
  likePost,
} from "../../actions";

import "../../css/prism.css";

const styles = theme => ({
  root: {
    width: 15,
    marginTop: theme.spacing.unit * 3,
  },
  fab: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: 0,
    marginLeft: theme.spacing.unit,
    marginRight: 0,
  },
});

class Toolbox extends PureComponent {
  render() {
    const { classes } = this.props;
    if (!this.props.post) return null;

    const { post } = this.props;

    return (
      <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        alignContent="center"
      >
        <Grid item style={{
          position: "fixed",
          top: "45vh",
          left: "5vw",
          width: 30
        }}>

          <Badge color="secondary" badgeContent={this.props.views}>
            <IconButton aria-label="Views" className={classes.fab}>
              <VisibilityIcon />
            </IconButton>
          </Badge>

          <Badge color="secondary" badgeContent={this.props.likes}>
            <IconButton aria-label="Like" className={classes.fab}
              onClick={() => this.props.likePost(post.postId)}
            >
              <ThumbUpIcon />
            </IconButton>
          </Badge>
          
          <IconButton aria-label="Like" className={classes.fab}>
            <BookmarkIcon />
          </IconButton>
        </Grid>
      </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ currentPost }) => {
  return {
    post: currentPost.post,
    likes: currentPost.likes,
    views: currentPost.views
  };
};

export default connect(mapStateToProps, {
  likePost,
})(withStyles(styles)(Toolbox));