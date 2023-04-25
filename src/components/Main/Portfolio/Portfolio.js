import './Portfolio.css';

const Portfolio = () => {
  return (
      <section className="portfolio">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__elements">
          <li className="portfolio__element">
            <a className="portfolio__link" href='https://github.com/Alexander-Sultanaev/how-to-learn' target='_blank' rel="noreferrer" >
              <p className="portfolio__text">Статичный сайт</p>
              <span className="portfolio__span">↗</span>
            </a>
          </li>
          <li className="portfolio__element">
            <a className="portfolio__link" href='https://github.com/Alexander-Sultanaev/mesto' target='_blank' rel="noreferrer" >
              <p className="portfolio__text">Адаптивный сайт</p>
              <span className="portfolio__span">↗</span>
            </a>
          </li>
          <li className="portfolio__element">
            <a className="portfolio__link" href='https://github.com/Alexander-Sultanaev/react-mesto-auth' target='_blank' rel="noreferrer" >
              <p className="portfolio__text">Одностраничное приложение</p>
              <span className="portfolio__span">↗</span>
            </a>
          </li>
        </ul>
      </section>
  );
};

export default Portfolio;