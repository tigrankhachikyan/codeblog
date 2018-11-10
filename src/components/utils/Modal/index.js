import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";

import * as actions from "../../../actions";

import './index.css';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      slug: "",
    }
  }

  handleCancel = (e) => {
    this.setState({title: "", slug: ""});
    this.props.handleClose();
  }

  handleCreate = (e) => {
    const { createPost } = this.props;
    e.preventDefault();

    const data = {
      title: this.state.title,
      date_created: new Date(),
    };
    createPost(data).then((postId) => {
      this.props.history.push(`/account/edit/${postId}`);
      this.props.handleClose();
    })
  }

  render() {
  
    const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <ul>
            <li>
              <label>
                Title:
                <input type="text" value={this.state.title} onChange={(e) => {this.setState({title: e.target.value})}} />
              </label>
            </li>
            <li>
              <label>
                Slug:
                <input type="text" value={""} onChange={() => {}} />
              </label>
            </li>
            <li>
              <button onClick={this.handleCreate}>Create</button>
              <button onClick={this.handleCancel}>Cancel</button>
            </li>
          </ul>
        </section>
      </div>
    );
  }
}


const mapStateToProps = ({ data, auth }) => {
  return {
    data,
    auth
  };
};

export default withRouter(connect(mapStateToProps, actions)(Modal));