import React from 'react';
import logo from '../logo.svg';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <a href={logo} className="header__logo" target="_self"></a>
      </header>
    )
  }  
}

export default Header;