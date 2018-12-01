
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link, withRouter } from "react-router-dom";

const styles = {
  card: {
    minWidth: 600,
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
    marginBottom: 12,
  },
};

function PlainListPost(props) {
  const post = props.post;

  return (
    <div>
      <Typography component="p">
        <Link to={`/@${post.data.user.userName}/${post.data.slug}`}>@{post.data.title}</Link>
        (<Link to={`/@${post.data.user.userName}`}>@{post.data.user.userName}</Link>)
      </Typography>
    </div>
  );
}

PlainListPost.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(PlainListPost));