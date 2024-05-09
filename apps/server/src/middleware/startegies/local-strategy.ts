import PassportLocal from 'passport-local';
import { DB } from '../../db/index';
import { IUser } from '../../validationSchema/types';
import { verifyPassword } from '../../utils';

const LocalStrategy = PassportLocal.Strategy;

export const genLocalStrategy = (): PassportLocal.Strategy => {
  return new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async function (email, password, done) {
      try {
        if (!email) done(null, false);
        const isUserExist = await DB<IUser>('users')
          .where({ email: email })
          .first()
          .select('email', 'id', 'name', 'password');
        if (!isUserExist)
          return done(null, false, {
            message: 'User not found. Please register',
          });
        const isPasswordMatch = verifyPassword(password, isUserExist.password);
        if (!isPasswordMatch) {
          return done(null, false, {
            message: 'Email and Password is incorrect. Please check',
          });
        }
        return done(null, {
          id: isUserExist.id,
          email: isUserExist.email,
          name: isUserExist.name,
        });
      } catch (error: unknown) {
        return done(error);
      }
    },
  );
};
