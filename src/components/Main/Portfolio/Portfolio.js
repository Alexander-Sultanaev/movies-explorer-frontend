import React from "react";
import './Portfolio.css';

const Portfolio = () => {
  return (
      <section className="portfolio">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__element">
            <a className="portfolio__link" href='https://github.com/Alexander-Sultanaev/how-to-learn' target='_blank' rel="noreferrer" >Статичный сайт</a>
            <span className="portfolio__span">↗</span>
          </li>
          <li className="portfolio__element">
            <a className="portfolio__link" href='https://github.com/Alexander-Sultanaev/mesto' target='_blank' rel="noreferrer" >Адаптивный сайт</a>
            <span className="portfolio__span">↗</span>
          </li>
          <li className="portfolio__element">
            <a className="portfolio__link" href='https://github.com/Alexander-Sultanaev/react-mesto-auth' target='_blank' rel="noreferrer" >Одностраничное приложение</a>
            <span className="portfolio__span">↗</span>
          </li>
        </ul>
      </section>
  );
};

export default Portfolio;