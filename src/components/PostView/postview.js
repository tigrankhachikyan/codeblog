import React, {Component} from 'react'
import  './index.css';


class PostView extends Component {
    constructor(props){
        super(props);

        this.state = {
                title: 'Title',
                postbody: 'Some text',
                date: new Date()
            }
    }

    render() {
        return (
            
        <div className = 'postView' >
            <h1> {this.state.title} </h1>
            <p> {this.state.postbody} </p>
            <span> {this.state.date.toDateString()} </span>
        </div>)
    }
}


export default PostView;