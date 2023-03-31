import Photo from "../../../images/Photo.jpg"
import './AboutMe.css';

const AboutMe = () => {
  return (
      <section className="about" id="about">
        <h2 className="about__title">Студент</h2>
        <div className="about__container">
          <div className="about__content">
            <h3 className="about__name">Александр</h3>
            <p className="about__job">Фронтенд-разработчик, 28 лет</p>
            <p className="about__info">Я родился и живу в Оренбурге, закончил Поволжский государственный университет телекоммуникаций и информатики. 
             Недавно начал кодить. С 2015 года работаю в компани ООО «Газпром трансгаз Екатеринбург».</p>
            <a className="about__link" href='https://github.com/Alexander-Sultanaev' target='_blank' rel="noreferrer">Github</a>
          </div>
            <img className="about__avatar" src={Photo} alt='Мое фото' />
        </div>
      </section>
  );
};

export default AboutMe;