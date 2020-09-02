import React, {Component} from 'react';
import { AiFillHome } from 'react-icons/ai'
 
import '../css/NavBar.css'

export default class NavBar extends Component {
 
  constructor(){
    super();
    this.state = {
      style:"menu",
      menuStatus:"open"
    };
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick() {
    switch(this.state.menuStatus)
    {
      case "open":
        this.setState({
          menuStatus:"close",
          style:"menu active"
        });
        break;
      case "close":
        this.setState({
          menuStatus:"open",
          style:"menu"
        });
        break;
    }        
  }

  render() {
    return (      
      <React.Fragment>
        <div className="sidebar">
          <a href="/">
            <AiFillHome /> Home
          </a>
          <a href="/search-card">
            <i className="fa fa-fw fa-wrench" /> Search Card
          </a>
          <a href="/add-card">
            <i className="fa fa-fw fa-user" /> Add Card
          </a>
          <a href="#contact">
            <i className="fa fa-fw fa-envelope" /> Contact
          </a>
        </div>

      </React.Fragment>
    );
  }
}