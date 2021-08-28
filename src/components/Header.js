import React from 'react';
import logo from '../logo.svg';

function Header() {
  return (
    <header className="header">
      <a href={logo} className="header__logo" target="_self"></a>
    </header>
  )
}

export default Header;