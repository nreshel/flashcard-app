import React, { Component } from 'react'
import { database } from '../db/Firebase'
import { GrRotateRight } from 'react-icons/gr'
import '../css/AddCard.css';
import firebase from 'firebase';
import '../css/FlashCards.css'

export class AddCard extends Component {
  constructor(props) {
  super(props);
  this.state = {
      eng: '',
      pin: '',
      han: '',
      done: 0,
    card_flip: ''
  }

  this.database = firebase.database().ref().child('cards');
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault();
    database.push().set({eng: this.state.eng, pin: this.state.pin, han: this.state.han, done: this.state.done});
    this.setState({ 
        eng: '',
        pin: '',
        han: '',
    });
  }

  render() {
    const { card_flip } = this.state
    return (
      <div className="add-card-container">
        <div className="card-container">
          <div className={`card ${card_flip ? "card-toggle" : ''}`}>
            <div className="front">
              <div className="rotation-btn">
                <GrRotateRight onClick={() => this.setState({ card_flip: !this.state.card_flip })} />
              </div>
              <div className="eng">{this.state.eng}</div>
            </div>
            <div className="back">
              <div className="rotation-btn">
                <GrRotateRight onClick={() => this.setState({ card_flip: !this.state.card_flip })} />
              </div>
              <div className="han">{this.state.han}</div>
              <div className="pin">{this.state.pin}</div>
            </div>
          </div>
        </div>
        <div className="form-div">
          <form onSubmit={this.onSubmit}>
            <input type="text" name="eng" autocomplete="off" placeholder="input english..." value={this.state.eng} onChange={this.onChange}/><br/>
            <input type="text" name="pin" autocomplete="off" placeholder="input pinyin..." value={this.state.pin} onChange={this.onChange}/><br/>
            <input type="text" name="han" autocomplete="off" placeholder="input hanzi..." value={this.state.han} onChange={this.onChange}/><br/>
            <input type="submit" value="submit" className="btn" />
          </form>
        </div>
      </div>
    )
  }
}

export default AddCard;