import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
  const [ isLoading, setIsLoading ] = useState(false);
  const [ savedMovies, setSavedMovies ] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    tokenCheck()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  const handleRegister = (email, password, name) => {
    mainApi.register(email, password, name)
      .then(() => {
        handleLogin(email, password)
        setErrorMessage('')
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

  const handleLogin = (email, password) => {
    mainApi.login(email, password)
      .then((jwt) => {
        setLoggedIn(true)
        localStorage.setItem('jwt', jwt.token);
        navigate('/movies')
        Promise.all([mainApi.getContent(jwt.token), mainApi.getSavedMovies(jwt.token)])
          .then(([user, movies]) => {
            setCurrentUser(user)
            localStorage.setItem('savedMovies', JSON.stringify(movies));
            setSavedMovies(movies);
          })
    })
    .catch((err) => {
      console.log(err)
      setErrorMessage('При авторизации произошла ошибка')
    })
    .finally(() => {
      setErrorMessage('')
      setIsLoading(false);
    })
  };




  const handleUpdateUser = (name, email) => {
    const jwt = localStorage.getItem('jwt');
    setIsLoading(true);
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
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSaveMovie = (movie) => {
    const jwt = localStorage.getItem('jwt');
    const handledMovie = savedMovies.find(item => {
      return item.movieId === movie.id
    });
    const isLiked = Boolean(handledMovie);
    const id = handledMovie ? handledMovie._id : null;
    if (isLiked) {
      mainApi.deleteMovie(id, jwt)
        .then((card) => {
          const updatedSavedMovies = savedMovies.filter(item => card._id !== item._id);
          localStorage.setItem('savedMovies', updatedSavedMovies);
          setSavedMovies(updatedSavedMovies);
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          tokenCheck()
          setIsLoading(false);
        });
    } else {
      mainApi.saveMovie(movie, jwt)
        .then((newSavedMovie) => {
          setSavedMovies((prev) => [...prev, newSavedMovie]);
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const handleDeleteMovie = (movie) => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt');
    mainApi.deleteMovie(movie._id, jwt)
      .then((card) => {
        const updatedSavedMovies = savedMovies.filter(item => card._id !== item._id);
        localStorage.setItem('savedMovies', updatedSavedMovies);
        setSavedMovies(prev => updatedSavedMovies);
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        tokenCheck()
        setIsLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.clear()
    setCurrentUser({})
    setSavedMovies([])
    setLoggedIn(false)
    setErrorMessage('')
    navigate('/')
  };

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    const path = useLocation.path;
    mainApi.getContent(jwt)
      .then((user) => {
        setLoggedIn(true)
        setCurrentUser(user)
        navigate(path)
      })
      .catch((err) => {
        console.log(err)
      })
      mainApi.getSavedMovies(jwt)
      .then((movies) => {
        setSavedMovies(movies)
      })
      .catch((err) => {
        console.log(err)
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
                onLoading={setIsLoading}
                isLoading={isLoading}
                onSave={handleSaveMovie}
                onDelete={handleDeleteMovie}
                savedMovies={savedMovies}
                errorMessage={errorMessage}
              />
            </ProtectedRoute>
          } />
          <Route path="/saved-movies" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies 
                loggedIn={loggedIn}
                isLoading={isLoading}
                savedMovies={savedMovies}
                onDelete={handleDeleteMovie}
                errorMessage={errorMessage}
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