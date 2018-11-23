import React, {Component} from 'react'
import  './index.css';


class PostBody extends Component {
  render() {
    return (
    <div className = 'postView' >
      <h1 className = 'postViewTitle'> {this.props.title} </h1>
      <p  className = 'postViewBody'> {this.props.body} </p>
      {/* <span> {this.props.date.toDateString()} </span> */}
    </div>)
  }
  
}

export default PostBody;