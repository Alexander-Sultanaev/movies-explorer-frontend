import { Link } from 'react-scroll';
import './NavTab.css';

const NavTab = () => {
  return (
      <section className="nav-tab">
        <ul className="nav-tab__items">
          <li className="nav-tab__item">        
            <Link className="nav-tab__link" to="project" smooth={true} duration={1000}>О проекте</Link>
          </li>
          <li className="nav-tab__item">
            <Link className="nav-tab__link" to="techs" smooth={true} duration={1000}>Технологии</Link>
          </li>
          <li className="nav-tab__item">
            <Link className="nav-tab__link" to="about" smooth={true} duration={1000}>Студент</Link>
          </li>
        </ul>
      </section>
  );
};

export default NavTab;