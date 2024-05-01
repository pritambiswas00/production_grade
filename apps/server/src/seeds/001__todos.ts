import { Knex } from 'knex';
import { IToDo } from '../validationSchema/types';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('todos').del();

  // Inserts seed entries
  await knex<IToDo>('todos').insert([
    {
      id: 1,
      completed: false,
      created_at: new Date().toString(),
      title: 'Some title',
      updated_at: new Date().toString(),
      user_id: 2,
      description: 'dsdsdsdsdsd',
    },
    {
      id: 2,
      completed: false,
      created_at: new Date().toString(),
      title: 'Some title',
      updated_at: new Date().toString(),
      user_id: 2,
      description: 'dsdsdsdsdsd',
    },
    {
      id: 3,
      completed: false,
      created_at: new Date().toString(),
      title: 'Some title',
      updated_at: new Date().toString(),
      user_id: 1,
      description: 'dsdsdsdsdsd',
    },
    {
      id: 4,
      completed: false,
      created_at: new Date().toString(),
      title: 'Some title',
      updated_at: new Date().toString(),
      user_id: 1,
      description: 'dsdsdsdsdsd',
    },
    {
      id: 5,
      completed: false,
      created_at: new Date().toString(),
      title: 'Some title',
      updated_at: new Date().toString(),
      user_id: 1,
      description: 'dsdsdsdsdsd',
    },
    {
      id: 6,
      completed: false,
      created_at: new Date().toString(),
      title: 'Some title',
      updated_at: new Date().toString(),
      user_id: 1,
      description: 'dsdsdsdsdsd',
    },
    {
      id: 7,
      completed: false,
      created_at: new Date().toString(),
      title: 'Some title',
      updated_at: new Date().toString(),
      user_id: 3,
      description: 'dsdsdsdsdsd',
    },
  ]);
}
