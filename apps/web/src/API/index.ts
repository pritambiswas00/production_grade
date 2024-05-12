import axios, { AxiosRequestConfig } from 'axios';

interface CustomConfig extends AxiosRequestConfig {
  withCredentials: boolean;
}

const options: CustomConfig = {
  baseURL: import.meta.env.VITE_SERVER_URL,
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
