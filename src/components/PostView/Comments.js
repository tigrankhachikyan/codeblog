import React, {Component} from 'react'
import './index.css';
import person from '../../images/person.png';
import NewCommment from './NewComment'


class Comments extends Component {

    constructor(props) {
        super(props);

        this.state = {
            commmentsArray: [],
            value: '',
            totalId: -1,
            user: 'User'
        }
        this.addComment = this.addComment.bind(this);
        this.handelChange = this.handelChange.bind(this);
        this.removeComment = this.removeComment.bind(this);
        
    }

    handelChange(e) {
        this.setState({value: e.target.value})
    }

    addComment() {
        if (this.state.value.length !== 0) {
            let comment = this.state.commmentsArray;
            comment.push({id: comment.length + 1, text: this.state.value});
            this.setState({
                commmentsArray: comment,
                value: '',
                totalId: this.state.totalId + 1
            })
        } 
        
    }

    removeComment(i) {
        let arr = this.state.commmentsArray;
        arr.splice(i, 1)
        this.setState({commmentsArray: arr })
    }
    
    render() {
        return(
            <div className = 'postComment'>
                <h3> {this.state.commmentsArray.length} Comments </h3>
                <div className = 'newComment'>
                    <div className = 'textContainer'>
                        <h3> {this.state.user} </h3>
                        <img src= {person} />
                        <textarea className = 'commentText' placeholder = 'Add Comments . . . ' value = {this.state.value} onChange = {this.handelChange} > </textarea>
                        <button className = 'commentBtn'type = 'button' onClick = {this.addComment} > Comment </button>
                    </div>
                   
                    </div>
                    <ul>
                            {
                                this.state.commmentsArray.map((e) => {
                                    return <NewCommment content = {e.text} key = {e.id} index = {e.id} remove = {this.removeComment} />
                                })
                            }
                    </ul>
            </div>
            
        )
    }
}

export default Comments;