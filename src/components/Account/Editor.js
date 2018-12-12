import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Markdown } from 'react-showdown';

import FloatingBottomToolbox from '../utils/FloatingBottomToolbox';
import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import Switch from '@material-ui/core/Switch';

import {
  savePostDraftById,
  publishDraftById
} from "../../actions/editPost";

import {
  addToast
} from "../../actions/toasts";

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


class Editor extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isChanged: false,
      markdown: this.props.editPost.body.body_markdown,
      title: this.props.editPost.header.title,

      draftIsEmpty: true,
      _autoSaveTimerId: null,
    };
  }

  async componentDidMount() {
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
  };

  saveDraftContent = () => {
    const postId = this.props.postId;
    const { savePostDraftById, addToast } = this.props;
    savePostDraftById(postId, {body_markdown: this.state.markdown})
      .then(() => {
        this.setState({isChanged: false});
        addToast({text: "Saved draft", color: "lightgreen"});
      });
  }
  
  publishDraft = () => {
    const postId = this.props.postId;
    const { publishDraftById, addToast } = this.props;
    publishDraftById(postId).then((postBody) => {
      this.setState({
        isChanged: false,
      });
      addToast({text: "Successfully published latest draft changes", color: "lightgreen"});
    });
  }

  render() {
    const post = this.props.editPost;

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

    if (this.props.editPost.error !== null) {
      return <h2> Error: {this.props.editPost.error}</h2>
    }

    return (
      <div className={this.props.classes.root}>
      {
        !this.props.editPost.loading && this.props.editPost.error === null &&
        <Grid 
          container
          direction="row"
        >
          <Grid item xs={12}>
            <Paper className={this.props.classes.paperToolbox}>
              <h2 style={{display: 'inline'}}>
                Post Title: <em>
                  {this.props.editPost.header.title}
                  { 
                    this.state.isChanged && 
                    <Typography variant="caption" gutterBottom color="secondary" style={{display: "inline"}}>
                      (Unsaved Changes)
                    </Typography>
                  }
                </em>
              </h2>

              <div
                style={{float: "right"}}
              >
                <span>Publish?</span>
                <Switch
                  color="primary"
                />
              {
                this.props.editPost.body.body_markdown !== this.state.markdown &&
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
              </div>
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
      }
      {
        !this.props.editPost.loading && !this.props.editPost.error &&
        <FloatingBottomToolbox 
          actions={actions}
        />
      }
      </div>
    );
  }
}

const mapStateToProps = ({ auth, data, settings, editPost }) => {
  return {
    uid: auth.uid,
    editPost,
    //post: data.editPost, // TODO: not used yet, move to redux or not?
    settings
  };
};

Editor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, {
  addToast,
  savePostDraftById,
  publishDraftById
})(withStyles(styles)(Editor)));