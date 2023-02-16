import React from "react";
import Header from "../Header/Header.js";
import Promo from "../Main/Promo/Promo.js";
import NavTab from "../Main/NavTab/NavTab";
import AboutProject from "../Main/AboutProject/AboutProject";
import Techs from "../Main/Techs/Techs";
import AboutMe from "../Main/AboutMe/AboutMe.js";
import Footer from "../Footer/Footer.js";
import Portfolio from "../Main/Portfolio/Portfolio.js";

function Main({ loggedIn }) {
  return(
    <div className="page">
      <Header loggedIn={loggedIn}/>
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </div>
  );
};

export default Main;