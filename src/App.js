import React, { Component } from 'react'
import AddCard from './components/AddCard';
import SearchCard from './components/SearchCard';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './components/NavBar';
import './App.css';
import FlashCards from './components/FlashCards';
export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {

    }
  }

  render() {
    console.log(this.state.cardSearchList)
    return (
      <React.Fragment>
        <Router>
          <NavBar />

          <Switch>
            <Route exact path="/" component={FlashCards} />
            <Route exact path="/search-card" component={SearchCard} />
            <Route exact path="/add-card" component={AddCard} />
          </Switch>
        </Router>
    </React.Fragment>
    )
  }
}

export default App;