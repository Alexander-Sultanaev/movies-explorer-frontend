import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';

function MoviesCardList({ isSavedMoviesPage, movies }) {
  return(
    <section className="movies-list">
      <div className="movies-list__grid">
      {movies.map((movie) => {
          return <MoviesCard 
            key={movie.id} 
            movie={movie} 
            isSavedMoviesPage={isSavedMoviesPage} 
          />
        })}
      </div>
      <button className="movies-list__button">Ещё</button>
    </section>
  );
};

export default MoviesCardList;