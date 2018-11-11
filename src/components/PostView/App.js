import React, { Component } from "react"
import './index.css';
import PostView from './postview';
import Tools from './tools';
import Comments from  './comments';



class App extends Component {
    constructor (props) {
        super(props);
        
       


    }

    render() {
        return (


            <div  className = 'app'>
                <div className = 'test'> 
                    <Tools/>
                    <PostView/>
                </div>
                    <Comments/>
            </div>
            
        )
    }
}

export default App;
