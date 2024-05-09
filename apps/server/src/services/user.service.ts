import { DB } from '../db/index';
import { KnexTimeoutError } from 'knex';
import { IUser } from '../validationSchema/types';
import { ServerError } from '../Error/error';
import { generateHashPassword } from '../utils';

const userService = {
  create: async (
    payload: Pick<IUser, 'email' | 'name' | 'password'>,
  ): Promise<[string | null, ServerError | null | unknown]> => {
    try {
      const isUserExist = await DB.select()
        .from<IUser>('users')
        .where({ email: payload.email })
        .first();
      if (isUserExist) return [null, new ServerError('User already exists.')];
      const newUser = await DB<IUser>('users').insert(payload).select('*');
      if (newUser) return ['User successfully registered', null];
      return [null, new ServerError("Couldn't create the user")];
    } catch (error: unknown) {
      if (error instanceof KnexTimeoutError) {
        return [null, new ServerError(error.message)];
      }
      return [null, error];
    }
  },
  get: async (
    userId: number,
  ): Promise<
    [Pick<IUser, 'email' | 'name'> | null, ServerError | null | unknown]
  > => {
    try {
      const user = await DB<IUser>('users')
        .where({ id: userId })
        .first()
        .select('email', 'name');

      if (user) {
        return [user, null];
      } else {
        return [null, new ServerError(`Couldn't find user.`)];
      }
    } catch (error: unknown) {
      if (error instanceof KnexTimeoutError) {
        return [null, new ServerError(error.message)];
      }
      return [null, error];
    }
  },
  update: async (
    payload: Partial<Pick<IUser, 'name' | 'email' | 'password'>>,
    userId: number,
  ): Promise<[string | null, ServerError | null | unknown]> => {
    try {
      let hashedPassword: string | null = null;
      if (payload.password) {
        hashedPassword = generateHashPassword(payload.password);
        payload.password = hashedPassword;
      }
      const updatedUser = await DB<IUser>('users')
        .where({ id: userId })
        .update(payload)
        .select('*');
      if (updatedUser) return ['User Successfully updated.', null];
      return [null, new ServerError("Couldn't updated the user")];
    } catch (error: unknown) {
      if (error instanceof KnexTimeoutError) {
        return [null, new ServerError(error.message)];
      }
      return [null, error];
    }
  },
  delete: async (
    userId: number,
  ): Promise<[string | null, ServerError | null | unknown]> => {
    try {
      await DB<IUser>('users').where({ id: userId }).delete();
      return ['Successfully deleted the user.', null];
    } catch (error: unknown) {
      if (error instanceof KnexTimeoutError) {
        return [null, new ServerError(error.message)];
      }
      return [null, error];
    }
  },
};

export { userService };
