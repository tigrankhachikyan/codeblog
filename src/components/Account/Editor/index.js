import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import * as actions from "../../../actions";
import { Markdown } from 'react-showdown';
import Diff from 'react-stylable-diff';

import FloatingBottomToolbox from '../../utils/FloatingBottomToolbox';

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
    height: '75vh',
    minHeight: '75vh'
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
        markdown: post.body_markdown,
      };
      if (post.draft) {
        data.draftIsEmpty  = false;
        data.markdownDraft = post.draft.body_markdown;
        data.markdown      = post.draft.body_markdown;
      } else {
        data.displayContent = this.renderEditor();
      }

      this.setState({...data});
    } catch(e) {
      console.log("Error:", e);
    }

    // TODO: use autodave interval from settings
    const timerId = setInterval(() => {
      if (!this.state.isChanged) return;

      this.saveDraftContent();
    }, 7000)
    this.setState({_autoSaveTimerId: timerId});
  }

  componentWillUnmount() {
    clearInterval(this.state._autoSaveTimerId);
  }

  showDiff = () => {
    this.setState({
      displayContent: this.renderDraftDiff()
    })
  }

  showEditor = () => {
    this.setState({
      displayContent: this.renderEditor()
    })
  }

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
    publishDraftById(postId).then(() => {
      this.setState({isChanged: false});
      addToast({text: "Successfully published latest draft changes", color: "lightgreen"});
    });
  }

  renderDraftDiff = () => {
    return (
      <Grid item xs={10}>
        <Paper className={this.props.classes.paper}>
          <pre>
            <Diff inputA={this.state.markdown} inputB={this.state.markdownDraft} type="words" />
          </pre>
        </Paper>
      </Grid>
    );
  }

  renderEditor = () => {
    return <Fragment>
      <Grid item xs={6}>
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
      <Grid item xs={6}>
        <Paper className={this.props.classes.paper}>
          <Markdown 
            options={{tables: true}}
            markup={ this.state.markdown }
            style={{overflow: "auto"}} 
          />
        </Paper>
      </Grid>
    </Fragment>
  }

  render() {
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

    return (
      <div className={this.props.classes.root}>
      <Grid 
        container
        direction="row"
        alignItems="stretch"
      >
        <Grid item xs={12}>
          <Paper className={this.props.classes.paperToolbox}>
            <h2 style={{display: 'inline'}}>
              Post Title: <em>
                {this.state.title}
                { this.state.isChanged && <span>(Unsaved Changes)</span>}
              </em>
            </h2>
            <hr />

            { 
              !this.state.draftIsEmpty && 
                <div>
                  <span>"Detected Content from draft"</span>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={this.showDiff}
                  >
                    View Diff
                  </Button>
                </div>
            }

            {
              this.state.isChanged &&
              <Button 
                variant="contained" 
                color="primary" 
                onClick={this.publishDraft}
              >
                Publish Draft Changes
              </Button>
            }
          </Paper>
        </Grid>
        <Grid item xs={6}>
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
        <Grid item xs={6}>
          <Paper className={this.props.classes.paper} style={{overflowY: "scroll"}}>
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

const mapStateToProps = ({ data }) => {
  return {
    post: data.editPost
  };
};

Editor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, actions)(withStyles(styles)(Editor)));