import { AxiosError, AxiosResponse } from 'axios';
import { axiosInstance } from './index';
import { type ISignIn, type ICreateUser } from '@/schema/types';

interface Response<T extends string> {
  message: string;
  token?: T;
}

//Checked
export const loginUser = async (
  payload: ISignIn,
): Promise<(string | null)[] | (Error | null)[]> => {
  try {
    const response = (await axiosInstance.post(
      '/auth/signin',
      payload,
    )) as AxiosResponse<Response<string>>;
    if (response.data.token) {
      localStorage.setItem('secret_jwt', response.data.token);
    }
    return [response.data.message, null];
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return [null, error];
    } else {
      return [null, new Error('Error')];
    }
  }
};

//Checked
export const signUp = async (payload: ICreateUser) => {
  try {
    const response = (await axiosInstance.post(
      '/auth/signup',
      payload,
    )) as AxiosResponse<Response<string>>;
    return [response.data.message, null];
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return [null, error];
    } else {
      return [null, new Error('Error')];
    }
  }
};

//Checked
export const signOut = async () => {
  try {
    const response = (await axiosInstance.post(
      '/auth/signout',
      {},
      { withCredentials: true },
    )) as AxiosResponse<Response<string>>;
    localStorage.removeItem('secret_jwt');
    return [response.data.message, null];
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return [null, error];
    } else {
      return [null, new Error('Error')];
    }
  }
};
