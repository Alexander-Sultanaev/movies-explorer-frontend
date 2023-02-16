import React from "react";
import './NavTab.css';
import { Link } from 'react-scroll';
const NavTab = () => {
  return (
      <section className="nav-tab">
        <Link className="nav-tab__link" to="project" smooth={true} duration={1000}>О проекте</Link>
        <Link className="nav-tab__link" to="techs" smooth={true} duration={1000}>Технологии</Link>
        <Link className="nav-tab__link" to="about" smooth={true} duration={1000}>Студент</Link>
      </section>
  );
};

export default NavTab;