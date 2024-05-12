import { AxiosError, AxiosResponse } from 'axios';
import { axiosInstance } from './index';
import { ICreateToDo, IToDo } from '@/schema/types';

interface Response<T> {
  data: T;
}

interface ResponseMessage {
  message: string;
}

export const getAllToDo = async () => {
  try {
    const response = (await axiosInstance.get('/v1/todo/all', {
      withCredentials: true,
    })) as AxiosResponse<Response<IToDo[]>>;
    return [response.data.data, null];
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return [null, error];
    } else {
      return [null, new Error('Error')];
    }
  }
};

export const createToDo = async (payload: ICreateToDo) => {
  try {
    const response = (await axiosInstance.post('/v1/todo/create', payload, {
      withCredentials: true,
    })) as AxiosResponse<ResponseMessage>;
    return [response.data.message, null];
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return [null, error];
    } else {
      return [null, new Error('Error')];
    }
  }
};

export const updateToDo = async (payload: ICreateToDo, id: number) => {
  try {
    const response = (await axiosInstance.patch(
      `/v1/todo/update/${id}`,
      payload,
      {
        withCredentials: true,
      },
    )) as AxiosResponse<Response<IToDo>>;
    return [response.data.data, null];
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return [null, error];
    } else {
      return [null, new Error('Error')];
    }
  }
};

export const deleteToDo = async (id: number) => {
  try {
    const response = (await axiosInstance.delete(`/v1/todo/delete/${id}`, {
      withCredentials: true,
    })) as AxiosResponse<ResponseMessage>;
    return [response.data.message, null];
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return [null, error];
    } else {
      return [null, new Error('Error')];
    }
  }
};
