import React, { Component } from 'react'
import firebase from 'firebase';
import '../css/Card.css';
export class Card extends Component {
    constructor(props) {
        super(props);
        this.database = firebase.database().ref().child('cards');
    }
    render() {
        return (
            <div>
                <div style={{"display": "inline-flex", "paddingRight": "1%", "color": "red"}}>{this.props.cards.length}</div>
                <div style={{"display": "inline-flex", "paddingLeft": "1%", "color": "blue"}}>{this.props.cardsDone.length}</div>
                <div className="card-container">
                    <div className="card">
                        <div className="front">
                            <button className="del" onClick={this.props.removeCard.bind(this, this.props.card.id)}>X</button>
                            <div className="eng">{this.props.card.eng}</div>
                        </div>
                        <div className="back">
                            <button className="del" onClick={this.props.removeCard.bind(this, this.props.card.id)}>X</button>
                            <div className="han">{this.props.card.han}</div>
                            <div className="pin">{this.props.card.pin}</div>
                        </div>
                    </div>
                </div>
                <button onClick={this.props.prevCard.bind(this)}>Prev</button>
                <button onClick={this.props.nextCard.bind(this)}>Next</button>
                <button onClick={this.props.cardLearned.bind(this, this.props.card)}>Done</button>
                <button onClick={this.props.forgotCard.bind(this, this.props.card)}>Forgot</button>
            </div>
        )
    }
}

export default Card;