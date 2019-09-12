import React, { Component } from 'react'
// import { DB_CONFIG } from '../db/Firebase.js';
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
            <form onSubmit={this.onSubmit} className="form">
                <div className="form-section">
                    <input type="text" name="eng" autocomplete="off" value={this.state.eng} onChange={this.onChange}/>
                    <label for="eng" className="label-name">
                        <span className="content-name">English: </span>
                    </label>
                </div>
                <div className="form-section">
                    <input type="text" name="pin" autocomplete="off" value={this.state.pin} onChange={this.onChange}/>
                    <label for="pin" className="label-name">
                        <span className="content-name">Pinyin: </span>
                    </label>
                </div>
                <div className="form-section">
                    <input type="text" name="han" autocomplete="off" value={this.state.han} onChange={this.onChange}/>
                    <label for="han" className="label-name">
                        <span className="content-name">Hanzi: </span>
                    </label>
                </div>
                <input type="submit" value="submit" className="btn" />
            </form>
        )
    }
}

export default AddCard;