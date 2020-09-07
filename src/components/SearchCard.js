import React, { Component } from 'react'
import { database, databaseLearned } from '../db/Firebase'
import '../css/SearchCard.css'

  export class SearchCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredList: [],
      searchValue: '',
      cards: [],
      cardsDone: [],
      cardSearch: []
    }
  }

  componentWillMount() {
    const dbCards = this.state.cards;
    const dbCardsDone = this.state.cardsDone;
    database.on('child_added', snap => {
      dbCards.push({ // pushes all the cards from learning database
        id: snap.key,
        eng: snap.val().eng,
        han: snap.val().han,
        pin: snap.val().pin,
        done: snap.val().done
      })
      this.setState({
        cards: dbCards, // save all pushed entities from learning database to state
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
   * Filters card based on english input
   */
  filterCards = (e) => {
    const { searchValue, cardSearch } = this.state
    var cardList = cardSearch;
    var filteredCards = [];
    var value = searchValue.toLowerCase();

    if(value === "") {
      filteredCards = [];
    } else {
      filteredCards = cardList.filter((card) => {
        var cardEng = card.eng.toLowerCase();
        return cardEng.includes(value);
      })
    }
    this.setState({
      filteredList: filteredCards
    }) 
  }
  
  /**
   * Removes the card from the cards database
   */
  removeCard = (card) => {
    const { cards, cardsDone } = this.state
    console.log(card);
    if(cards.includes(card)) {
      database.child(card.id).remove()
      let newCards = cards.filter(cardValue => cardValue !== card)
      console.log(newCards)
      this.setState({
        cards: newCards,
        cardSearch: [...newCards, ...cardsDone]
      })
      console.log("the original database")
    } 
    if(cardsDone.includes(card)) {
      let newLearnedCards = cardsDone.filter(cardValue => cardValue !== card)
      databaseLearned.child(card.key).remove()
      console.log(newLearnedCards)
      this.setState({
        cardsDone: newLearnedCards,
        cardSearch: [...cards, ...newLearnedCards]
      })

      console.log(card.id)
    }
  }

  /**
   * When chinese word is click converts text to speech output
   */
  textToSpeech(word) {
    if (!window.speechSynthesis) {
      alert('Your browser doesn\'t support text to speech.\nTry Chrome 33+ :)');
    } else {
      const utterance = new SpeechSynthesisUtterance();

      utterance.text = word;
      utterance.lang = "zh";

      speechSynthesis.speak(utterance);
    }
  }

  render() {
    const { searchValue, filteredList } = this.state;
    return (
      <div className="search-div">

        <input className="search-box" name="search" type="text" placeholder="search card in english..." autocomplete="off" value={this.state.searchValue} onChange={(e) => (this.setState({ searchValue: e.target.value }), this.filterCards(e))}/>
        <div className="search-container">
          {searchValue === '' ? this.state.cardSearch.map((card) => {
              return (
                <div className="card-search-container">
                  <div className="search-card">
                    <button className="del" onClick={() => this.removeCard(card)}>X</button>
                    <div className="eng-search">{card.eng}</div>
                    <div className="pin-search">{card.pin}</div>
                    <div className="han-search" onClick={() => this.textToSpeech(card.han)}>{card.han}</div>
                  </div>
                </div>
              )
            }) :
              filteredList.map((card) => {
                return (
                  <div className="card-search-container">
                    <div className="search-card">
                      <button className="del" onClick={() => this.removeCard(card)}>X</button>
                      <div className="eng-search">{card.eng}</div>
                      <div className="pin-search">{card.pin}</div>
                      <div className="han-search" onClick={() => this.textToSpeech(card.han)}>{card.han}</div>
                    </div>
                  </div>
                )
              })
            }
        </div>
      </div>
    )
  }
}

export default SearchCard;