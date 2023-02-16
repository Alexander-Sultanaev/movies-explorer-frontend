import { Link, useLocation } from 'react-router-dom';
import './MenuBurger.css';

function MenuBurger ({ isOpen, closeMenu }) {
  const location = useLocation();

  function handleClick() {
    closeMenu()
  }
  return (
    <div className={`menu ${isOpen ? '' : 'menu_hidden'}`}>
      <div className='menu__container'>
        <button className='menu__button-close' onClick={handleClick}/>
        <div className='menu__container-link'>        
          <Link className='menu__link' to='/' onClick={handleClick}>Главная</Link>
          <Link className={`menu__link ${location.pathname === '/movies' ?'menu__link_active' : ''}`} to='/movies'onClick={handleClick}>
            Фильмы
          </Link>
          <Link className={`menu__link ${location.pathname === '/saved-movies' ? 'menu__link_active' : ''}`} to='/saved-movies'onClick={handleClick}>
            Сохранённые фильмы
          </Link>
        </div>
        <Link className='menu__link-profiles' to='/profile' onClick={handleClick}>
          <div className="navigation__icon"></div>
          <p className="navigation__text-profile">Аккаунт</p>
        </Link>
      </div>
    </div>
  )
}

export default MenuBurger;