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
      slugChanged: false
    }
  }

  handleCancel = (e) => {
    this.setState({title: "", slug: ""});
    this.props.handleClose();
  }

  handleCreate = (e) => {
    const { createPost } = this.props;
    const { uid } = this.props;
    e.preventDefault();

    const data = {
      title: this.state.title,
      date_created: new Date(),
      uid: uid
    };
    createPost(data).then((postId) => {
      this.props.history.push(`/account/edit/${postId}`);
    })
  }

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value,
      slug: this.state.slugChanged ? this.state.slug : e.target.value.replace(/\s+/g, '-')
    })
  }


  handleSlugChange = (e) => {
    if (e.target.value) {
      this.setState({
        slugChanged: true,
        slug: e.target.value,
      });
    } else {
      this.setState({
        slugChanged: false,
      });
    }
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
                <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
              </label>
            </li>
            <li>
              <label>
                Slug:
                <input type="text" value={this.state.slug} onChange={this.handleSlugChange}
                 />
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


const mapStateToProps = ({ auth }) => {
  return {
    uid: auth.uid
  };
};

export default withRouter(connect(mapStateToProps, actions)(Modal));