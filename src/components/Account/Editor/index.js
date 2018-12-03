import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import * as actions from "../../../actions";
import { Markdown } from 'react-showdown';
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
    height: "100%"
  },
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100vh',
    color: theme.palette.text.secondary,
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
      _autoSaveTimerId: null,
    
      markdown: "",
      title: "",

      draftIsEmpty: true,
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

  componentDidMount() {
    const postId = this.props.match.params.id;
    this.fetchPostData(postId)
      .then(post => {
        if (post.draft) {
          this.setState({
            draftIsEmpty: false,
            markdown: post.draft.body_markdown,
            title: post.title,
          })
        } else {
          this.setState({
            draftIsEmpty: true,
            markdown: post.body_markdown,
            title: post.title,
          })
        }
      });

    const timerId = setInterval(() => {
      if (!this.state.isChanged) return;

      this.saveDraftContent();
    }, 7000)
    this.setState({_autoSaveTimerId: timerId});
  }

  componentWillUnmount() {
    clearInterval(this.state._autoSaveTimerId);
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
      >
        <Grid item xs={12}>
          <Paper>
          <h2 style={{display: 'inline'}}>
              {this.state.title}
            </h2>
            <hr />
            { this.state.isChanged && <span>(Unsaved Changes)</span>}
            { !this.state.draftIsEmpty && <h4>Loaded Draft content</h4> }
            <Button variant="contained" color="primary" onClick={this.publishDraft} >Publish Draft Changes</Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <textarea
            style={{
              margin: 5,
              fontSize: 18,
            }}
            value={this.state.markdown}
            onChange={this.handleChange}
            />
        </Grid>
        <Grid item xs={6} grow>
            <Markdown 
              options={{tables: true}}
              markup={ this.state.markdown }
              style={{overflow: "auto"}} 
            />
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