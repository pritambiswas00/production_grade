import { serverConfig } from '../config/config';
import { IUser } from '../validationSchema/types';
import { DB } from '../db/index';
import { sign, verify } from 'jsonwebtoken';
import { ServerError } from '../Error/error';

const authService = {
  signIn: async (
    user: Pick<IUser, 'email' | 'id' | 'name'>,
  ): Promise<[string | null, unknown | null]> => {
    try {
      const payload: string = sign(user, serverConfig.JWT_SECRET_KEY, {
        algorithm: 'HS512',
        expiresIn: 300,
      });
      await DB<IUser>('users')
        .where({ id: user.id, email: user.email })
        .update({ session: payload });

      return [payload, null];
    } catch (error: unknown) {
      return [null, error];
    }
  },
  signOut: async (
    user: Pick<IUser, 'id' | 'email' | 'name'>,
  ): Promise<[string | null, ServerError | unknown]> => {
    try {
      const userInfo = await DB<IUser>('users')
        .where({ id: user.id, email: user.email })
        .first()
        .select('*');
      console.log(userInfo);
      if (!userInfo.session)
        return [null, new ServerError("Couldn't find the session.")];
      if (
        !verify(userInfo.session, serverConfig.JWT_SECRET_KEY, {
          algorithms: ['HS512'],
        })
      ) {
        await DB<IUser>('users')
          .where({ id: user.id, email: user.email })
          .update({ session: '' });
        return [null, new ServerError('Please try to login again')];
      } else {
        await DB<IUser>('users')
          .where({ id: user.id, email: user.email })
          .update({ session: '' });
        return ['You have successfully logged out.', null];
      }
    } catch (error: unknown) {
      console.log(error, 'Error');
      return [null, error];
    }
  },
};

export { authService };
