import React, {Component} from 'react'
import './index.css'

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
    let newLike = this.state.likeStatus 
      ? this.state.like +1 
      : this.state.like - 1;

    this.setState({ like: newLike,
      likeStatus: !this.state.likeStatus,
    })
  }

  render() {
    return(
      <div className = 'flexContainer'>
        <ul className = 'fixedTools'>
          <li>
            <button type='button' onClick = {this.addLike}>Like
              <b>{this.state.like} </b> 
            </button>
          </li>
          <li>
            <button type='button' onClick = {this.addBookmark}>Bookmark</button>
          </li>                        
          <li>
            <button type='button' >Bookmark</button>
          </li>
          <li className = 'icon-button'>
            <button type='button'>Bookmark</button>
          </li>    
        </ul>
      </div>
    )
  }
}

export default Tools

// style={{background: this.state.color }}