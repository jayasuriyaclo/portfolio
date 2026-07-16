import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          JAYASURIYA
          <span>WWW.JAYASURIYA.COM</span>
        </div>
        <nav className="nav">
          <a href="#home" className="nav-link">Home</a>
          <a href="#blog" className="nav-link">Blog</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
