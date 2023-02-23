import React from "react";
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
function SearchForm() {
  return(
    <section className="search-form">
      <div className="search-form__container">
        <div className="search-form__icon"></div>
        <form className="search-form__form">
          <input
            placeholder="Фильм"
            className="search-form__input"
            required
          />
          <button className="search-form__button" type="submit">Найти</button>
        </form>
        <FilterCheckbox />
      </div>
      <span className="search-form__span"></span>
    </section>
  );
};

export default SearchForm;