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
    
    databaseLearned.on('child_added', snap => {
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

  onChange = (e) => {
    this.filterCards(e)
  }

  filterCards = (e) => {
    const { searchValue } = this.state
    var cardList = this.state.cardSearch;
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

  render() {
    const { searchValue, filteredList } = this.state;
    return (
      <div className="search-div">

        <input className="search-box" name="search" type="text" placeholder="search card..." autocomplete="off" value={this.state.searchValue} onChange={(e) => (this.setState({ searchValue: e.target.value }), this.filterCards(e))}/>
        <div className="search-container">
          {searchValue === '' ? this.state.cardSearch.map((card) => {
              return (
                <div className="card-search-container">
                  <div className="search-card">
                    <div className="eng-search">{card.eng}</div>
                    <div className="pin-search">{card.pin}</div>
                    <div className="han-search">{card.han}</div>
                  </div>
                </div>
              )
            }) :
              filteredList.map((card) => {
                return (
                  <div className="card-search-container">
                    <div className="search-card">
                      <div className="eng-search">{card.eng}</div>
                      <div className="pin-search">{card.pin}</div>
                      <div className="han-search">{card.han}</div>
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