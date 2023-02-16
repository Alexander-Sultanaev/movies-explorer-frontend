import React from "react";
import Header from "../Header/Header.js";
import SearchForm from "./SearchForm/SearchForm.js";
import MoviesCardList from "./MoviesCardList/MoviesCardList.js";
import Footer from "../Footer/Footer.js";
import testImage1 from "../../images/test_image_for_card/image1.svg"
import testImage2 from "../../images/test_image_for_card/image2.svg"
import testImage3 from "../../images/test_image_for_card/image3.svg"
import testImage4 from "../../images/test_image_for_card/image4.svg"
import testImage5 from "../../images/test_image_for_card/image5.svg"
import testImage6 from "../../images/test_image_for_card/image6.svg"
import testImage7 from "../../images/test_image_for_card/image7.svg"
import testImage8 from "../../images/test_image_for_card/image8.svg"
import testImage9 from "../../images/test_image_for_card/image9.svg"
import testImage10 from "../../images/test_image_for_card/image10.svg"
import testImage11 from "../../images/test_image_for_card/image11.svg"
import testImage12 from "../../images/test_image_for_card/image12.svg"
const movies = [
  {
    id: '1',
    name: '33 слова о дизайне',
    image: testImage1,
    duration: '1ч 17м',
    saved: false
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
    saved: false
  },
  {
    id: '4',
    name: '33 слова о дизайне',
    image: testImage4,
    duration: '1ч 17м',
    saved: false
  },
  {
    id: '5',
    name: 'Киноальманах «100 лет дизайна»',
    image: testImage5,
    duration: '1ч 17м',
    saved: false
  },
  {
    id: '6',
    name: "Книготорговцы",
    image: testImage6,
    duration: '1ч 17м',
    saved: false
  },
  {
    id: '7',
    name: "Когда я думаю о Германии ночью",
    image: testImage7,
    duration: '1ч 17м',
    saved: true
  },
  {
    id: '8',
    name: "Gimme Danger: История Игги и The Stooges",
    image: testImage8,
    duration: '1ч 17м',
    saved: false
  },
  {
    id: '9',
    name: "Дженис: Маленькая девочка грустит",
    image: testImage9,
    duration: '1ч 17м',
    saved: false
  },
  {
    id: '10',
    name: "Соберись перед прыжком",
    image: testImage10,
    duration: '1ч 17м',
    saved: false
  },
  {
    id: '11',
    name: "Пи Джей Харви: A dog called money",
    image: testImage11,
    duration: '1ч 17м',
    saved: false
  },
  {
    id: '12',
    name: "По волнам: Искусство звука в кино",
    image: testImage12,
    duration: '1ч 17м',
    saved: false
  },
];
function Movies() {
  return(
    <div className="page">
      <Header />
      <SearchForm />
      <MoviesCardList isSavedMoviesPage={false} movies={movies} />
      <Footer />
    </div>
  );
};

export default Movies;