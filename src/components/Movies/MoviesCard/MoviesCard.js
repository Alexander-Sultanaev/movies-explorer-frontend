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
    setIsSaved(true)
    onSave(movie)
  }
  function deleteCard() {
    onDelete(movie)
    setIsSaved(false)
  }
  return(
    <div className="movies-card">
      <div className="movies-card__container">
        <img 
          src={location.pathname === '/movies' ? `https://api.nomoreparties.co/${movie.image.url}` :
          movie.image}
          alt={`Фрагмент фильма: ${movie.nameRU}`}
          className="movies-card__image"
        />
        
        {location.pathname === '/movies' ? 
        <button className={`movies-card__button ${isSaved ? 'movies-card__button-saved' : ''}`}
        type='button' onClick={saveCard}>Сохранить</button>: <></>}
        {(location.pathname ==='/saved-movies' ? 
          <button className='movies-card__button-delete' type='button' onClick={deleteCard}/> : <></>
        )}
      </div>
      <div className="movies-card__wrapper">
        <p className="movies-card__title">{movie.nameRU}</p>
        <p className="movies-card__time">{`${movie.duration}м`}</p>
      </div>
    </div>
  );
};

export default MoviesCard;