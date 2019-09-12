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
    this.databaseLearned = this.app.database().ref().child('cards-learned');
    this.state = {
      cards: [],
      cardsDone: [],
      cardSearch: [],
      card: {},
      index: 0
    }
  }

  componentWillMount() {
    const dbCards = this.state.cards;
    const dbCardsDone = this.state.cardsDone;
    this.database.on('child_added', snap => {
      dbCards.push({
        id: snap.key,
        eng: snap.val().eng,
        han: snap.val().han,
        pin: snap.val().pin,
        done: snap.val().done
      })
      this.setState({
        cards: dbCards,
        card: this.state.cards[0],
        index: 0
      })
    })
    
    this.databaseLearned.on('child_added', snap => {
      if((snap.val().date - Date.parse(new Date())) < 0) {
        this.databaseLearned.child(snap.key).remove();
        this.database.push().set({
          id: snap.val().id,
          eng: snap.val().eng,
          han: snap.val().han,
          pin: snap.val().pin,
          done: snap.val().done
        })
      } else {
        dbCardsDone.push({
          key: snap.key,
          id: snap.val().id,
          eng: snap.val().eng,
          han: snap.val().han,
          pin: snap.val().pin,
          done: snap.val().done,
          date: snap.val().date
        })
        this.setState({
          cardsDone: dbCardsDone.filter(cardDone => cardDone.date - Date.parse(new Date()) > 0),
          cardSearch: [...dbCards, ...dbCardsDone]
        })
      }
    })
  }
  /**
   * get the next element by retrieving the index
   */
  updateNextCard = (cards) => {
    var i = this.state.index;
    if(!(i+1 in cards)) {
      return cards[0];
    } else {
      return cards[i+1];
    }
    // const card = cards[Math.floor(Math.random() * cards.length)];
    // return card;
  }
  /**
   * increase the index to point to the next element in the cards list
   */
  appendIndex = (index) => {
    var list = this.state.cards;
    if(index+1 > list.length - 1) {
      return 0;
    } else {
      return index + 1;
    }
  }
  /**
   * Gets the next card
   */
  nextCard = () => {
    this.setState({
      cards: this.state.cards,
      card: this.updateNextCard(this.state.cards),
      index: this.appendIndex(this.state.index)
    })
    var cardsDonezo = this.state.cardsDone;
    // var cardSearched = this.state.cardSearch;

    cardsDonezo.map((card) => {
      return console.log(Date.parse(new Date()));
    })
    console.log(this.state.cardsDone, this.state.cardSearch);
  }

  /**
   * Helps get the previous element by retrieving the index
   */
  updatePrevCard = (cards) => {
    var i = this.state.index;
    if(!(i-1 in cards)) {
      return cards[cards.length - 1];
    } else {
      return cards[i-1];
    }
    // const card = cards[Math.floor(Math.random() * cards.length)];
    // return card;
  }
 
  /**
   * Subtracts the index of the cards list to point to the previous element
   */
  subtractIndex = (index) => {
    var list = this.state.cards;
    if(index-1 < 0) {
      return list.length - 1;
    } else {
      return index - 1;
    }
  }
  /**
   * Goes back to the previous card in the cards database
   */
  prevCard = () => {
    this.setState({
      cards: this.state.cards,
      card: this.updatePrevCard(this.state.cards),
      index: this.subtractIndex(this.state.index)
    })
  }
  resetState = () => {
    this.setState({
      cards: [],
      card: {},
      index: 1
    })
  }
  /**
   * Removes the card from the cards database
   */
  removeCard = (id) => {
    console.log(id);
    this.resetState();
    var refList = [];
    console.log(refList);
    this.database.child(id).remove();
    var newCards = this.refreshCards(refList);
    this.setState({
      cards: newCards,
      card: newCards[0],
      index: 1
    })
  }
  /**
   * Refreshes cards when action occurs
   */
  refreshCards = (cardList) => {
    this.database.on('child_added', snap => {
      cardList.push({
        id: snap.key,
        eng: snap.val().eng,
        han: snap.val().han,
        pin: snap.val().pin,
        done: snap.val().done,
        date: snap.val().date
      })
    })
    return cardList;
  }
  /**
   * When done learning a card delete card from card database and transfer it to cards-learned database
   */
  cardLearned = (card) => {
    var day = new Date();
    console.log(day); // Apr 30 2000

    var nextDay = new Date(day);
    const tomorrow = nextDay.setDate(day.getDate()+(card.done+1));
    let refList = []
    // console.log(nextDay);
    // var date = tomorrow.getFullYear()+'-'+(tomorrow.getMonth()+1)+'-'+tomorrow.getDate();
    console.log(card.done, tomorrow);
    this.databaseLearned.push().set({
      id: card.id,
      eng: card.eng,
      pin: card.pin,
      han: card.han,
      done: card.done + 1,
      date: tomorrow
    });
    this.database.child(card.id).remove();
    let newList = this.refreshCards(refList)
    this.setState({
      cards: newList,
      card: this.state.cards[0],
      index: 0
    });
  }
  forgotCard = (card) => {
    let refList = [];
    this.database.child(card.id).set({
      id: card.id,
      eng: card.eng,
      pin: card.pin,
      han: card.han,
      done: 0,
      date: 0
    })
    let newList = this.refreshCards(refList)
    this.setState({
      cards: newList,
      card: this.state.cards[this.state.index],
      index: this.state.index
    })
  }
  render() {
    return (
      <div className="App">
        <h1>Flashcard app</h1>
        <Card card={this.state.card} cards={this.state.cards} cardsDone={this.state.cardsDone} prevCard={this.prevCard} nextCard={this.nextCard} removeCard={this.removeCard} cardLearned={this.cardLearned} forgotCard={this.forgotCard}/>
        <AddCard />
        <SearchCard cardSearch={this.state.cardSearch}/>
      </div>
    )
  }
}

export default App;