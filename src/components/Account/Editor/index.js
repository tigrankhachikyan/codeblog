import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import * as actions from "../../../actions";
import { Markdown } from 'react-showdown';
import Diff from 'react-stylable-diff';

import FloatingBottomToolbox from '../../utils/FloatingBottomToolbox';
import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';

import './index.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paperToolbox: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit,
    color: theme.palette.text.secondary,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit,
    color: theme.palette.text.secondary,
    overflowWrap: "break-word",
    height: '80vh',
    minHeight: '80vh'
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});


class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChanged: false,
      markdown: "",
      title: "",

      draftIsEmpty: true,
      _autoSaveTimerId: null,

      displayContent: null
    }
  }

  fetchPostData = async (postId) => {
    const {fetchPostById, fetchPostBodyById, fetchPostDraftById} = this.props;
    
    const [postHeader, postBody, postDraft] = await Promise.all([
      fetchPostById(postId),
      fetchPostBodyById(postId),
      fetchPostDraftById(postId)
    ]);
    const post = {...postHeader, ...postBody };

    if (postDraft) {
      post.draft = postDraft;
    }

    return post;
  }

  async componentDidMount() {
    const postId = this.props.match.params.id;
    try {
      const post = await this.fetchPostData(postId);
      const data = {
        title: post.title,
        markdownPublished: post.body_markdown,
        markdown: post.body_markdown || `#${post.title}`,
      };
      if (post.draft) {
        data.draftIsEmpty  = false;
        data.markdownDraft = post.draft.body_markdown;
        data.markdown      = post.draft.body_markdown;
      }

      this.setState({...data});
    } catch(e) {
      console.log("Error:", e);
    }

    if (this.props.settings.AUTO_SAVE_DRAFT) {
      const timerId = setInterval(() => {
        if (!this.state.isChanged) return;
  
        this.saveDraftContent();
      }, this.props.settings.AUTO_SAVE_DRAFT_INTERVAL)
      this.setState({_autoSaveTimerId: timerId});
    }
  }

  componentWillUnmount() {
    if (!this.state._autoSaveTimerId) return;

    clearInterval(this.state._autoSaveTimerId);
  }

  // showDiff = () => {
  //   this.setState({
  //     displayContent: this.renderDraftDiff()
  //   })
  // }

  // showEditor = () => {
  //   this.setState({
  //     displayContent: this.renderEditor()
  //   })
  // }

  closeEditingHandles = () => {
    if (this.state.isChanged) {
      alert("There are unsaved Changes!");
      return;
    }
    this.props.history.push(`/account`);
  }

  handleChange = (e) => {
    this.setState({
      markdown: e.target.value,
      isChanged: true
    })
  }

  saveDraftContent = () => {
    const postId = this.props.match.params.id;
    const { savePostDraftById, addToast } = this.props;
    savePostDraftById(postId, {body_markdown: this.state.markdown})
      .then(() => {
        this.setState({isChanged: false});
        addToast({text: "Saved draft", color: "lightgreen"});
      });
  }
  
  publishDraft = () => {
    const postId = this.props.match.params.id;
    const { publishDraftById, addToast } = this.props;
    publishDraftById(postId).then((postBody) => {
      this.setState({
        isChanged: false,
        markdownPublished: postBody
      });
      addToast({text: "Successfully published latest draft changes", color: "lightgreen"});
    });
  }

  // renderDraftDiff = () => {
  //   return (
  //     <Grid item xs={10}>
  //       <Paper className={this.props.classes.paper}>
  //         <pre>
  //           <Diff inputA={this.state.markdown} inputB={this.state.markdownDraft} type="words" />
  //         </pre>
  //       </Paper>
  //     </Grid>
  //   );
  // }

  // renderEditor = () => {
  //   return <Fragment>
  //     <Grid item xs={6}>
  //       <Paper className={this.props.classes.paper}>
  //         <textarea
  //           style={{
  //             margin: 5,
  //             fontSize: 18,
  //           }}
  //           value={this.state.markdown}
  //           onChange={this.handleChange}
  //         />
  //       </Paper>
  //     </Grid>
  //     <Grid item xs={6}>
  //       <Paper className={this.props.classes.paper}>
  //         <Markdown 
  //           options={{tables: true}}
  //           markup={ this.state.markdown }
  //           style={{overflow: "auto"}} 
  //         />
  //       </Paper>
  //     </Grid>
  //   </Fragment>
  // }

  render() {
    if (!this.state.markdown) return null;

    const actions = [
      {
        action: this.saveDraftContent,
        title: "Save Draft",
        icon: <SaveIcon />,
      },
      {
        action: this.closeEditingHandles,
        title: "Close Editor",
        icon: <CloseIcon />,
      }
    ];
    if (this.props.settings.AUTO_SAVE_DRAFT) {
      actions[0].hint = `*${this.props.settings.AUTO_SAVE_DRAFT_INTERVAL / 1000} sec`;
    }

    return (
      <div className={this.props.classes.root}>
      <Grid 
        container
        direction="row"
      >
        <Grid item xs={12}>
          <Paper className={this.props.classes.paperToolbox}>
            <h2 style={{display: 'inline'}}>
              Post Title: <em>
                {this.state.title}
                { 
                  this.state.isChanged && 
                  <Typography variant="caption" gutterBottom color="secondary" style={{display: "inline"}}>
                    (Unsaved Changes)
                  </Typography>
                }
              </em>
            </h2>

            { 
              // !this.state.draftIsEmpty && 
              //   <div>
              //     <span>Detected Content from draft</span>
              //     <Button 
              //       variant="contained" 
              //       color="primary" 
              //       onClick={this.showDiff}
              //     >
              //       View Diff
              //     </Button>
              //   </div>
            }

            {
              this.state.markdownPublished !== this.state.markdown &&
              ! this.state.isChanged &&
              <Button 
                variant="contained" 
                color="primary" 
                onClick={this.publishDraft}
                style={{float: "right"}}
              >
                Publish Draft Changes
              </Button>
            }
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={this.props.classes.paper}>
            <textarea
              style={{
                margin: 5,
                fontSize: 18,
              }}
              value={this.state.markdown}
              onChange={this.handleChange}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={this.props.classes.paper} style={{overflowY: "auto"}}>
            <Markdown 
              options={{tables: true}}
              markup={ this.state.markdown }
            />
          </Paper>
        </Grid>
      </Grid>

      <FloatingBottomToolbox 
        actions={actions}
      />

      </div>
    );
  }
}

const mapStateToProps = ({ data, settings }) => {
  return {
    post: data.editPost, // TODO: not used yet, move to redux or not?
    settings
  };
};

Editor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, actions)(withStyles(styles)(Editor)));