export const MOVIE_API_URL = 'https://api.nomoreparties.co/beatfilm-movies'

class MoviesApi {
  constructor(movieUrl) {
    this._movieUrl = movieUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(this._movieUrl)
      .then(res => this._checkResponse(res));
  }
}

const moviesApi = new MoviesApi(MOVIE_API_URL);

export default moviesApi;