import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Header from "../Header/Header";
import './Profile.css';

const Profile = ({ handleLogout, loggedIn, handleUpdateUser, confirmMessage, setConfirmMessage }) => {
  const currentUser = useContext(CurrentUserContext);
  const [ name, setName ] = useState(currentUser.name)
  const [ email, setEmail ] = useState(currentUser.email)
  const [ nameDirty, setNameDirty ] = useState(false);
  const [ emailDirty, setEmailDirty ] = useState(false);
  const [ nameError, setNameError ] = useState('');
  const [ emailError, setEmailError ] = useState('');
  const [ formValid, setFormValid ] = useState(false);

//Уведомление пользователя об изменении данных

  useEffect(() => {
    if (nameError || emailError) {
      setFormValid(false)
    } else if(name === currentUser.name && email === currentUser.email){
      setFormValid(false)
      setTimeout(() => {
        setConfirmMessage('')
      }, "8000")
    } else {
      setFormValid(true) 
    }
  }, [nameError, emailError, name, email, currentUser.name, currentUser.email]);
  
  const nameHandler = (e) => {
    const validName = /^[a-zA-Zа-яА-Я- ]+$/.test(e.target.value);
    setName(e.target.value)
    if(e.target.value.length < 2) {
      setNameError('Длина имени должна быть не менее 2 символов')
      if(!e.target.value) {
        setNameError('Поле не может быть пустым')
      }
    } else if(!validName) {
      setNameError('Поле может содержать только латиницу, кириллицу, пробел или дефис.')
    }  else {
      setNameError('')
    }
  }

  const emailHandler = (e) => {
    setEmail(e.target.value)
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Не верный формат почты')
      if(e.target.value < 1) {
        setNameError('Поле не может быть пустым')
      }
    } else {
      setEmailError('')
    } 
  }

  const blurHandle = (e) => {
    // eslint-disable-next-line default-case
    switch (e.target.name) {
      case 'name':
        setNameDirty(true);
        break;
      case 'email':
        setEmailDirty(true);
        break;
    };
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser(name, email)
    setName(name);
    setEmail(email);
  };

  return (
    <section>
      <Header loggedIn={loggedIn}/>
      <div className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}</h1>
        <form className="profile__form" >
          <div className="profile__container">
            <label className="profile__label">Имя</label>
            <input
              className={`profile__input ${nameError ? 'profile__input_error' : ''}`}
              required
              type='text'
              value={name || ''}
              name="name"
              onChange={e => nameHandler(e)}
              onBlur={e => blurHandle(e)}
              minLength='2'
              maxLength='30'
            />
          </div>
          {(nameDirty && nameError) && <span className="profile__error">{nameError}</span>}
          <div className="profile__container">
            <label className="profile__label">E-mail</label>
            <input 
              className={`profile__input ${emailError ? 'profile__input_error' : ''}`}
              required
              type='text'
              name="email"
              value={email}
              onChange={e => emailHandler(e)}
              onBlur={e => blurHandle(e)}
            />
          </div>
          {(emailDirty && emailError) && <span className="profile__error">{emailError}</span>}
        </form>
        <p className="profile__confirm">{confirmMessage}</p>
        <button 
          className={`profile__button profile__button-edit ${!formValid ? 'profile__button-disable' : ''}`} 
          onClick={handlerSubmit}
          disabled={!formValid}>Редактировать</button>
        <button className="profile__button profile__button-logout" onClick={handleLogout}>Выйти из аккаунта</button>
      </div>
    </section>
  );
};

export default Profile;