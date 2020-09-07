import React, { Component } from 'react'
import { database, databaseDictionary } from '../db/Firebase'
import { GoPlus } from 'react-icons/go'
import '../css/DictionarySearch.css';

export class DictionarySearch extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      searchValue: '',
      searchedList: [],
    }
    this.getFilteredDictionary = this.getFilteredDictionary.bind(this)
  }

  /**
   * get all cards that match your input text
   */
  getFilteredDictionary(e) {
    const { searchValue } = this.state
    let fetchData = []
    let value = e.target.value
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if(searchValue.match(/(\p{Script=Hani})+/gu) && keycode === 13){
      console.log('enter press here! ')
      databaseDictionary.orderByKey().startAt(value).endAt(value +"\uf8ff").once('value', (snapshot) => {
        Object.entries(snapshot.val()).forEach(([key, value]) => {
         fetchData.push({
            id: key,
            description: value.description,
            jyut: value.jyutping,
            pin: value.pinyin,
            char: value.word
          })
        })
        this.setState({
          searchedList: fetchData,
        })
      })
    }
  }

  /**
   * adds cards to the flashcard deck
   */
  addCard = (card) => {
    database.push().set(card);
    alert("card has been added")
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
    const { searchValue, searchedList } = this.state
    console.log(searchValue, searchedList)
    return (
      <div>
        <input className="search-box" name="search" type="text" placeholder="search card in chinese..." autocomplete="off" value={this.state.searchValue} onChange={(e) => this.setState({ searchValue: e.target.value, searchedList: [] })} onKeyPress={(e) => this.getFilteredDictionary(e)}/>
        <div className="dictionary-search-container">  
          {searchValue.match(/(\p{Script=Hani})+/gu) && searchedList && searchedList.length !== 0 ? (
            searchedList.map(values => {
              return (
                <div className="dictionary-card-search-container">
                  <div className="dictionary-search-card">
                    <div className="add-card" onClick={() => this.addCard({eng: values.description[0], pin: values.pin[0].replace(/[\[\]']+/g,''), han: values.id})}>
                      <GoPlus />
                    </div>
                    <div className="eng-dictionary-search">{values.description[0]}</div>
                    <div className="pin-dictionary-search">{values.pin[0].replace(/[\[\]']+/g,'')}</div>
                    <div className="han-dictionary-search" onClick={() => this.textToSpeech(values.id)}>{values.id}</div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="initial-container">Try to search for a word!</div>
          )}
        </div>
      </div>
    )
  }
}

export default DictionarySearch
