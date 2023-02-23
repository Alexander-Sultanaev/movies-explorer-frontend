import React from "react";
import { Link, } from "react-router-dom"
import './Header.css';
import Navigation from "../Navigation/Navigation";
import MenuBurger from "../MenuBurger/MenuBurger";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  function openMenu() {
    setIsMenuOpen(true);
  }
  function closeMenu() {
    setIsMenuOpen(false);
  }
  return (
      <header className="header">
        <div className="header__container">
          <Link className="header__logo" to='/'></Link>
          <Navigation openMenu={openMenu}/>
          <MenuBurger isOpen={isMenuOpen} closeMenu={closeMenu} />
        </div>
      </header>
  );
};

export default Header;