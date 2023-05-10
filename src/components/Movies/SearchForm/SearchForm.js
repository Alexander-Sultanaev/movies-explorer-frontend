import { useState } from "react";
import { useLocation } from "react-router-dom";
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
function SearchForm({ handleSearch, onFilter, shortMovies }) {
  const [ inputValue, setInputValue ] = useState('')
  const location = useLocation()

  let textSearchMovies = localStorage.getItem('textSearchMovies')
  if (textSearchMovies === null) {
    textSearchMovies = ('Фильм')
  }

  let textSearchSavedMovies = localStorage.getItem('textSearchSavedMovies')
  if (textSearchSavedMovies === null) {
    textSearchSavedMovies = ('Фильм')
  }

  function handleInputValue (e) {
    setInputValue(e.target.value)
  }

  function handleSubmitMovies (e) {
    e.preventDefault()
    handleSearch(inputValue, shortMovies)
    localStorage.setItem('textSearchMovies', inputValue)
  }

  function handleSaveSavedMovie (e) {
    e.preventDefault()
    handleSearch(inputValue, shortMovies)
    localStorage.setItem('textSearchSavedMovies', inputValue)
  }
  
  return(
    <section className="search-form">
        {location.pathname === '/movies' ?
        <div className="search-form__container">
          <div className="search-form__icon"></div>
          <form className="search-form__form" onSubmit={handleSubmitMovies}>
            <input
              placeholder={textSearchMovies}
              className="search-form__input"
              value={inputValue || ''}
              onChange={handleInputValue}
              required
            />
            <button className="search-form__button" type="submit">Найти</button>
          </form>
          <FilterCheckbox onFilter={onFilter} isMovieFilter={shortMovies}/>
        </div>
        : <></>}
        {(location.pathname ==='/saved-movies' ? 
        <div className="search-form__container">
          <div className="search-form__icon"></div>
          <form className="search-form__form" onSubmit={handleSaveSavedMovie}>
            <input
              placeholder={textSearchSavedMovies}
              className="search-form__input"
              value={inputValue || ''}
              onChange={handleInputValue}
              required
            />
            <button className="search-form__button" type="submit">Найти</button>
          </form>
          <FilterCheckbox onFilter={onFilter} isMovieFilter={shortMovies}/>
        </div>
        : <></>
        )}
    </section>
  );
};

export default SearchForm;