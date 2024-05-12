import { AxiosError, AxiosResponse } from 'axios';
import { axiosInstance } from './index';
import { type IUserDetails } from '@/schema/types';

interface Response<T> {
  data: T;
}

export const getUser = async () => {
  try {
    const response = (await axiosInstance.get('/v1/user', {
      withCredentials: true,
    })) as AxiosResponse<Response<IUserDetails>>;
    return [response.data.data, null];
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return [null, error];
    } else {
      return [null, new Error('Error')];
    }
  }
};
