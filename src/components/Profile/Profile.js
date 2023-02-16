import React from "react";
import Header from "../Header/Header";
import './Profile.css';

const Profile = ({ loggedIn }) => {
  const [name, setName] = React.useState('Имя')
  const [email, setEmail] = React.useState('pochta@yandex.ru')

  const nameChange = (e) =>{
    setName(e.target.value);
  }
  const emailChange = (e) =>{
    setEmail(e.target.value);
  }
  return (
    <section>
      <Header />
      <div className="profile">
        <h1 className="profile__title">Привет, User</h1>
        <form className="profile__form">
          <div className="profile__container">
            <label className="profile__label">Имя</label>
            <input 
              className="profile__input"
              required
              type='text'
              value={name}
              onChange={nameChange}
            />
          </div>
          <div className="profile__container">
            <label className="profile__label">E-mail</label>
            <input 
              className="profile__input"
              required
              type='email'
              value={email}
              onChange={emailChange}
            />
          </div>
        </form>
        <button className="profile__button profile__button-edit">Редактировать</button>
        <button className="profile__button profile__button-logout">Выйти из аккаунта</button>
      </div>
    </section>
  );
};

export default Profile;