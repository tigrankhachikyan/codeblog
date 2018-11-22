import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../actions";

import ListOrGrid from '../Post/info';
import Button from '../Post/button';

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      isShow : true
    }
     this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      isShow: !(this.state.isShow)
    });
  }
  
  componentDidMount() {
    const { latestPosts, fetchPosts } = this.props;
    if (latestPosts.length) return;
    fetchPosts();
  }

  render() {
    const { latestPosts } = this.props;
    return (
      <div className="Home">
        <h1>Code Blog</h1>

          <div onClick={this.handleClick}>
            <Button sendState={this.state.isShow} />
          </div>
          <div className="listOrGridStyle">
          {
            latestPosts.map((post, i) => {
              console.log(post);

              // Here should be Viktors' code
              return (
                  <Link to={`/posts/${post.postId}`}>
                      <ListOrGrid title={post.data.title} date={post.data.date_created.seconds} sendValue={this.state.isShow} />
                  </Link>
              );  
            })
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ data }) => {
  return {
    latestPosts: data.latestPosts
  };
};

export default connect(mapStateToProps, actions)(Home);