import React, { Component } from 'react'
import Card from './components/Card';
import AddCard from './components/AddCard';
import SearchCard from './components/SearchCard';
import { DB_CONFIG } from './db/Firebase.js';
import firebase from 'firebase';
import './App.css';
export class App extends Component {
  constructor(props) {
    super(props)
    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('cards');
    this.state = {
      cards: [],
      card: {}
    }
  }

  componentWillMount() {
    const dbCards = this.state.cards;
    this.database.on('child_added', snap => {
      dbCards.push({
        id: snap.key,
        eng: snap.val().eng,
        han: snap.val().han,
        pin: snap.val().pin
      })
      this.setState({
        cards: this.state.cards,
        card: this.updateCard(dbCards)
      })
    })
  }
  updateCard = (cards) => {
    const card = cards[Math.floor(Math.random() * cards.length)];
    return card;
  }
  nextCard = () => {
    this.setState({
      cards: this.state.cards,
      card: this.updateCard(this.state.cards)
    })
  }
  resetState = () => {
    this.setState({
      cards: [],
      card: {}
    })
  }
  removeCard = (id) => {
    console.log(id);
    this.resetState();
    var refList = [];
    console.log(refList);
    this.database.child(id).remove();
    var newCards = this.refreshCards(refList);
    this.setState({
      cards: newCards,
      card: this.updateCard(newCards)
    })
  }
  refreshCards = (cardList) => {
    this.database.on('child_added', snap => {
      cardList.push({
        id: snap.key,
        eng: snap.val().eng,
        han: snap.val().han,
        pin: snap.val().pin
      })
    })
    return cardList;
  }
  render() {
    return (
      <div className="App">
        <h1>Flashcard app</h1>
        <Card card={this.state.card} nextCard={this.nextCard} removeCard={this.removeCard}/>
        <AddCard />
        <SearchCard cards={this.state.cards}/>
      </div>
    )
  }
}

export default App;