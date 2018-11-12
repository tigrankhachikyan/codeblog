import React, { Component } from "react"
import './index.css';
import PostBody from './PostBody';
import Tools from './tools';
import Comments from  './comments';



class App extends Component {
    render() {
        return (


            <div  className = 'app'>
                <div className = 'test'> 
                    <Tools/>
                    <PostBody/>
                </div>
                    <Comments/>
            </div>
            
        )
    }
}

export default App;
