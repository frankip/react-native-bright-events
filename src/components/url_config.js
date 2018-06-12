import axios from 'axios';
import tokenProvider from 'axios-token-interceptor';
import jwtDecode from 'jwt-decode';


export const ROOT = 'https://eventsbright.herokuapp.com/api';

export const instance = axios.create({});
instance.interceptors.request.use(tokenProvider({
  getToken: () => localStorage.getItem('access_token'),
}));

export const isTokenExpired = token => {
  const currentTime = new Date() / 1000;
  if (jwtDecode(token).exp < currentTime) {
    localStorage.clear();
    return true;
  }
  return false;
};
