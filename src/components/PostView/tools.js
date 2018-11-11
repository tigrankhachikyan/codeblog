import React, {Component} from 'react'
import '../index.css'
import fb from '../images/fb.png'
import twitter from '../images/twitter.png'
import like from '../images/like.png'
import bookmark from '../images/bookmark.png'
import bookmarkCliked from '../images/bookmarkCliked.png'
class Tools extends Component {
    constructor(props) {
        super(props);

        this.state = {
            like: 10,
            bookmark: 2,
            dislike: 5,
            likeColor: '',
            likeStatus: true,
            displayBookmarkCheck: 'Block',
            displayBookmarkUncheck: 'none'
        }



        this.addBookmark = this.addBookmark.bind(this);
        this.addLike = this.addLike.bind(this);

    }

    addBookmark() {
        
        this.setState ({
                        displayBookmarkCheck: 'none',
                        displayBookmarkUncheck: 'Block'
        })
    }

    addLike() {

        let newLike = this.state.likeStatus ? this.state.like +1 : this.state.like - 1;

        this.setState({ like: newLike,
                        likeStatus: !this.state.likeStatus,
         } )
    
    }


    render() {
        
        return(
            <div className = 'flexContainer'>
                <button type='button' onClick = {this.addLike} > 
                    <img 
                        src = {like} 
                        alt = 'Image'
                        /> 
                    <b>{this.state.like} </b> 
                </button>
                <button type='button' onClick = {this.addBookmark}  > 
                    <img src = {bookmark} alt = 'Image' style = {{display: this.state. displayBookmarkCheck }}   />
                    <img src = {bookmarkCliked} alt = 'Image' style = {{display: this.state.displayBookmarkUncheck }}   />
                    
                    
                </button>
                <button type='button'> <img src = {fb} alt = 'Image' /> </button>
                <button type='button'> <img src = {twitter} alt = 'Image'/> </button>
            </div>
        )
    }
}

export default Tools

// style={{background: this.state.color }}