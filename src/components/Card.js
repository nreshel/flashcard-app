import React, { Component } from 'react'
import firebase from 'firebase';
import { ImArrowLeft2, ImArrowRight2 } from 'react-icons/im'
import { GrRotateRight } from 'react-icons/gr'
import '../css/Card.css';

  export class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      card_flip: false
    }
    this.database = firebase.database().ref().child('cards');
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
    const { card_flip } = this.state
    return (
      <div>
        <div style={{"display": "inline-flex", "paddingRight": "1%", "color": "red"}}>{this.props.cards.length}</div>
        <div style={{"display": "inline-flex", "paddingLeft": "1%", "color": "blue"}}>{this.props.cardsDone.length}</div>
        <div className="card-container">
          <div className={`card ${card_flip ? "card-toggle" : ''}`}>
            <div className="front">
              <div className="rotation-btn">
                <GrRotateRight onClick={() => this.setState({ card_flip: !this.state.card_flip })} />
              </div>
              <button className="del" onClick={this.props.removeCard.bind(this, this.props.card)}>X</button>
              <div className="eng">{this.props.card.eng}</div>
            </div>
            <div className="back">
              <div className="rotation-btn">
                <GrRotateRight onClick={() => this.setState({ card_flip: !this.state.card_flip })} />
              </div>
              <button className="del" onClick={this.props.removeCard.bind(this, this.props.card)}>X</button>
              <div className="han" onClick={() => this.textToSpeech(this.props.card.han)}>{this.props.card.han}</div>
              <div className="pin">{this.props.card.pin}</div>
            </div>
          </div>
          <ImArrowLeft2 className="left-arrow" onClick={this.props.prevCard.bind(this)} />
          <ImArrowRight2 className="right-arrow" onClick={this.props.nextCard.bind(this)} />
        </div>
        <button onClick={this.props.cardLearned.bind(this, this.props.card)}>Done</button>
        <button onClick={this.props.forgotCard.bind(this, this.props.card)}>Forgot</button>
      </div>
    )
  }
}

export default Card;