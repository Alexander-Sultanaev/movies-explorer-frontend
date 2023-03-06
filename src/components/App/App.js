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
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import mainApi from "../../utils/MainApi";

function App() {
  const [ currentUser, setCurrentUser ] = useState({});
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState(false);
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

  return(
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Routes>
        <Route element={<ProtectedRoutes loggedIn={loggedIn}/>}>
          <Route exact path='/movies' element={<Movies/>}/>
          <Route exact path='/saved-movies' element={<SavedMovies/>}/>
          <Route exact path='/profile' element={<Profile/>} errorMessage={errorMessage} onLogout={handleLogout}/>
        </Route>
        <Route exact path='/' element={<Main/>}/>
        <Route exact path='/signup' element={<Register handleRegister={handleRegister} errorMessage={errorMessage}/>}/>
        <Route exact path='/signin' element={<Login handleLogin={handleLogin} errorMessage={errorMessage}/>}/>
        <Route exact path='*' element={<PageNotFound/>}/>
      </Routes>
    </div>
    </CurrentUserContext.Provider>
  );
};

export default App;