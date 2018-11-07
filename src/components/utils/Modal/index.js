import React, { Component } from 'react';
import { connect } from "react-redux";

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

  render() {
    const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <form onSubmit={(e) => {e.preventDefault(); this.props.createPost()}}>
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
                <input type="submit" value="Submit" />
                <button onClick={this.props.handleClose}>Cancel</button>
              </li>
            </ul>

          </form>
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

export default connect(mapStateToProps, actions)(Modal);