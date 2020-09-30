import React, { Component } from 'react'
import firebase from 'firebase'
import '../css/SignIn.css'

export class SignIn extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       signInUser: '',
       signInPass: ''
    }
  }
  
  onSubmit = (e) => {
    const { signInUser, signInPass } = this.state
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(signInUser, signInPass)
      .then(() => {
        this.props.history.push("/")
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
    this.setState({
      signInUser: '',
      signInPass: ''
    })
  }
  
  render() {
    return (
      <div className="signin-container">
        <h3>Sign In</h3>
        <form >
          <input type="text" name="eng" autocomplete="off" placeholder="Email" value={this.state.signInUser} onChange={(e)=> this.setState({signInUser: e.target.value})}/><br/>
          <div className="divider"></div>
          <input type="password" name="eng" autocomplete="off" placeholder="Password" value={this.state.signInPass} onChange={(e) => this.setState({signInPass: e.target.value})}/><br/>
          <button className="submit-button" onClick={(e) => this.onSubmit(e)}>Submit</button>
        </form>
      </div>
    )
  }
}

export default SignIn
