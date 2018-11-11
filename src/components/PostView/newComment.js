import React, {Component} from 'react'
import '../index.css'


class NewComment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: 'User',
            date: new Date()
        }
        
       this.deletComment = this.deletComment.bind(this)
       

    }

    deletComment() {
        this.props.remove(this.props.index)
    }

    render() {
        return(
            <div className = 'newComment'>
            <h3> {this.state.user} </h3>
            <p> {this.props.content} </p>
            <button className = 'removeComment' onClick = {this.deletComment}> Remove </button>
            </div>
        )
    }
}

export default NewComment;