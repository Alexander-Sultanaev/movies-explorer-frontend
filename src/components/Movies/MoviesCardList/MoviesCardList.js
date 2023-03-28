import React from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';

function MoviesCardList({ isSavedMoviesPage, movies, savedMovies, onSave, onDelete, messageSavedMoviesPage, messageMoviesPage }) {
  const [showMovieList, setShowMovieList] = React.useState(movies);
  const location = useLocation();
  const screenWidth = useScreenWidth();
  const searchedMoviesCount = movies ? movies.length : 0;

  function useScreenWidth() {
    const getScreenWidth = React.useCallback(() => window.innerWidth, []);
    const [screenWidth, setScreenWidth] = React.useState(getScreenWidth());
    React.useEffect(() => {
      function handleScreenResize() {
        setScreenWidth(getScreenWidth());
      };
      window.addEventListener('resize', resizeController, false);
      let resizeTimer;
      function resizeController() {
        if (!resizeTimer) {
          resizeTimer = setTimeout(() => {
            resizeTimer = null;
            handleScreenResize();
          }, 1000);
        }
      };
      return () => window.removeEventListener('resize', handleScreenResize);
    }, [getScreenWidth]);
    return screenWidth;
  }

  const handleMoreClick = () => {
    if (screenWidth > 1217) {
      setShowMovieList(movies.slice(0, showMovieList.length + 3))
    } else {
      setShowMovieList(movies.slice(0, showMovieList.length + 2))
    }
  }

  React.useEffect(() => {
    if (screenWidth > 917) {
      setShowMovieList(movies.slice(0, 12))
    } else if (screenWidth > 480 && screenWidth <= 1217) {
      setShowMovieList(movies.slice(0, 8));
    } else if (screenWidth <= 480) {
      setShowMovieList(movies.slice(0, 5));
    } else {
      setShowMovieList(movies);
    }
  }, [screenWidth, movies])
  
  return (
    <section className='movies-list'>
      <ul className='movies-list__grid'>
        {showMovieList.sort().map(movie => {
          return <MoviesCard
            key={isSavedMoviesPage ? movie.movieId : movie.id}
            movie={movie}
            isSavedMoviesPage={isSavedMoviesPage}
            onSave={onSave}
            onDelete={onDelete}
            savedMovies={savedMovies}
            movies={movie}
          />
        })}
      </ul>
      {showMovieList && searchedMoviesCount !== showMovieList.length && (
        <button className="movies-list__button" onClick={handleMoreClick}>Ещё</button>
      )}
      {location.pathname === '/movies' ? 
        <p className="movies-list__text">{messageMoviesPage}</p> : <></>
      }
      {(location.pathname ==='/saved-movies' ? 
        <p className="movies-list__text">{messageSavedMoviesPage}</p> : <></>
      )}
    </section>
  )
};

export default MoviesCardList;