import { useState } from "react";
import { useLocation } from "react-router-dom";
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
function SearchForm({ handleSearch, onFilter, shortMovies }) {
  const [ inputValue, setInputValue ] = useState('')
  let textSearchMovies = 'Результат последнего поиска: ' + localStorage.getItem('textSearchMovies')
  if (textSearchMovies === `Результат последнего поиска: null`) {
    textSearchMovies = ('')
  }
  let textSearchSavedMovies = 'Результат последнего поиска: ' + localStorage.getItem('textSearchSavedMovies')
  if (textSearchSavedMovies === `Результат последнего поиска: null`) {
    textSearchSavedMovies = ('')
  }
  const location = useLocation()

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
      <div className="search-form__container">
        <div className="search-form__icon"></div>
        {location.pathname === '/movies' ? 
          <form className="search-form__form" onSubmit={handleSubmitMovies}>
            <input
              placeholder="Фильм"
              className="search-form__input"
              value={inputValue || ''}
              onChange={handleInputValue}
              required
            />
            <span className="search-form__span">{textSearchMovies}</span>
            <button className="search-form__button" type="submit">Найти</button>
          </form>
        : <></>}
        {(location.pathname ==='/saved-movies' ? 
          <form className="search-form__form" onSubmit={handleSaveSavedMovie}>
            <input
              placeholder="Фильм"
              className="search-form__input"
              value={inputValue || ''}
              onChange={handleInputValue}
              required
            />
            <span className="search-form__span">{textSearchSavedMovies}</span>
            <button className="search-form__button" type="submit">Найти</button>
          </form>
        : <></>
        )}
        <FilterCheckbox onFilter={onFilter} isMovieFilter={shortMovies}/>
      </div>
      
    </section>
  );
};

export default SearchForm;