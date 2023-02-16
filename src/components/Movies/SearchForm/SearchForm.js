import React from "react";
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
function SearchForm() {
  return(
    <div className="search-form">
      <div className="search-form__container">
        <div className="search-form__icon"></div>
        <div className="search-form__container-input">
          <input
            placeholder="Фильм"
            className="search-form__input"
          />
          <button className="search-form__button" type="submit">Найти</button>
        </div>
        <FilterCheckbox />
      </div>
      <span className="search-form__span"></span>
    </div>
  );
};

export default SearchForm;