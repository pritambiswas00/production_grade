import { Knex } from 'knex';
import { IUser } from '../validationSchema/types';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex<IUser>('users').insert([
    {
      id: 1,
      created_at: new Date().toString(),
      email: 'pritambiswas1@gmail.com',
      name: 'Pritam Biswas',
      updated_at: new Date().toString(),
      password: 'sdsdsdsd',
    },
    {
      id: 2,
      created_at: new Date().toString(),
      email: 'pritambiswas2@gmail.com',
      name: 'Pritam Biswas',
      updated_at: new Date().toString(),
      password: 'sdsdsdsd',
    },
    {
      id: 3,
      created_at: new Date().toString(),
      email: 'pritambiswas3@gmail.com',
      name: 'Pritam Biswas',
      updated_at: new Date().toString(),
      password: 'dsdssdsd',
    },
    {
      id: 4,
      created_at: new Date().toString(),
      email: 'pritambiswas4@gmail.com',
      name: 'Pritam Biswas',
      updated_at: new Date().toString(),
      password: 'sfsddsds',
    },
    {
      id: 5,
      created_at: new Date().toString(),
      email: 'pritambiswas5@gmail.com',
      name: 'Pritam Biswas',
      updated_at: new Date().toString(),
      password: 'ssdsds',
    },
  ]);
}
