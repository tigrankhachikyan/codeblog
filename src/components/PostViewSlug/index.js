import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Markdown } from 'react-showdown';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Hidden from '@material-ui/core/Hidden';
import LinearProgress from '@material-ui/core/LinearProgress';

import Comments from './Comments';
import Toolbox from './Toolbox';
import "./index.css";

import { 
  likePost,
  fetchPostBySlug,
  cleanCurrentpost,
  doILikedPost
} from "../../actions/currentPost";

import Prism from "prismjs";
import "../../css/prism.css";

const styles = theme => ({
  root: {
    width: '100%',
  },
  container: {
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 3,
    },
  fab: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: 0,
  },
});

class PostViewSlug extends PureComponent {
  async componentDidMount() {
    const { slug } = this.props.match.params;

    try {
      await this.props.fetchPostBySlug(slug);
      await this.props.doILikedPost();
      setTimeout(() => Prism.highlightAll(), 0)
    } catch(err) {
      console.log(err);
    }
  }

  componentWillUnmount() {
    this.props.cleanCurrentpost();
  }

  render() {
    const { classes } = this.props;

    const { post, postBody } = this.props.currentPost;
    
    if (this.props.error) {
      return <h2>Error Loading post. It is probably removed by author!</h2>
    }

    return (
      <div className={classes.root}>
      {
        !post && <LinearProgress />
      }
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        alignContent="center"
        className={classes.container}
      >
        <Hidden smDown>
          <Toolbox />
        </Hidden>
        <Grid item sm={12} md={8} lg={6} style={{justifySelf: "center"}}>
        { 
          post && <div>
            <h1>{post.title}</h1>
            <Markdown style={{
                overflowWrap: "break-word",
              }}
              markup={ postBody.body_markdown } />
            <Comments />
          </div>
        }
        </Grid>
      </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, currentPost }) => {
  let post = null;
  if (currentPost.post ) {
    post = { ...currentPost.post };

    if (post && "likes" in post) {
      delete post.likes
    }
  }

  return {
    auth,
    error: currentPost.error,
    currentPost: {
      post,
      postBody: currentPost.postBody,
    }
  };
};

export default connect(mapStateToProps, {
  likePost,
  fetchPostBySlug,
  cleanCurrentpost,
  doILikedPost
})(withStyles(styles)(PostViewSlug));