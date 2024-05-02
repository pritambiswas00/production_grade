import '@jest/globals';
import { createTracker, MockClient, Tracker } from 'knex-mock-client';
import { DB } from '../db/index';
import { toDoService } from '../services/todo.service';
import { faker } from '@faker-js/faker';
import { IToDo } from '../validationSchema/types';

jest.mock('../db/index', () => {
  const knex = require('knex');
  return {
    DB: knex({ client: MockClient }),
  };
});

describe('ToDo Service', () => {
  let tracker: Tracker;
  beforeAll(() => {
    tracker = createTracker(DB);
  });

  afterEach(() => {
    if (tracker) tracker.reset();
  });

  it('Create - ToDo', async () => {
    const id: number = faker.number.int();
    const user_id: number = faker.number.int();
    tracker.on.insert('todos').response<IToDo>({
      id: id,
      user_id: user_id,
      completed: false,
      created_at: new Date().toString(),
      description: 'Some description of the todos',
      title: 'First To Do',
      updated_at: new Date().toString(),
    });
    const payload = {
      title: 'First To Do',
      description: 'Some description of the todos',
      completed: false,
    };
    const [todo, error] = await toDoService.create(payload, user_id);
    expect(error).toBeNull();
    expect(todo).toEqual('Successfully created new Task');
  });

  it('Create - Error Occured', async () => {
    const userId: number = faker.number.int();
    tracker.on.insert('todos').simulateError(new Error('Error Occured'));
    const payload = {
      title: 'First To Do',
      description: 'Some description of the todos',
      completed: false,
    };
    const [todo, error] = await toDoService.create(payload, userId);
    expect(todo).toBeNull();
  });

  it('Get - ToDo', async () => {
    const userId: number = faker.number.int();
    const id: number = faker.number.int();
    const date = new Date().toString();
    tracker.on.select('todos').response<IToDo>({
      completed: false,
      created_at: date,
      description: 'Some Description',
      id: id,
      title: 'Some Title',
      updated_at: date,
      user_id: userId,
    });

    const [todo, error] = await toDoService.get(userId, id);
    expect(error).toBeNull();
    expect(todo).toEqual({
      completed: false,
      created_at: date,
      description: 'Some Description',
      id: id,
      title: 'Some Title',
      updated_at: date,
      user_id: userId,
    });
  });

  it('Get - ToDo - Error Occured', async () => {
    const userId: number = faker.number.int();
    const id: number = faker.number.int();
    tracker.on.select('todos').simulateError(new Error('Error Occured'));

    const [todo, error] = await toDoService.get(userId, id);
    expect(todo).toBeNull();
  });

  it('Get - ToDos', async () => {
    const userId: number = faker.number.int();
    tracker.on.select('todos').response<IToDo[]>([
      {
        completed: false,
        created_at: new Date().toString(),
        description: 'Some Description',
        id: faker.number.int(),
        title: 'Some Title',
        updated_at: new Date().toString(),
        user_id: userId,
      },
      {
        completed: false,
        created_at: new Date().toString(),
        description: 'Some Description',
        id: faker.number.int(),
        title: 'Some Title',
        updated_at: new Date().toString(),
        user_id: userId,
      },
      {
        completed: false,
        created_at: new Date().toString(),
        description: 'Some Description',
        id: faker.number.int(),
        title: 'Some Title',
        updated_at: new Date().toString(),
        user_id: userId,
      },
      {
        completed: false,
        created_at: new Date().toString(),
        description: 'Some Description',
        id: faker.number.int(),
        title: 'Some Title',
        updated_at: new Date().toString(),
        user_id: userId,
      },
      {
        completed: false,
        created_at: new Date().toString(),
        description: 'Some Description',
        id: faker.number.int(),
        title: 'Some Title',
        updated_at: new Date().toString(),
        user_id: userId,
      },
      {
        completed: false,
        created_at: new Date().toString(),
        description: 'Some Description',
        id: faker.number.int(),
        title: 'Some Title',
        updated_at: new Date().toString(),
        user_id: userId,
      },
      {
        completed: false,
        created_at: new Date().toString(),
        description: 'Some Description',
        id: faker.number.int(),
        title: 'Some Title',
        updated_at: new Date().toString(),
        user_id: userId,
      },
      {
        completed: false,
        created_at: new Date().toString(),
        description: 'Some Description',
        id: faker.number.int(),
        title: 'Some Title',
        updated_at: new Date().toString(),
        user_id: userId,
      },
      {
        completed: false,
        created_at: new Date().toString(),
        description: 'Some Description',
        id: faker.number.int(),
        title: 'Some Title',
        updated_at: new Date().toString(),
        user_id: userId,
      },
      {
        completed: false,
        created_at: new Date().toString(),
        description: 'Some Description',
        id: faker.number.int(),
        title: 'Some Title',
        updated_at: new Date().toString(),
        user_id: userId,
      },
      {
        completed: false,
        created_at: new Date().toString(),
        description: 'Some Description',
        id: faker.number.int(),
        title: 'Some Title',
        updated_at: new Date().toString(),
        user_id: userId,
      },
      {
        completed: false,
        created_at: new Date().toString(),
        description: 'Some Description',
        id: faker.number.int(),
        title: 'Some Title',
        updated_at: new Date().toString(),
        user_id: userId,
      },
      {
        completed: false,
        created_at: new Date().toString(),
        description: 'Some Description',
        id: faker.number.int(),
        title: 'Some Title',
        updated_at: new Date().toString(),
        user_id: userId,
      },
    ]);
    const [todos, error] = await toDoService.get(userId, undefined, {
      page: 1,
      pageSize: 5,
    });
    console.log(todos);
    expect(error).toBeNull();
    expect(todos).toBeInstanceOf(Array);
  });

  it('Get - ToDos - Error Occured', async () => {
    const userId: number = faker.number.int();
    tracker.on.select('todos').simulateError(new Error('Error Occured'));
    const [todos, error] = await toDoService.get(userId, undefined, {
      page: 1,
      pageSize: 5,
    });
    expect(todos).toBeNull();
  });

  it('Get - ToDos - Not Found', async () => {
    const userId: number = faker.number.int();
    const id: number = faker.number.int();
    tracker.on.select('todos').response<IToDo[] | null>(null);

    const [todo, error] = await toDoService.get(userId, id);
    expect(todo).toBeNull();
    expect(error).toBeInstanceOf(Object);
  });

  it('Update - ToDo', async () => {
    const userId: number = faker.number.int();
    const id: number = faker.number.int();
    const date = new Date().toString();
    const payload = {
      title: 'Pritam New Task',
    };
    tracker.on.update('todos').response<IToDo>({
      completed: false,
      created_at: date,
      description: 'Some Description',
      id: id,
      title: payload.title,
      updated_at: date,
      user_id: userId,
    });
    const [updatedToDo, error] = await toDoService.update(payload, id, userId);
    expect(error).toBeNull();
    expect(updatedToDo).toEqual({
      completed: false,
      created_at: date,
      description: 'Some Description',
      id: id,
      title: payload.title,
      updated_at: date,
      user_id: userId,
    });
  });

  it('Update - Todo - Not Found', async () => {
    const userId: number = faker.number.int();
    const id: number = faker.number.int();
    const payload = {
      title: 'Pritam New Task',
    };
    tracker.on.update('todos').response<IToDo | undefined>(undefined);
    const [updatedToDo, error] = await toDoService.update(payload, id, userId);
    expect(updatedToDo).toBeNull();
    expect(error).toBeInstanceOf(Object);
  });

  it('Update - Todo - Error Occured', async () => {
    const userId: number = faker.number.int();
    const id: number = faker.number.int();
    const payload = {
      title: 'Pritam New Task',
    };
    tracker.on.update('todos').simulateError(new Error('Error Occured'));
    const [updatedToDo, error] = await toDoService.update(payload, id, userId);
    expect(updatedToDo).toBeNull();
  });

  it('Delete - ToDo', async () => {
    const userId: number = faker.number.int();
    const id: number = faker.number.int();
    tracker.on.delete('todos').response<number>(1);
    const [deletedToDo, error] = await toDoService.delete(id, userId);
    expect(deletedToDo).toEqual('Successfullt deleted the Todo');
    expect(error).toBeNull();
  });

  it('Delete - ToDo - Error Occured', async () => {
    const userId: number = faker.number.int();
    const id: number = faker.number.int();
    tracker.on.delete('todos').simulateError(new Error('Error Occured'));
    const [deletedToDo, error] = await toDoService.delete(id, userId);
    expect(deletedToDo).toBeNull();
  });

  it('Delete - ToDo - Not Found ToDo', async () => {
    const userId: number = faker.number.int();
    const id: number = faker.number.int();
    tracker.on.delete('todos').response<number>(0);
    const [deletedToDo, error] = await toDoService.delete(id, userId);
    console.log(error, 'ERR');
    expect(deletedToDo).toBeNull();
    expect(error).toBeInstanceOf(Object);
  });
});
