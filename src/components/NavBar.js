import React, {Component} from 'react';
import { AiFillHome } from 'react-icons/ai'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { AiOutlineSearch, AiOutlinePlus, AiOutlineFileSearch } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import '../css/NavBar.css'

export default class NavBar extends Component {
 
  constructor(){
    super();
    this.state = {
      style:"menu",
      menuStatus:"open",
      isOpen: false
    };
  };

  render() {
    return (      
      <React.Fragment>
        {this.state.isOpen ? (
          <div className={`sidebar`} >
            <a href="/">
              <AiFillHome /> <span>Home</span>
            </a>
            <a href="/search-card">
              <AiOutlineSearch /> <span>Search Card</span>
            </a>
            <a href="/add-card">
              <AiOutlinePlus /> <span>Add Card</span>
            </a>
            <a href="/dictionary-search">
              <AiOutlineFileSearch /> <span>Dictionary Search</span>
            </a>
            <div className="arrow-toggle" onClick={() => this.setState({isOpen: !this.state.isOpen})}>
              <MdKeyboardArrowLeft />
            </div>
          </div>
        ) : (
          <div className="hamburger-nav" onClick={() => this.setState({isOpen: !this.state.isOpen})}>
            <GiHamburgerMenu />
          </div>
        )}

      </React.Fragment>
    );
  }
}