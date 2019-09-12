import React, { Component } from 'react'
import '../css/SearchCard.css'

export class SearchCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
        this.filterCards()
    }

    filterCards = (e) => {
        var cardList = this.props.cardSearch;
        var filteredCards = [];
        var search = e.target.value.toLowerCase();

        if(search === "") {
            filteredCards = [];
        } else {
            filteredCards = cardList.filter((card) => {
                var cardEng = card.eng.toLowerCase();
                return cardEng.includes(search);
            })
        }
        this.setState({
            list: filteredCards
        }) 
    }
    
    render() {
        return (
            <div>
                {
                    this.state.list.map((card) => {
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
                <input className="search-box" name="search" type="text" placeholder="search card..." autocomplete="off" value={this.state.title} onChange={this.filterCards.bind(this)}/>
            </div>
        )
    }
}

export default SearchCard;