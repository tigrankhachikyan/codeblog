import React, {Component} from 'react'
import './index.css'
import fb from '../../images/fb.png'
import twitter from '../../images/twitter.png'
import like from '../../images/like.png'
import bookmark from '../../images/bookmark.png'
import bookmarkCliked from '../../images/bookmarkCliked.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
                    <ul className = 'fixedTools'>
                    <li>
                        <button type='button' onClick = {this.addLike} > 
                            <FontAwesomeIcon icon="thumbs-up" className = 'icon-button'  />
                                {/* <img 
                                    src = {like} 
                                    alt = 'Image'
                                    />  */} 
                            <b>{this.state.like} </b> 
                        </button>
                    </li>
                    <li>
                        <button type='button' onClick = {this.addBookmark}  >
                            
                            <FontAwesomeIcon icon="bookmark" className = 'icon-button'  style = {{display: this.state.displayBookmarkCheck, textAlign: "center" }} />
                            {/* <img src = {bookmark} alt = 'Image' style = {{display: this.state. displayBookmarkCheck }}   /> */}
                            <FontAwesomeIcon icon="bookmark" className = 'icon-button'  style = {{display: this.state.displayBookmarkUncheck , textAlign: "center"}} />
                            {/* <img src = {bookmarkCliked} alt = 'Image' style = {{display: this.state.displayBookmarkUncheck }} /> */}
                        </button>
                    </li>                        
                    <li>
                        <button type='button' > 
                            <FontAwesomeIcon icon="bookmark" className = 'icon-button' />
                            
                            {/* <FontAwesomeIcon icon="facebook"/> */}
                            {/* <img src = {fb} alt = 'Image' />  */}
                        </button>
                    </li>
                    <li className = 'icon-button'>
                        <button type='button'  > 
                            <FontAwesomeIcon icon="bookmark"  />
                            {/* <FontAwesomeIcon icon= 'google' /> */}
                            {/* <img src = {twitter} alt = 'Image'/>  */}
                        </button>
                    </li>    
                </ul>
            </div>
        )
    }
}

export default Tools

// style={{background: this.state.color }}