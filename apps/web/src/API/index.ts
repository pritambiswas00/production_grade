import axios, { AxiosRequestConfig } from 'axios';

interface CustomConfig extends AxiosRequestConfig {
  withCredentials: boolean;
}

const options: CustomConfig = {
  baseURL: import.meta.env.DEV
    ? 'http://localhost:4001'
    : 'https://geometric-rex-332309.el.r.appspot.com/',
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
