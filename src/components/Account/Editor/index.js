import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { Markdown } from 'react-showdown';
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
    const markdown = '# Hello\n\nMore content...';

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
              width={100} 
              heigth={100}
              onChange={(e) => this.setState({markdown: e.target.value}) }/>
          </div>
          <div>
            <Markdown markup={ this.state.markdown } />
          </div>
        </div>
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