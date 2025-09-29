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
    const token = localStorage.getItem('jwt');
    let isLoggedIn = !!token;
    let isAdmin = false;
    if (token) {
      try {
        const base64 = token.split('.')[1];
        if (base64) {
          const json = atob(base64.replace(/-/g, '+').replace(/_/g, '/'));
          const payload = JSON.parse(json);
          console.log('JWT payload:', payload);
          isAdmin = payload.role === 'admin';
        }
      } catch (e) {
        console.warn('JWT decode error:', e);
        isAdmin = false;
      }
    }
    return (
      <div className={'menu ' + (this.state.isMenuVisible ? 'is-visible' : '')}>
        <button className="menu-toggle" onClick={() => this.toggleMenu()}>
          <img src={menuIcon} alt="Open menu" />
        </button>
        <div className="menu-panel">
          <div className="menu-panel-box">
            <MenuLink
              text="Home"
              link="/"
              icon="home"
              onClick={() => this.toggleMenu()}
            />
            {isLoggedIn && (
              <MenuLink
                text="Manage TV Shows"
                link="/manage/tv-shows"
                icon="tv"
                onClick={() => this.toggleMenu()}
              />
            )}
            {isAdmin && (
              <MenuLink
                text="Admin TV Shows"
                link="/admin/tv-shows"
                icon="admin"
                onClick={() => this.toggleMenu()}
              />
            )}
            {!isLoggedIn && (
              <MenuLink
                text="Login"
                link="/login"
                icon="login"
                onClick={() => this.toggleMenu()}
              />
            )}
            {isLoggedIn && (
              <MenuLink
                text="Log out"
                link="/login"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem('jwt');
                  window.dispatchEvent(new Event('loginStateChanged'));
                  this.toggleMenu();
                }}
                icon="login"
              />
            )}
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
