import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './MoviesCard.css';

function MoviesCard({ movie, onSave, onDelete, savedMovies }) {
  const location = useLocation();
  const [ isSaved, setIsSaved ] = useState(false);


  useEffect(() => {
    if (location.pathname !== "/saved-movies") {
      const savedMovie = savedMovies.filter((obj) => {
        return obj.movieId === movie.id;
      });

      if (savedMovie.length > 0) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    }
  }, [location.pathname, savedMovies, movie.id]);

  function saveCard() {
    onSave(movie)
  }
  function deleteCard() {
    onDelete(movie)
  }
  function movieDuration(n) {
    let m = n % 60
    let h = (n -m) / 60
    if (h === 0){
      return `${m}м`
    } else {
      return `${h}ч ${m}м`
    }
  }
  return(
    <div className="movies-card">
      <div className="movies-card__container">
        <a href={movie.trailerLink} rel="noreferrer" target="_blank">
        <img 
          src={location.pathname === '/movies' ? `https://api.nomoreparties.co/${movie.image.url}` :
          movie.image}
          alt={`Фрагмент фильма: ${movie.nameRU}`}
          className="movies-card__image"
        />
        </a>
        {location.pathname === '/movies' ? 
        <button className={`movies-card__button ${isSaved ? 'movies-card__button-saved' : ''}`}
        type='button' onClick={saveCard}>Сохранить</button>: <></>}
        {(location.pathname ==='/saved-movies' ? 
          <button className='movies-card__button-delete' type='button' onClick={deleteCard}/> : <></>
        )}
      </div>
      <div className="movies-card__wrapper">
        <p className="movies-card__title">{movie.nameRU}</p>
        <p className="movies-card__time">{movieDuration(movie.duration)}</p>
      </div>
    </div>
  );
};

export default MoviesCard;