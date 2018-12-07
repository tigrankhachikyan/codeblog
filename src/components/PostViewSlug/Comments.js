import React, { Component } from 'react';
import { connect } from "react-redux";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { 
  addPostComment,
} from "../../actions";

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newCommentText: '',

      totalId: -1,
      user: 'User'
    }
  }

  handelChange = (e) => {
    this.setState({newCommentText: e.target.value})
  }

  addComment = () => {
    const { postId, user, addPostComment } = this.props;

    addPostComment(postId, {
      text: this.state.newCommentText,
      user
    });
    this.setState({newCommentText: ""});
  }

  render() {
    const { comments } = this.props;
    if (!comments) return null;

    return(
      <div className = 'postComment'>
        <h3> {comments.length} Comments </h3>
          
        { this.props.user &&
          <div className = 'textContainer'>
            {
              this.props.user.photoURL 
                ? <Avatar alt={this.props.user.displayName} src={this.props.user.photoURL}/>
                : <AccountCircle />
            }
            <textarea 
              className='commentText' 
              placeholder='Add Comments...'
              value={this.state.newCommentText}
              onChange = {this.handelChange} 
            />
            <button 
              className = 'commentBtn'
              type = 'button'
              onClick={this.addComment}
            > Comment </button>
          </div>
        }
        {
          comments.map(comment => <CommentCard key={comment.id} comment={comment}/>)
        }
      </div>
    )
  }
}

const CommentCardStyles = theme => ({
  card: {
    display: 'flex',
    marginBottom: theme.spacing.unit
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
  },
  avatar: {
    display: 'flex',
    flexDirection: "column",
    flex: '0 0 auto',
    justify: "center",
    alignItems: "center",
    alignContent: "center",
    margin: theme.spacing.unit * 2
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
});

const CommentCard = withStyles(CommentCardStyles)(({ classes, comment }) => {
  return <Card className={classes.card}>
  <div className={classes.details}>
    <CardContent className={classes.content}>
      <Typography component="h5" variant="h5">
        {comment.text}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        {comment.dateCreated.toDate().toLocaleString()}
      </Typography>
    </CardContent>
  </div>
  <div className={classes.avatar}>
    {
      comment.user.photoURL 
        ? <Avatar alt={comment.user.displayName} src={comment.user.photoURL}/>
        : <AccountCircle />
    }
    <Typography variant="subtitle1" color="textSecondary">
      {comment.user.displayName}
    </Typography>
  </div>
</Card>
})

const mapStateToProps = ({ auth, currentPost }) => {
  const props = {
    postId: currentPost.post.postId,
    comments: currentPost.comments
  };

  if (auth) {
    props.user = {
      uid: auth.uid,
      displayName: auth.displayName,
      photoURL: auth.photoURL
    }
  }
  return props;
};

export default connect(mapStateToProps, {
  addPostComment,
})(Comments);