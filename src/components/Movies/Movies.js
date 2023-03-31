import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header.js";
import SearchForm from "./SearchForm/SearchForm.js";
import MoviesCardList from "./MoviesCardList/MoviesCardList.js";
import Footer from "../Footer/Footer.js";
import moviesApi from "../../utils/MoviesApi.js";
import Preloader from "../Preloader/Preloader.js";
function Movies({ loggedIn, isLoading, onLoading, savedMovies, onSave}) {
  const [ shortMovies, setShortMovies, ] = useState(false);
  const [ initialMovies, setInitialMovies ] = useState([]);
  const [ filteredMovies, setFilteredMovies ] = useState([]);
  const [ isAllMovies, setIsAllMovies ] = useState([]);
  const [ messageMoviesPage, setMessageMoviesPage ] = useState('')
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
    })
    if (shortMoviesCheckbox) {
      return filterShortMovies(moviesByUserQuery);
    } else {
      return moviesByUserQuery;
    }
  }

  const handleSetFilteredMovies = (movies, userQuery, shortMoviesCheckbox) => {
    const moviesList = filterMovies(movies, userQuery, false);
    if (moviesList.length === 0) {
      setMessageMoviesPage('По данному запросу ничего не найдено')
      console.log('По данному запросу ничего не найдено')
    } else {
      setMessageMoviesPage('')
    }
    setInitialMovies(moviesList);
    setFilteredMovies(
      shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList
    );
    localStorage.setItem('movies', JSON.stringify(moviesList));
  }

  const handleSearch = (inputValue) => {
    if (inputValue.trim().length === 0) {
      console.log('Нужно ввести ключевое слово')
      return;
    }

    localStorage.setItem('movieSearch', inputValue);
    localStorage.setItem('shortMovies', shortMovies);

    if (isAllMovies.length === 0) {
      onLoading(true);
      moviesApi
        .getMovies()
        .then(movies => {
          localStorage.setItem('allMovies', JSON.stringify(movies));
          setIsAllMovies(movies);
          handleSetFilteredMovies(
            movies,
            inputValue,
            shortMovies
          );
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => onLoading(false));
    } else {
      handleSetFilteredMovies(isAllMovies, inputValue, shortMovies);
    }
  }

  const handleShortFilms = () => {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      setFilteredMovies(filterShortMovies(initialMovies));
      if (filterMovies.length === 0) {
        setMessageMoviesPage('По данному запросу ничего не найдено')
      }
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem('shortMovies', !shortMovies);
  }

  useEffect(() => {
    if (localStorage.getItem('shortMovies') === 'true') {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, [location]);

  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(
        localStorage.getItem('movies')
      );
      setInitialMovies(movies);
      if (
        localStorage.getItem('shortMovies') === 'true'
      ) {
        setFilteredMovies(filterShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, [location]);

  return (
    <section className='movies__page'>
      <Header loggedIn={loggedIn} />
      <div className='movies__content'>
        <SearchForm
          handleSearch={handleSearch}
          onFilter={handleShortFilms}
          shortMovies={shortMovies}
        />
        {isLoading && (
          <Preloader />
        )}
        {!isLoading && <MoviesCardList
          isSavedMoviesPage={false}
          movies={filteredMovies}
          savedMovies={savedMovies}
          onSave={onSave}
          messageMoviesPage={messageMoviesPage}
        />}
      </div>
      <Footer />
    </section>
  )
};

export default Movies;