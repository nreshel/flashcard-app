import React, { Component } from 'react'
import firebase from 'firebase';
import RegSignToggle from './components/RegSignToggle'
import Register from './components/Register'
import SignIn from './components/SignIn'
import AddCard from './components/AddCard';
import SearchCard from './components/SearchCard';
import DictionarySearch from './components/DictionarySearch'
import ParseDictionary from './components/ParseDictionary'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './components/NavBar';
import './App.css';
import FlashCards from './components/FlashCards';
export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      isLoggedIn: false,
      userId: "",
      cardSearch: {}
    }
  }
  
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
        this.setState({ isLoggedIn: true, userId: uid })
        console.log("user currently logged in")
      } else {
        // User is signed out.
        // ...
        this.setState({ isLoggedIn: false })
        console.log("user not logged in")
      }
    });
  }

  render() {
    const { isLoggedIn, userId } = this.state
    console.log(window.location.pathname)
    console.log(this.state.cardSearchList)
    console.log(isLoggedIn, userId)
    return (

      <React.Fragment>
        <Router>
          { isLoggedIn ?
            <NavBar /> : null}
          <Switch>
            <Route exact path="/" render={(...props) => isLoggedIn ? <FlashCards userId={this.state.userId} /> : <RegSignToggle />} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/sign-in" component={SignIn} />
            <Route exact path="/search-card" render={(...props) => isLoggedIn ? <SearchCard userId={this.state.userId}/> : null} />
            <Route exact path="/add-card" render={(...props) => isLoggedIn ? <AddCard userId={this.state.userId}/> : null} />
            <Route exact path="/dictionary-search" render={(...props) => isLoggedIn ? <DictionarySearch userId={this.state.userId} /> : null} />
            <Route exact path="/dictionary-parser" component={ParseDictionary} />
          </Switch>
        </Router>
    </React.Fragment>
    )
  }
}

export default App;