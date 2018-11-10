import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../actions";

class Editor extends Component {
  constructor(props) {
    super(props);
    console.log('constructor');
  }

  componentDidMount() {
    const postId = this.props.match.params.id;
    console.log("EDITOR MOUNT: ", postId);

//    if (! this.props.data.editPost ) {
       this.props.fetchPostById(postId).then(doc => {
         console.log(doc)
       })
//    }
  }

  render() {
    return (
      <div>
        <h1>Editor</h1>
        <p>{this.props.match.params.id}</p>
        <pre>
          {JSON.stringify(this.props.post, null,2)}
        </pre>
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