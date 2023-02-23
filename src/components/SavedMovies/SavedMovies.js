import React from "react";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import testImage1 from "../../images/test_image_for_card/image1.svg"
import testImage2 from "../../images/test_image_for_card/image2.svg"
import testImage3 from "../../images/test_image_for_card/image3.svg"
const savedMovies = [
  {
    id: '1',
    name: '33 слова о дизайне',
    image: testImage1,
    duration: '1ч 17м',
    saved: true
  },
  {
    id: '2',
    name: 'Киноальманах «100 лет дизайна»',
    image: testImage2,
    duration: '1ч 17м',
    saved: true
  },
  {
    id: '3',
    name: 'В погоне за Бенкси',
    image: testImage3,
    duration: '1ч 17м',
    saved: true
  },
];
function SavedMovies() {
  return(
    <div className="page">
      <Header />
      <SearchForm />
      <MoviesCardList isSavedMoviesPage={true} movies={savedMovies}/>
      <Footer />
    </div>
  );
};
export default SavedMovies;