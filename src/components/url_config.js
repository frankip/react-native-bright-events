import axios from 'axios';
import tokenProvider from 'axios-token-interceptor';


export const ROOT = 'http://127.0.0.1:5000/api';

export const instance = axios.create({});
instance.interceptors.request.use(tokenProvider({
  getToken: () => localStorage.getItem('access_token'),
}));
