//import "./SignIn.css";
import React, { Component } from "react";
import {
  Redirect,
  Link
} from "react-router-dom";


class ForgetPassword extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       redirectToReferrer: false,
//       email: null,
//       password: null
//     };
//   }
  
  render() {
    
    // let { from } = this.props.location.state || { from: { pathname: "/" } };
    // let { redirectToReferrer } = this.state;

    // if (auth) return <Redirect to={from} />;

    // if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div className='conteniner-signin'>
      <span className='signInText'>Forget Pasword</span> 
      <hr/>
      <input 
        type="email" 
        placeholder='Email'
        className = 'signInInput'
        onChange={e => this.setState({email: e.target.value})}
      />

      
      <hr/>
      
    
      
      <button 
        className='logInButton' 
        onClick={this.logInwithEmailAndPassword}
      > Submit </button>
    </div>

    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default ForgetPassword;