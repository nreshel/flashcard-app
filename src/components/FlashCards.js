import React, { Component } from 'react'
import Card from './Card';
import { database, databaseLearned } from '../db/Firebase'
import '../css/FlashCards.css'

export class FlashCards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      cardsDone: [],
      cardSearch: [],
      card: {},
      index: 0,
      isOpen: false,
    }
  }

  componentWillMount() {
    const dbCards = this.state.cards;
    const dbCardsDone = this.state.cardsDone;
    console.log("getting the new data")
    database.once('child_added', snap => {
      dbCards.push({ // pushes all entities from learning database to dbCards
        id: snap.key,
        eng: snap.val().eng,
        han: snap.val().han,
        pin: snap.val().pin,
        done: snap.val().done
      })
      this.setState({
        cards: dbCards, // gets all the entities in dbCards and saves it into the state
        card: this.state.cards[0],
        index: 0
      })
    })
    
    databaseLearned.once('child_added', snap => {
      if((snap.val().date - Date.parse(new Date())) < 0) {
        databaseLearned.child(snap.key).remove(); // removes from the learned database 
        database.push().set({ // pushes card to the learning database
          id: snap.val().id,
          eng: snap.val().eng,
          han: snap.val().han,
          pin: snap.val().pin,
          done: snap.val().done
        })
      } else {
        dbCardsDone.push({ // gets cards from the learned database
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

  /**
   * Resets the current state
   */
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
  removeCard = (card) => {
    console.log(card.id);
    this.resetState();
    var refList = [];
    console.log(refList);
    database.child(card.id).remove();
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
    database.on('child_added', snap => {
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
    const { cards } = this.state
    var day = new Date();
    console.log(day);

    var nextDay = new Date(day);
    const tomorrow = nextDay.setDate(day.getDate()+(card.done ? card.done+1 : 1));
    console.log(card, tomorrow);
    databaseLearned.push().set({
      id: card.id,
      eng: card.eng,
      pin: card.pin,
      han: card.han,
      done: card.done ? card.done + 1 : 1,
      date: tomorrow
    });
    let newList = cards.filter(cardValue => cardValue !== card)
    database.child(card.id).remove();
    this.setState({
      cards: newList,
      card: cards[0],
      index: 0
    });
  }

  /**
   * Resets the amount of times you've learned a card so it will show up more frequently
   */
  forgotCard = (card) => {
    const { cards, index } = this.state
    console.log(card)
    database.child(card.id).set({
      id: card.id,
      eng: card.eng,
      pin: card.pin,
      han: card.han,
      done: 0,
      date: 0
    })
    let newList = cards.filter(cardValue => {
      if(cardValue == card) {
        cardValue['done'] = 0
        cardValue['date'] = 0
      }
      return cardValue
    })
    this.setState({
      cards: newList,
      card: cards[index],
      index: index
    })
  }
  
  render() {
    return (
      <div className="App">
        <div className="container">
          <h1 class="title">Flashcard app</h1>
          <Card card={this.state.card} cards={this.state.cards} cardsDone={this.state.cardsDone} prevCard={this.prevCard} nextCard={this.nextCard} removeCard={this.removeCard} cardLearned={this.cardLearned} forgotCard={this.forgotCard}/>
        </div>
      </div>
    )
  }
}

export default FlashCards
