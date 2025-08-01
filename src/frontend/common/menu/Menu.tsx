import MenuIcon from './Menu.svg';
import './Menu.css';
import React from 'react';

export default class Menu extends React.Component {

    openMenu(){
        console.log('Menu opened');
    }

  render() {
    return (
      <div className="menu">
        <button className='menu-open' onClick={() => this.openMenu()}>
            <img src={MenuIcon} alt="Menu" />
        </button>
      </div>
    );
  }
}