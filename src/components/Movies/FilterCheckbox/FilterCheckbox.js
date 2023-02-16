import * as React from 'react';
import  { useState  } from "react"
import './FilterCheckbox.css'

const FilterCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [filterIsActive, setFilterIsActive] = useState(false);
  const checkHandler = () => {
    setIsChecked(!isChecked)
    console.log("Проверка чекбокса")
  }
  const handleToggle = () => {
    setFilterIsActive(!filterIsActive);
  };
  return (
    <section className='filter-checkbox'>
      <div 
      onClick={handleToggle}
      className={`filter-checkbox__input-style ${filterIsActive ? "filter-checkbox__input-style-switch-on" : ""}`}>
        <input 
          className='filter-checkbox__input'
          type="checkbox"
          id="checkbox"
          checked={isChecked}
          onChange={checkHandler}
        />
      </div>
      <label className='filter-checkbox__label'>Короткометражки</label>
    </section>
  )
}
export default FilterCheckbox;