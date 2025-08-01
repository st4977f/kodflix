import MenuIcon from './Menu.svg';
import './Menu.css';
import React from 'react';

type MenuProps = {};
type MenuState = { isMenuVisible: boolean };

export default class Menu extends React.Component<MenuProps, MenuState> {
  constructor(props: MenuProps) {
    super(props);
    this.state = { isMenuVisible: false };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ isMenuVisible: !this.state.isMenuVisible });
  }

  render() {
    return (
      <div className={'menu ' + (this.state.isMenuVisible ? 'is-visible' : '')}>
        <button className="menu-toggle" onClick={() => this.toggleMenu()}>
          <img src={MenuIcon} alt="Open menu" />
        </button>
        <div className="menu-panel">
          <div className="menu-panel-box">Hello menu!</div>
          <div
            className="menu-panel-overlay"
            onClick={() => this.toggleMenu()}
          />
        </div>
      </div>
    );
  }
}
