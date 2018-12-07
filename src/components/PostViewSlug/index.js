import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Markdown } from 'react-showdown';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Spinner from '../utils/Spinner';
import Hidden from '@material-ui/core/Hidden';
import Comments from './Comments';
import Toolbox from './Toolbox';

import { 
  likePost,
  fetchPostBySlug,
  cleanCurrentpost,
  viewPost
} from "../../actions";

import Prism from "prismjs";
import "../../css/prism.css";

const styles = theme => ({
  root: {
    width: '100%',
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
    if (!this.props.currentPost.post) return null;

    const { post, postBody } = this.props.currentPost;

    return (
      <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        alignContent="center"
      >
        <Hidden smDown>
          <Toolbox />
        </Hidden>
        <Grid item sm={12} md={8} lg={6}>
        { 
          post 
            ? <div>
                <h1>{post.title}</h1>
                <Markdown style={{
                    overflowWrap: "break-word",
                  }}
                  markup={ postBody.body_markdown } />
                <Comments />
              </div>
            : <Spinner />
        }
        </Grid>
      </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, currentPost }) => {
  return {
    currentPost: {
      post: currentPost.post,
      postBody: currentPost.postBody
    }
  };
};

export default connect(mapStateToProps, {
  likePost,
  viewPost,
  fetchPostBySlug,
  cleanCurrentpost
})(withStyles(styles)(PostViewSlug));