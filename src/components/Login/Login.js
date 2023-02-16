import {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ emailDirty, setEmailDirty ] = useState(false);
  const [ passwordDirty, setPasswordDirty ] = useState(false);
  const [ emailError, setEmailError ] = useState('Поле не может быть пустым');
  const [ passwordError, setPasswordError ] = useState('Поле не может быть пустым');
  const [formValid, setFormValid] = useState(false);

  useEffect( () => {
    if (emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [emailError, passwordError]);

  const emailHandler = (e) => {
    setEmail(e.target.value)
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Что-то пошло не так...')
    } else {
      setEmailError('')
    }
  }
  const passwordHandler = (e) => {
    setPassword(e.target.value)
    if(e.target.value.length < 8) {
      setPasswordError('Что-то пошло не так...')
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
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
    };
  };

  return(
    <div className="login">
      <Link className="login__logo" to='/'></Link>
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form">
        <label className="login__label">E-mail</label>
        <input 
          value={email}
          onChange={e => emailHandler(e)}
          onBlur={e => blurHandle(e)}
          className={`login__input ${emailError ? 'login__input_error' : ''}`}
          name="email"
          type="text"
          placeholder=""
        />
        {(emailDirty && emailError) && <span className="login__error">{emailError}</span>}
        <label className="login__label">Пароль</label>
        <input 
          value={password}
          onChange={e => passwordHandler(e)}
          onBlur={e => blurHandle(e)}
          className={`login__input ${passwordError ? 'login__input_error' : ''}`}
          name="password"
          type="password"
          placeholder=""
        />
        {(passwordDirty && passwordError) && <span className="login__error">{passwordError}</span>}
        <button disabled={!formValid} className="login__button" type="submit">Зарегистрироваться</button>
      </form>
      <div className='login__container'>
        <span className="login__span">Ещё не зарегистрированы?</span>
        <Link to='/signup' className='login__link'>Регистрация</Link>
      </div>
    </div>
  );
};

export default Login;