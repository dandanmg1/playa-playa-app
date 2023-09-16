// Header.js

import React from 'react';
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <h1 className="header-title">Playa Playa</h1>
      <nav className="header-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <a className="nav-link" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/about">About</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
