import React, {Component} from 'react'
import  './index.css';


class PostBody extends Component {
    constructor(props){
        super(props);

        // this.state = {
        //         title: 'Title',
        //         postbody: 'Some text',
        //         date: new Date()
        //     }
    }

    render() {
        return (
            
        <div className = 'postView' >
            <h1> {this.props.title} </h1>
            <p> {this.props.body} </p>
            {/* <span> {this.props.date.toDateString()} </span> */}
        </div>)
    }
}


export default PostBody;