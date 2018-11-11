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
      markdown: "",
    }
  }

  componentDidMount() {
    const postId = this.props.match.params.id;
    this.props.fetchPostById(postId).then(doc => {
      console.log(doc)
    })
  }

  render() {
    const actions = [
      <a className="round-button">
        <FontAwesomeIcon icon="save" />
      </a>,
    ];
    return (
      <div>
        <h1>Editor</h1>
        <p>{this.props.match.params.id}</p>
        <pre>
          {JSON.stringify(this.props.post, null,2)}
        </pre>
        <div className="editor-container">
          <div>
            <textarea 
              style={{overflow: "auto", resize: "none" }}
              onChange={(e) => this.setState({markdown: e.target.value}) }/>
          </div>
          <div>
            <Markdown markup={ this.state.markdown } style={{overflow: "auto", resize: "none" }} />
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