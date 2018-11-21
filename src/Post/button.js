import React, { Component } from 'react';
<<<<<<< HEAD
class Button extends Component {
    constructor(props) {
=======
// import ListOrGrid from './info';
class Button extends Component {
    constructor(props) {
        // console.log(props.sendState);
>>>>>>> 929d6e804dbc0c53b1ab84f3b44bf27e5575955f
        super(props)
        this.state = {
            isClickOnList: props.sendState
        }
        this.click = this.click.bind(this);
    }

   click() {
        this.setState({
            isClickOnList: !(this.state.isClickOnList)
        });
    }
    render() {
        if (this.state.isClickOnList === true) {
            return <div >
                <input type='button'
                    value='List'
                    className="buttonStyle"
                    onClick={this.click}
                    >
                </input>
            </div>
        }else{
        return (
            <div >
                <input type='button'
                    value='Grid'
                    className="buttonStyle"
                    onClick={this.click}
                    >
                </input>
            </div>
        );
        }
    }
}
export default Button







<<<<<<< HEAD
=======


// import React, { Component } from 'react';
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";

// import * as actions from "./actions";

// import './index.css';
// import ListOrGrid from './Post/info';
// import Button from './Post/button';

// class Home extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             isShow: true
//         }
//         this.handleClick = this.handleClick.bind(this);
//     }
//     handleClick() {
//         this.setState({
//             isShow: !(this.state.isShow)
//         });
//     }

//     componentDidMount() {
//         const { latestPosts, fetchPosts } = this.props;
//         if (latestPosts.length) return;
//         fetchPosts();
//     }

//     render() {
//         const { latestPosts } = this.props;
//         return (
//             <div className="Home">
//                 <div onClick={this.handleClick}>
//                     <Button sendState={this.state.isShow} />
//                 </div>
//                 <h1>Code Blog</h1>
//                 {
//                     latestPosts.map((post, i) => {
//                         console.log(post);
//                         // Here should be Viktors' code
//                         return (
//                             <div key={i}>
//                                 <Link to={`/posts/${post.postId}`}>
//                                     <ListOrGrid title={post.data.title} date={post.data.date_created.seconds} sendValue={this.state.isShow} />
//                                 </Link>
//                             </div>
//                         );
//                     })
//                 }
//             </div>
//         );
//     }
// }

// const mapStateToProps = ({ data }) => {
//     return {
//         latestPosts: data.latestPosts
//     };
// };

// export default connect(mapStateToProps, actions)(Home);
>>>>>>> 929d6e804dbc0c53b1ab84f3b44bf27e5575955f
