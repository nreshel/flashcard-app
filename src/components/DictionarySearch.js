import React, { Component } from 'react'
import { databaseDictionary } from '../db/Firebase'

export class DictionarySearch extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      searchValue: '',
      searchedList: []
    }
    this.getFilteredDictionary = this.getFilteredDictionary.bind(this)
  }
  // componentWillMount() {
  //   const { searchValue } = this.state
  //   let fetchData = []
  //   if(searchValue) {
  //     databaseDictionary.orderByKey().startAt(searchValue).endAt(searchValue +"\uf8ff").once('value', (snapshot) => {
  //       Object.entries(snapshot.val()).forEach(([key, value]) => {
  //         // console.log(value.description)
  //         fetchData.push({
  //           id: key,
  //           description: value.description,
  //           jyut: value.jyutping,
  //           pinyin: value.pinyin,
  //           char: value.word
  //         })
  //       })
  //       this.setState({
  //         searchValue: fetchData
  //       })
  //     })
  //   }
  // }

  getFilteredDictionary(e) {
    const { searchValue } = this.state
    let fetchData = []
    let value = e.target.value
    if(e.key === 'Enter'){
      console.log('enter press here! ')
      databaseDictionary.orderByKey().startAt(value).endAt(value +"\uf8ff").once('value', (snapshot) => {
        Object.entries(snapshot.val()).forEach(([key, value]) => {
          // console.log(value.description)
          fetchData.push({
            id: key,
            description: value.description,
            jyut: value.jyutping,
            pinyin: value.pinyin,
            char: value.word
          })
        })
        this.setState({
          searchedList: fetchData
        })
      })
    }
  }

  render() {
    const { searchValue, searchedList } = this.state
    console.log(searchValue, searchedList)
    return (
      <div>
        <input className="search-box" name="search" type="text" placeholder="search card..." autocomplete="off" value={this.state.searchValue} onChange={(e) => this.setState({ searchValue: e.target.value })} onKeyPress={(e) => this.getFilteredDictionary(e)}/>
        {searchValue ? (
          searchedList.map(values => {
            return (
              <div>{values.description}</div>
            )
          })
        ) : (
          <div>nothing for now</div>
        )}
      </div>
    )
  }
}

export default DictionarySearch
