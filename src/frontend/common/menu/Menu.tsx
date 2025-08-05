import React from 'react';
import MenuLink from './menu-link/MenuLink';
import menuIcon from './menu.svg';
import './Menu.css';

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
          <img src={menuIcon} alt="Open menu" />
        </button>
        <div className="menu-panel">
          <div className="menu-panel-box">
            <MenuLink
              text="Home" link="/"
              icon="home"
              onClick={() => this.toggleMenu()}
            />
            <MenuLink
              text="Manage TV Shows" link="/manage/tv-shows"
              icon="tv"
              onClick={() => this.toggleMenu()}
            />
            <MenuLink
              text="Admin TV Shows" link="/admin/tv-shows"
              icon="admin"
              onClick={() => this.toggleMenu()}
            />
          </div>
          <div
            className="menu-panel-overlay"
            onClick={() => this.toggleMenu()}
          />
        </div>
      </div>
    );
  }
}
