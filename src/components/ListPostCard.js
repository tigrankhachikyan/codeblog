
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link, withRouter } from "react-router-dom";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import VisibilityIcon from '@material-ui/icons/Visibility';

import {formatDate} from  "../helpers/formatDate";

const styles = {
  card: {
    maxWidth: 380,
    height: 145,
    maxHeight: 145,
    // paddingTop: 20,
    paddingBottom: 20,
    margin: 10,
    flexGrow: 1
  },
  content: {
    paddingLeft: 20,
    paddingRight: 20
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginTop: 12,
  },
};

function ListPostCard(props) {
  const { classes, post } = props;

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography variant="h5" component="h2">
          <Link to={`/@${post.user.userName}/${post.slug}`}>{post.title}</Link>
        </Typography>
        <Typography component="p">
          <em>{post.excerpt || "NO EXCERPT"}</em>
        </Typography>
        <Typography variant="caption" style={{float: "left"}} className={classes.pos}>
        {formatDate(post.date_created.toDate())}
        </Typography>
        <Typography variant="caption" style={{float: "right"}} className={classes.pos}>
          {`Liked: ${post.likes} Views ${post.views}`}
        </Typography>
        <br/>

      </CardContent>
      <CardActions className={classes.content}>
        <div>
          <Typography variant="caption" style={{float: "right"}} className={classes.pos}>
            By: <Link to={`/@${post.user.userName}`} >@{post.user.userName}</Link>
          </Typography>
        </div>
      </CardActions>
    </Card>
  );
}

ListPostCard.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ListPostCard));