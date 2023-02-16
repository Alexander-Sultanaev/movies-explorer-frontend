import React from "react";
import './AboutProject.css';

const AboutProject = () => {
  return (
      <section className="project" id="project">
        <h2 className="project__title">О проекте</h2>
        <div className="project__container">
          <div>
            <h3 className="project__subtitle">Дипломный проект включал 5 этапов</h3>
            <p className="project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div>
            <h3 className="project__subtitle">На выполнение диплома ушло 5 недель</h3>
            <p className="project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className="project__container">
          <div className="project__box">
            <div className="project__box-backend">1 неделя</div>
            <p className="project__describe">Back-end</p>
          </div>
          <div className="project__box">
            <div className="project__box-frontend">4 недели</div>
            <p className="project__describe">Front-end</p>
          </div>
        </div>
      </section>
  );
};

export default AboutProject;