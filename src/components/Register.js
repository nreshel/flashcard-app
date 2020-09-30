import React, { Component } from 'react'
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { databaseUser } from '../db/Firebase'
import '../css/Register.css'

export class Register extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       regUser: '',
       regPass: '',
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e) => {
    const { regUser, regPass } = this.state
    e.preventDefault()
    firebase.auth().createUserWithEmailAndPassword(regUser, regPass)
      .then((userCreds) => {
        return (        
          firebase.database().ref('/users/' + userCreds.user.uid).set({
            email: userCreds.user.email,
            uid: userCreds.user.uid,
          }),
          this.props.history.push("/")
        )
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
    this.setState({
      regUser: '',
      regPass: ''
    })
  }
  
  render() {
    return (
      <div className="register-container">
        <h3>Register</h3>
        <form >
          <input type="text" name="eng" autocomplete="off" placeholder="Email" value={this.state.regUser} onChange={(e)=> this.setState({regUser: e.target.value})}/><br/>
          <div className="divider"></div>
          <input type="password" name="eng" autocomplete="off" placeholder="Password" value={this.state.regPass} onChange={(e) => this.setState({regPass: e.target.value})}/><br/>
          <button className="submit-button" onClick={(e) => this.onSubmit(e)}>Submit</button>
        </form>
      </div>
    )
  }
}

export default Register
