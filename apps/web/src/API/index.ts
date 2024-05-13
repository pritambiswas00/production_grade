import axios, { AxiosRequestConfig } from 'axios';

interface CustomConfig extends AxiosRequestConfig {
  withCredentials: boolean;
}

const options: CustomConfig = {
  baseURL: import.meta.env.DEV
    ? 'http://localhost:4001'
    : 'https://express-to-do-app.web.app/',
  withCredentials: true,
};

const axiosInstance = axios.create(options);
axiosInstance.interceptors.request.use((config) => {
  if (localStorage.getItem('secret_jwt')) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('secret_jwt')}`;
  }
  return config;
});
export { axiosInstance };
