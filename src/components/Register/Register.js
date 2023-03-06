import { useEffect, useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import './Register.css';

function Register({ errorMessage, loggedIn, handleRegister }) {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ nameDirty, setNameDirty ] = useState(false);
  const [ emailDirty, setEmailDirty ] = useState(false);
  const [ passwordDirty, setPasswordDirty ] = useState(false);
  const [ nameError, setNameError ] = useState('Поле не может быть пустым');
  const [ emailError, setEmailError ] = useState('Поле не может быть пустым');
  const [ passwordError, setPasswordError ] = useState('Поле не может быть пустым');
  const [ formValid, setFormValid ] = useState(false);
  useEffect( () => {
    if (nameError || emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [nameError, emailError, passwordError]);
  const nameHandler = (e) => {
    const validName = /^[a-zA-Zа-яА-Я- ]+$/.test(e.target.value);
    setName(e.target.value)
    if(e.target.value.length < 2) {
      setNameError('Длина имени должна быть не менее 2 символов')
      if(!e.target.value) {
        setNameError('Поле не может быть пустым')
      }
    } else if(!validName) {
      setNameError('поле может содержать только латиницу, кириллицу, пробел или дефис.')
    } else {
      setNameError('')
    }
  }
  const emailHandler = (e) => {
    setEmail(e.target.value)
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Не верный формат почты')
    } else {
      setEmailError('')
    }
  }
  const passwordHandler = (e) => {
    setPassword(e.target.value)
    if(e.target.value.length < 8) {
      setPasswordError('Пароль слишком короткий....')
      if(!e.target.value) {
        setPasswordError('Поле не может быть пустым')
      }
    } else {
      setPasswordError('')
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
      case 'password':
        setPasswordDirty(true);
        break;
    };
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(email, password, name)
    if (loggedIn) {
      return (
        <Navigate to='/'/>
      )
    }
  }

  return(
    <div className="register">
      <Link className="register__logo" to='/'></Link>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form" onSubmit={handleSubmit}>
        <label className="register__label">Имя</label>
        <input
          onChange={e => nameHandler(e)} 
          value={name}
          className={`register__input ${nameError ? 'register__input_error' : ''}`}
          name="name"
          type="text"
          placeholder=""
          onBlur={e => blurHandle(e)}
        />
        {(nameDirty && nameError) && <span className="register__error">{nameError}</span>}
        <label className="register__label">E-mail</label>
        <input 
          onChange={e => emailHandler(e)}
          value={email}
          className={`register__input ${emailError ? 'register__input_error' : ''}`}
          name="email"
          type="text"
          placeholder=""
          onBlur={e => blurHandle(e)}
        />
        {(emailDirty && emailError) && <span className="register__error">{emailError}</span>}
        <label className="register__label">Пароль</label>
        <input 
          onChange={e => passwordHandler(e)}
          value={password}
          className={`register__input ${passwordError ? 'register__input_error' : ''}`}
          name="password"
          type="password"
          placeholder=""
          onBlur={e => blurHandle(e)}
        />
        {(passwordDirty && passwordError) && <span className="register__error">{passwordError}</span>}
        <span className="register__form-error">{errorMessage}</span>
        <button disabled={!formValid} className={`register__button ${!formValid ? 'register__button-disable' : ''}`} type="submit">Зарегистрироваться</button>
      </form>
      <div className='register__container'>
        <span className="register__span">Уже зарегистрированы?</span>
        <Link to='/signin' className='register__link'>Войти</Link>
      </div>
    </div>
  );
};

export default Register;