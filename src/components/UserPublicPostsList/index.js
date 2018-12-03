import React, { Component } from 'react';
import { connect } from "react-redux";
import { getUserByUserName } from "../../actions/modules/userSettings";
import { fetchUserPosts } from "../../actions";

class UserPublicPostsList extends Component {
  state = {
    uid: null,
    userPosts: [],
  };

  async componentDidMount() {
    const {username} = this.props.match.params;
    const {getUserByUserName, fetchUserPosts} = this.props;

    const user = await getUserByUserName(username);
    const userPosts = await fetchUserPosts(user.uid);
    this.setState({userPosts});
  }

  render() {
    return (
      <div className="Home">
        <pre>
          {JSON.stringify(this.state.userPosts, null, 2)}
        </pre>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, {
  getUserByUserName,
  fetchUserPosts
})(UserPublicPostsList);