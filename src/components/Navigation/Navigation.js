import React from "react";
import { Link, useLocation } from "react-router-dom";
import './Navigation.css';
function Navigation(props) {
  const location = useLocation();
  return (
    <>
      {location.pathname === '/' ?
        <div className='navigation__auth'>
          <Link className='navigation__signup' to='/signup'>Регистрация</Link>
          <Link className='navigation__signin' to='/signin'>Войти</Link>
        </div> : <></>
      }
      {(location.pathname === '/profile' || 
        location.pathname === '/movies' ||
        location.pathname === '/saved-movies') ?
          <div className='navigation__movies'>
            <div className='navigation__container'>
              <div className='navigation__container-movies'>
                <Link className={`navigation__link ${location.pathname === '/movies' ?
                  'navigation__link_active' : ''}`} to='/movies'>Фильмы</Link>
                <Link className={`navigation__link ${location.pathname === '/saved-movies' ?
                  'navigation__link_active' : ''}`} to='/saved-movies'>Сохранённые фильмы</Link>
              </div>
                <Link className='navigation__link-profiles' to='/profile'>
                  <div className="navigation__icon"></div>
                  <p className="navigation__text-profile">Аккаунт</p>
                </Link>
            </div>
              <div className="navigation__burger" type='button' onClick={props.openMenu}>
              </div>
          </div> : <></>
          
      }
    </>
    
  )
}
export default Navigation;