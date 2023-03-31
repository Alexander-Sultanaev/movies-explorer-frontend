import {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

const SavedMovies = ({ loggedIn, savedMovies, isLoading, onDelete, errorMessage }) => {
  const [ shortMovies, setShortMovies ] = useState(false);
  const [ showedMovies, setShowedMovies ] = useState(savedMovies);
  const [ filteredMovies, setFilteredMovies ] = useState(showedMovies);
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ messageSavedMoviesPage, setMessageSavedMoviesPage ] = useState('')
  const location = useLocation();

  const filterShortMovies = (movies) => {
    return movies.filter(movie => movie.duration < 40);
  }
  
  const filterMovies = (movies, userQuery, shortMoviesCheckbox) => {
    const moviesByUserQuery = movies.filter((movie) => {
      const movieRu = String(movie.nameRU).toLowerCase().trim();
      const movieEn = String(movie.nameEN).toLowerCase().trim();
      const userMovie = userQuery.toLowerCase().trim();
      return movieRu.indexOf(userMovie) !== -1 || movieEn.indexOf(userMovie) !== -1;
    });
  
    if (shortMoviesCheckbox) {
      return filterShortMovies(moviesByUserQuery);
    } else {
      return moviesByUserQuery;
    }
  }
  
  const handleSearch = (inputValue) => {
    if (inputValue.trim().length === 0) {
      console.log('Нужно ввести ключевое слово')
      return;
    }

    const moviesList = filterMovies(savedMovies, inputValue, shortMovies);
    setSearchQuery(inputValue);
    if (moviesList.length === 0) {
      setMessageSavedMoviesPage('Ничего не найдено.')
      console.log('Ничего не найдено.')
    } else {
      setMessageSavedMoviesPage('')
      setFilteredMovies(moviesList);
      setShowedMovies(moviesList);
    }
  }

  const handleShortFilms = () => {
    if (!shortMovies) {
      setShortMovies(true);
      localStorage.setItem('shortSavedMovies', true);
      setShowedMovies(filterShortMovies(filteredMovies));
      filterShortMovies(filteredMovies).length === 0 ? setMessageSavedMoviesPage('Ничего не найдено.') : setMessageSavedMoviesPage('');
    } else {
      setShortMovies(false);
      localStorage.setItem('shortSavedMovies', false);
      filteredMovies.length === 0 ? setMessageSavedMoviesPage('Ничего не найдено.') : setMessageSavedMoviesPage('');
      setShowedMovies(filteredMovies);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('shortSavedMovies') === 'true') {
      setShortMovies(true);
      setShowedMovies(filterShortMovies(savedMovies));
    } else {
      setShortMovies(false);
      const moviesList = filterMovies(savedMovies, searchQuery, shortMovies);
      setShowedMovies(moviesList);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedMovies, location, shortMovies]);

  useEffect(() => {
    setFilteredMovies(savedMovies);
    savedMovies.length !== 0 ? setMessageSavedMoviesPage('') : setMessageSavedMoviesPage('Ничего не найдено.');
  }, [savedMovies]);

  return(
    <div className="page">
      <Header loggedIn={loggedIn}/>
      <SearchForm           
        handleSearch={handleSearch}
        onFilter={handleShortFilms}
        shortMovies={shortMovies}
      />
      {isLoading && (
          <Preloader />
      )}
      {!isLoading && (
        <MoviesCardList
          isSavedMoviesPage={true}
          movies={showedMovies}
          savedMovies={savedMovies}
          onDelete={onDelete}
          messageSavedMoviesPage={messageSavedMoviesPage}
        />
      )}
        <p>{errorMessage}</p>
      <Footer />
    </div>
  );
};
export default SavedMovies;