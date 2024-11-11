import axios, { AxiosHeaders, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import AuthService from '../features/Auth/Service/AuthService';

const httpcommon = axios.create({
  baseURL: 'http://localhost:5134/',
  headers: {
    'Content-Type': 'application/json',
  },
});

httpcommon.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    const headers = config.headers instanceof AxiosHeaders ? config.headers : new AxiosHeaders(config.headers);

    const token = AuthService.getToken(); 
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Accept', 'application/json');

    config.headers = headers;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpcommon;
