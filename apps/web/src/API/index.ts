import axios, { AxiosRequestConfig } from 'axios';

interface CustomConfig extends AxiosRequestConfig {
  withCredentials: boolean;
}

const options: CustomConfig = {
  baseURL: 'http://localhost:8080',
  withCredentials: true,
};

const axiosInstance = axios.create(options);
export { axiosInstance };
