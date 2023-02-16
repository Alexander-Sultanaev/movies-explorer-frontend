import { useState } from "react";
import { useLocation } from "react-router-dom";
import './MoviesCard.css';

function MoviesCard({ movie }) {
  const location = useLocation();
  const [ isSaved, setIsSaved ] = useState(false);
  function saveCard() {
    setIsSaved(true)
  }
  return(
    <div className="movies-card">
      <div className="movies-card__container">
        <img 
          src={movie.image}
          alt={`Фрагмент фильма: ${movie.name}`}
          className="movies-card__image"
        />
        {location.pathname === '/movies' ? 
        <button className={`movies-card__button ${isSaved ? 'movies-card__button_saved' : ''}`}
        type='button' onClick={saveCard}>Сохранить</button> :
        <button className='movies-card__button_delete' type='button' />
        }
      </div>
      <div className="movies-card__wrapper">
        <p className="movies-card__title">{movie.name}</p>
        <p className="movies-card__time">{movie.duration}</p>
      </div>
    </div>
  );
};

export default MoviesCard;