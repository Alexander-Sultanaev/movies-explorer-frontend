import React from "react";
import { Link, useLocation } from "react-router-dom";
import './Navigation.css';
function Navigation({ openMenu, loggedIn}) {
  const location = useLocation();
  return (
    <>
      {location.pathname === '/' && loggedIn === false ?
        <nav className='navigation__auth'>
          <Link className='navigation__signup' to='/signup'>Регистрация</Link>
          <Link className='navigation__signin' to='/signin'>Войти</Link>
        </nav> : <></>
      }
      {(location.pathname === '/' ||
        location.pathname === '/profile' || 
        location.pathname === '/movies' ||
        location.pathname === '/saved-movies') && loggedIn === true ?
          <nav className='navigation__movies'>
            <div className='navigation__container'>
              <div className='navigation__container-movies'>
                <Link className={`navigation__link ${location.pathname === '/movies' ?
                  'navigation__link-active' : ''}`} to='/movies'>Фильмы</Link>
                <Link className={`navigation__link ${location.pathname === '/saved-movies' ?
                  'navigation__link-active' : ''}`} to='/saved-movies'>Сохранённые фильмы</Link>
              </div>
                <Link className='navigation__link-profiles' to='/profile'>
                  <div className="navigation__icon"></div>
                  <p className="navigation__text-profile">Аккаунт</p>
                </Link>
            </div>
              <button className="navigation__burger" type='button' onClick={openMenu}>
              </button>
          </nav> : <></>
      }
    </>
    
  )
}
export default Navigation;