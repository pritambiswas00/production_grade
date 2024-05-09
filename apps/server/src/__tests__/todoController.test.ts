import '@jest/globals';
import { faker } from '@faker-js/faker';
import { IToDo, IUser } from '../validationSchema/types';
import { createRequest, createResponse } from 'node-mocks-http';
import { toDoController } from '../controller/todo.controller';
import { toDoService } from '../services/todo.service';
import { sign } from 'jsonwebtoken';
import { serverConfig } from '../config/config';
import { ServerError } from '../Error/error';
jest.mock('../services/todo.service');

describe('Auth Controller', () => {
  let currentUser: Pick<IUser, 'id' | 'email' | 'name'>;
  let token: string;
  let currentUserId: number;
  beforeAll(() => {
    currentUserId = faker.number.int();
    currentUser = {
      email: 'pritam@mail.com',
      id: currentUserId,
      name: 'Pritam Biswas',
    };
    token = sign(currentUser, serverConfig.JWT_SECRET_KEY, {
      algorithm: 'HS512',
      expiresIn: 300,
    });
  });

  it('Create Todo - Success', async () => {
    const mockRequest = createRequest();
    const mockResponse = createResponse();
    const payload: Pick<IToDo, 'completed' | 'title' | 'description'> = {
      completed: false,
      description: 'Some todo description',
      title: 'Some todo title',
    };
    // mockRequest.se
    // const response:any = await toDoController.createToDo()
  });
  //   it('Create Todo - Success', async () => {
  //     const mockRequest = createRequest();
  //     const mockResponse = createResponse();
  //   });
  //   it('Create Todo - Success', async () => {
  //     const mockRequest = createRequest();
  //     const mockResponse = createResponse();
  //   });
  //   it('Create Todo - Success', async () => {
  //     const mockRequest = createRequest();
  //     const mockResponse = createResponse();
  //   });
  //   it('Create Todo - Success', async () => {
  //     const mockRequest = createRequest();
  //     const mockResponse = createResponse();
  //   });
  //   it('Create Todo - Success', async () => {
  //     const mockRequest = createRequest();
  //     const mockResponse = createResponse();
  //   });
  //   it('Create Todo - Success', async () => {
  //     const mockRequest = createRequest();
  //     const mockResponse = createResponse();
  //   });
  //   it('Create Todo - Success', async () => {
  //     const mockRequest = createRequest();
  //     const mockResponse = createResponse();
  //   });
  //   it('Create Todo - Success', async () => {
  //     const mockRequest = createRequest();
  //     const mockResponse = createResponse();
  //   });
  //   it('Create Todo - Success', async () => {
  //     const mockRequest = createRequest();
  //     const mockResponse = createResponse();
  //   });
});
