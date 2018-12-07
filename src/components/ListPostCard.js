
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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

function ListPostCard(props) {
  const { classes, post } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          <Link to={`/@${post.user.userName}`}>@{post.user.userName}</Link>
        </Typography>
        <Typography variant="h5" component="h2">
          {post.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {post.date_created.toDate().toLocaleString()}
        </Typography>
        <Typography component="p">
          {post.excerpt || "NO EXCERPT"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={e => props.history.push(`/@${post.user.userName}/${post.slug}`)}>
          Read...
        </Button>
      </CardActions>
    </Card>
  );
}

ListPostCard.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ListPostCard));