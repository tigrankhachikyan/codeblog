import React, { Component } from 'react';
import { connect } from "react-redux";
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

      markdown: "",
      title: ""
    }
  }

  componentDidMount() {
    const postId = this.props.match.params.id;
    this.props.fetchPostById(postId).then(doc => {
      this.setState({
        markdown: doc.body_markdown || "Start typing your post",
        title: doc.title,
      })
    })

    const timerId = setInterval(() => {
      if (!this.state.isChanged) return;

      this.saveContent();
    }, 7000)
    this.setState({_autoSaveTimerId: timerId});
  }

  componentWillUnmount() {
    clearInterval(this.state._autoSaveTimerId);
  }

  closeEditingHandles = () => {
  }

  handleChange = (e) => {
    this.setState({
      markdown: e.target.value,
      isChanged: true
    })
  }

  saveContent = () => {
    const postId = this.props.match.params.id;
    const { savePostById, addToast } = this.props;
    savePostById(postId, {body_markdown: this.state.markdown})
      .then(() => {
        this.setState({isChanged: false});
        addToast({text: "Saved", color: "lightgreen"});
      });
  }

  render() {
    const actions = [
      <a className="round-button" onClick={this.saveContent}>
        <FontAwesomeIcon icon="save" />
      </a>,
      <a className="round-button" onClick={this.closeEditingHandles}>
        <FontAwesomeIcon icon="times" />
      </a>,
    ];
    return (
      <div>
        <h1>Editor</h1>
        <p>{this.props.match.params.id}</p>
        <h2>{this.state.title}
          { this.state.isChanged && <span>(Unsaved Changes)</span>}
        </h2>
        <pre>
          {/* {JSON.stringify(this.props.post, null,2)} */}
        </pre>
        <div className="editor-container">
          <div>
            <textarea 
              style={{overflow: "auto", resize: "none" }}
              value={this.state.markdown}
              onChange={this.handleChange}/>
          </div>
          <div>
            <Markdown options={{tables: true}} markup={ this.state.markdown } style={{overflow: "auto", resize: "none" }} />
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

export default connect(mapStateToProps, actions)(Editor);