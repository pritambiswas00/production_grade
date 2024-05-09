import '@jest/globals';
import { faker } from '@faker-js/faker';
import { IUser } from '../validationSchema/types';
import { createRequest, createResponse } from 'node-mocks-http';
import { authController } from '../controller/auth.conroller';
import { authService } from '../services/auth.service';
import { sign } from 'jsonwebtoken';
import { ServerError } from '../Error/error';
import { userService } from '../services/user.service';
jest.mock('../services/auth.service');
jest.mock('../services/user.service');

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
    token = sign(currentUser, 'some_secret_key', {
      algorithm: 'HS512',
      expiresIn: 300,
    });
  });

  it('SignIn - User - Successfully Logged In', async () => {
    const mockResponse = createResponse();
    const mockRequest = createRequest();
    mockRequest.user = currentUser;
    mockRequest.body = {
      email: 'pritam@mail.com',
      password: '123456789',
    } satisfies Pick<IUser, 'email' | 'password'>;
    authService.signIn = jest.fn().mockResolvedValueOnce([token, null]);
    const response: any = await authController.signIn(
      mockRequest,
      mockResponse,
    );
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toMatchObject({
      message: 'Successfully logged in.',
      token: token,
    });
  });

  it('SignIn - User - Not Exist User', async () => {
    const mockRequest = createRequest();
    const mockResponse = createResponse();
    mockRequest.user = undefined;
    mockRequest.body = {
      email: 'pritam@mail.com',
      password: '123456789',
    } satisfies Pick<IUser, 'email' | 'password'>;

    const response: any = await authController.signIn(
      mockRequest,
      mockResponse,
    );
    expect(response.statusCode).toEqual(400);
    expect(response._getJSONData()).toMatchObject({
      message: 'Please login again.',
    });
  });

  it('SignIn - User - Not Able to generate token', async () => {
    const mockRequest = createRequest();
    const mockResponse = createResponse();
    mockRequest.user = currentUser;
    mockRequest.body = {
      email: 'pritam@mail.com',
      password: '123456789',
    } satisfies Pick<IUser, 'email' | 'password'>;
    authService.signIn = jest
      .fn()
      .mockResolvedValueOnce([
        null,
        new ServerError("Couldn't Generate Token"),
      ]);
    const response: any = await authController.signIn(
      mockRequest,
      mockResponse,
    );
    expect(response.statusCode).toEqual(400);
    expect(response._getJSONData()).toMatchObject({
      message: "Couln't generate token",
    });
  });

  it('Sign Up - User', async () => {
    const mockRequest = createRequest();
    const mockResponse = createResponse();
    mockRequest.body = {
      name: currentUser.name,
      email: currentUser.email,
      password: '123456789',
    } satisfies Pick<IUser, 'email' | 'name' | 'password'>;
    userService.create = jest
      .fn()
      .mockResolvedValue(['Successfully created the user', null]);
    const response: any = await authController.signUp(
      mockRequest,
      mockResponse,
    );
    expect(response.statusCode).toEqual(201);
    expect(response._getJSONData()).toMatchObject({
      message: 'Successfully created the user. Please log in.',
    });
  });

  it('SignUp - Request Body Error', async () => {
    const mockRequst = createRequest();
    const mockResponse = createResponse();
    mockRequst.body = {
      name: '',
      email: '',
      password: '',
    } satisfies Partial<Pick<IUser, 'email' | 'name' | 'password'>>;

    const response: any = await authController.signUp(mockRequst, mockResponse);
    expect(response.statusCode).toEqual(400);
  });
});
