import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import VisibilityIcon from '@material-ui/icons/Visibility';
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

    const { auth, post } = this.props;

    return (
      <div className={classes.root}>
          <div className={classes.pair}>
            <VisibilityIcon color="action"/>
            <Typography component="h5" variant="h5" className={classes.fab}>
              {this.props.views}
            </Typography>
          </div>

          <div className={classes.pair}>
            <ButtonBase aria-label="Like"
              disabled={!auth}
              onClick={() => this.props.likePost(post.postId)}
            >
              <ThumbUpIcon color="action"/>
            </ButtonBase>
            <Typography component="h5" variant="h5" className={classes.fab}>
              {this.props.likes}
            </Typography>
          </div>

          <ButtonBase 
            aria-label="bookmark" className={classes.pair}
            disabled={!auth}
            onClick={() => this.props.bookmarkPost(auth.uid, post)}
          >
            <BookmarkIcon color="action"/>
          </ButtonBase>

      </div>
    );
  }
}

const mapStateToProps = ({ auth, currentPost }) => {
  return {
    auth,
    post: currentPost.post,
    likes: currentPost.likes,
    views: currentPost.views
  };
};

export default connect(mapStateToProps, {
  likePost,
  bookmarkPost
})(withStyles(styles)(Toolbox));