import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";

import * as actions from "../../../actions";
import { Markdown } from 'react-showdown';
import FloatingBottomToolbox from '../../utils/FloatingBottomToolbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './index.css';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChanged: false,
      _autoSaveTimerId: null,
    
      _editorHeight: window.innerHeight,

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

    window.addEventListener('resize', this.windowSizeChangeHandler);
  }

  windowSizeChangeHandler = (e) => {
    this.setState({_editorHeight: window.innerHeight})
  }

  componentWillUnmount() {
    clearInterval(this.state._autoSaveTimerId);
    window.removeEventListener('resize', this.windowSizeChangeHandler);
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
      <a className="round-button" onClick={this.saveDraftContent} title="Save Draft">
        <FontAwesomeIcon icon="save" />
      </a>,
      <a className="round-button" onClick={this.closeEditingHandles}>
        <FontAwesomeIcon icon="times" />
      </a>,
    ];
    return (
      <div>
        <h2 style={{display: 'inline'}}>
          {this.state.title}
        </h2>
        <hr />
        { this.state.isChanged && <span>(Unsaved Changes)</span>}
        { !this.state.draftIsEmpty && <h4>Loaded Draft content</h4> }
        <div style={{float: "right"}}>
          <button
            onClick={this.publishDraft}
          >
            Publish
          </button>
        </div>

        <div className="editor-container">
          <div>
            <textarea 
              style={{overflow: "auto", resize: "none", height: window.innerHeight - 90 }}
              value={this.state.markdown}
              onChange={this.handleChange}/>
          </div>
          <div>
            <div>
              <Markdown options={{tables: true}} markup={ this.state.markdown } style={{overflow: "auto", resize: "none" }} />
            </div>
          </div>
        </div>
        
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

export default withRouter(connect(mapStateToProps, actions)(Editor));