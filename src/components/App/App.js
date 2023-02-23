import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import Main from "../Main/Main.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
function App() {
  return(
    <div className="page">
      <Routes>
        <Route exact path='/' element={<Main/>}/>
        <Route exact path='/movies' element={<Movies/>}/>
        <Route exact path='/saved-movies' element={<SavedMovies/>}/>
        <Route exact path='/signup' element={<Register/>}/>
        <Route exact path='/signin' element={<Login/>}/>
        <Route exact path='/profile' element={<Profile/>}/>
        <Route exact path='*' element={<PageNotFound/>}/>
      </Routes>
    </div>
  );
};

export default App;