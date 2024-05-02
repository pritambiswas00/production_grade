import '@jest/globals';
import { createTracker, MockClient, Tracker } from 'knex-mock-client';
import { DB } from '../db/index';
import { userService } from '../services/user.service';
import { faker } from '@faker-js/faker';
import { IUser } from '../validationSchema/types';

jest.mock('../db/index', () => {
  const knex = require('knex');
  return {
    DB: knex({ client: MockClient }),
  };
});

describe('User Service', () => {
  let tracker: Tracker;

  beforeAll(() => {
    tracker = createTracker(DB);
  });

  afterEach(() => {
    if (tracker) tracker.reset();
  });

  it('Create - User', async () => {
    const payload = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password',
    };

    tracker.on.insert('users').response<IUser>({
      created_at: new Date().toString(),
      email: 'test@example.com',
      name: 'Test User',
      password: 'password',
      id: faker.number.int(),
      updated_at: new Date().toString(),
    });
    const [message, error] = await userService.create(payload);

    expect(error).toBeNull();
    expect(message).toEqual('User successfully registered');
  });

  it('Create - User - Error Occurred', async () => {
    const payload = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password',
    };

    tracker.on.insert('users').simulateError(new Error('Error Occurred'));

    const [_, error] = await userService.create(payload);

    expect(error).not.toBeNull();
  });

  it('Get - User', async () => {
    const userId = faker.number.int();
    const user: Partial<IUser> = {
      id: userId,
      email: 'test@example.com',
      name: 'Test User',
    };

    tracker.on.select('users').response<Partial<IUser>>(user);

    const [retrievedUser, error] = await userService.get(userId);

    expect(error).toBeNull();
    expect(retrievedUser).toEqual(user);
  });

  it('Get - User - Not Found', async () => {
    const userId = faker.number.int();

    tracker.on.select('users').response<IUser | null>(null);

    const [_, error] = await userService.get(userId);

    expect(error).not.toBeNull();
  });

  it('Get - User - Error Occurred', async () => {
    const userId = faker.number.int();

    tracker.on.select('users').simulateError(new Error('Error Occurred'));

    const [_, error] = await userService.get(userId);

    expect(error).not.toBeNull();
  });

  it('Update - User', async () => {
    const userId = faker.number.int();
    const payload = {
      email: 'newemail@example.com',
      name: 'New Name',
    };

    tracker.on.update('users').response<number>(1);

    const [message, error] = await userService.update(payload, userId);

    expect(error).toBeNull();
    expect(message).toEqual('User Successfully updated.');
  });

  it('Update - User - Not Found', async () => {
    const userId = faker.number.int();
    const payload = {
      email: 'newemail@example.com',
      name: 'New Name',
    };

    tracker.on.update('users').response<number>(0);

    const [_, error] = await userService.update(payload, userId);

    expect(error).not.toBeNull();
  });

  it('Update - User - Error Occurred', async () => {
    const userId = faker.number.int();
    const payload = {
      email: 'newemail@example.com',
      name: 'New Name',
    };

    tracker.on.update('users').simulateError(new Error('Error Occurred'));

    const [_, error] = await userService.update(payload, userId);

    expect(error).not.toBeNull();
  });

  it('Delete - User', async () => {
    const userId = faker.number.int();

    tracker.on.delete('users').response<number>(1);

    const [message, error] = await userService.delete(userId);

    expect(error).toBeNull();
    expect(message).toEqual('Successfully deleted the user.');
  });

  it('Delete - User - Error Occurred', async () => {
    const userId = faker.number.int();

    tracker.on.delete('users').simulateError(new Error('Error Occurred'));

    const [_, error] = await userService.delete(userId);

    expect(error).not.toBeNull();
  });
});
