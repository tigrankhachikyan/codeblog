
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentDidMount() {
      if (this.props.authenticated === null) {
        this.props.history.push("/signin", {from: { pathname: this.props.match.url }});
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push(`/signin`);
      }
    }

    render() {
      if (this.props.authenticated) {
        return <ComposedComponent {...this.props} />;
      }
      return null;
    }
  }

  function mapStateToProps({ auth }) {
    return { authenticated: auth };
  }

  return withRouter(connect(mapStateToProps)(Authentication));
}