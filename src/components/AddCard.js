import React, { Component } from 'react'
import '../css/AddCard.css';
import firebase from 'firebase';

export class AddCard extends Component {
  constructor(props) {
  super(props);
  this.state = {
    eng: '',
    pin: '',
    han: '',
    done: 0
  }

  this.database = firebase.database().ref().child('cards');
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.database.push().set(this.state);
    this.setState({ 
        eng: '',
        pin: '',
        han: '',
    });
  }

  render() {
    return (
      <div>
        <div className="card-container">
          <div className="card">
            <div className="front">
              <div className="eng">{this.state.eng}</div>
            </div>
            <div className="back">
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