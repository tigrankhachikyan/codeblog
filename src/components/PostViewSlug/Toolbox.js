import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import { 
  likePost,
  bookmarkPost
} from "../../actions";

import "../../css/prism.css";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justify: "flex-start",
    position: "fixed",
    left: "5vw",
    top: "45vh"
  },
  fab: {
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
  },
  pair: {
    margin: theme.spacing.unit,
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justify: "center"
  },
  
});

class Toolbox extends PureComponent {
  render() {
    const { classes } = this.props;
    if (!this.props.post) return null;

    const { uid, post } = this.props;

    return (
      <div className={classes.root}>
          <div className={classes.pair}>
            <VisibilityIcon />
            <Typography component="h5" variant="h5" className={classes.fab}>
              {this.props.views}
            </Typography>
          </div>

          <div className={classes.pair}>
            <ButtonBase aria-label="Like"
              onClick={() => this.props.likePost(post.postId)}
            >
              <ThumbUpIcon />
            </ButtonBase>
            <Typography component="h5" variant="h5" className={classes.fab}>
              {this.props.likes}
            </Typography>
          </div>

          <ButtonBase 
            aria-label="bookmark" className={classes.pair}
            onClick={() => this.props.bookmarkPost(uid, post)}
          >
            <BookmarkIcon />
          </ButtonBase>

      </div>
    );
  }
}

const mapStateToProps = ({ auth, currentPost }) => {
  return {
    uid: auth.uid,
    post: currentPost.post,
    likes: currentPost.likes,
    views: currentPost.views
  };
};

export default connect(mapStateToProps, {
  likePost,
  bookmarkPost
})(withStyles(styles)(Toolbox));