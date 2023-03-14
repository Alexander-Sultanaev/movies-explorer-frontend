import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import './App.css';

import Main from "../Main/Main.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import mainApi from "../../utils/MainApi";

function App() {
  const [ currentUser, setCurrentUser ] = useState({});
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState(false);
  const [ confirmMessage, setConfirmMessage ] =useState('')
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    mainApi.login(email, password)
      .then((jwt) => {
        setLoggedIn(true)
        localStorage.setItem('jwt', jwt.token);
        navigate('/movies')
        Promise.all([mainApi.getContent(jwt.token)])
          .then(([user]) => {
            setCurrentUser(user)
          })
    })
    .catch((err) => {
      console.log(err)
      setErrorMessage('При авторизации произошла ошибка')
    })
  };

  const handleRegister = (email, password, name) => {
    mainApi.register(email, password, name)
      .then((user) => {
        setLoggedIn(true)
        setCurrentUser(user)
        navigate('/movies')
      })
      .catch((err) => {
        if (err.includes(409)) {
          setErrorMessage('Данный Email уже используется!')
        }
        else {
          setErrorMessage('При регистрации произошла ошибка')
        }
        console.log(err)
      })
  };

  const handleLogout = () => {
    localStorage.clear()
    setCurrentUser({})
    setLoggedIn(false)
    navigate('/')
  };

  const handleUpdateUser = (name, email) => {
    const jwt = localStorage.getItem('jwt');
    setLoggedIn(true);
    mainApi.updateUserInfo(name, email, jwt)
      .then((data) => {
        setCurrentUser(data);
        setConfirmMessage('Данные успешно изменены')
      })
      .catch((err) => {
        console.log(err)
        if (err.includes(400)) {
          setErrorMessage('Некорректно введены данные, проверьте правильность ввода имени или Email')
        } else{
          setErrorMessage('При обновлении профиля произошла ошибка.');
        }
      })
  };

  return(
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Routes >
          <Route path="/" element={
            <Main loggedIn={loggedIn}/>
          } />
          <Route path="/movies" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Movies 
                loggedIn={loggedIn}
              />
            </ProtectedRoute>
          } />
          <Route path="/saved-movies" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies 
                loggedIn={loggedIn}
              />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Profile 
                handleLogout={handleLogout}
                errorMessage={errorMessage}
                loggedIn={loggedIn}
                handleUpdateUser={handleUpdateUser}
                confirmMessage={confirmMessage}
              />
            </ProtectedRoute>
          } />
          <Route path="/signin" element={
            <Login handleLogin={handleLogin} errorMessage={errorMessage} loggedIn={loggedIn} />
          } />
          <Route path="/signup" element={
            <Register handleRegister={handleRegister} errorMessage={errorMessage} loggedIn={loggedIn} />
          } />
        <Route exact path='*' element={<PageNotFound/>}/>
      </Routes>
    </div>
    </CurrentUserContext.Provider>
  );
};

export default App;