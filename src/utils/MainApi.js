const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

class MainApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }
  _checkResponse(res){
    if(res.ok){
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }
  login(email,password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password })
    })
    .then(res => this._checkResponse(res))
  }
  register(email, password, name){
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password, name })
    })
    .then(res => this._checkResponse(res))
  }

  getContent(jwt) {
    return fetch(`${this._url}/users/me`,{
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${jwt}`,
      },
    })
    .then(res => this._checkResponse(res))
  }
  updateUserInfo = async (name, email, jwt) => {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({name, email}),
    }).then((res) => this._checkResponse(res));
  };
}
const mainApi = new MainApi({
  url: BASE_URL,
  headers: {
    'Accept' : 'application/json',
    'Content-Type' : 'application/json'
  }
})

export default mainApi;