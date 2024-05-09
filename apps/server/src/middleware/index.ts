import { Response, Request, Handler, Express, NextFunction } from 'express';
import passport from 'passport';
import { DB } from '../db/index';
import { genLocalStrategy } from './startegies/local-strategy';
import { IUser } from '../validationSchema/types';
import { Unauthorized } from 'http-errors';
import { genJWTStrategy } from './startegies/jwt-strategy';

const initPassport = (appInstance: Express): void => {
  appInstance.use(passport.initialize());
  appInstance.use(passport.session());
  passport.use(genLocalStrategy());
  passport.use(genJWTStrategy());

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser(async (user: Pick<IUser, 'id' | 'email'>, done) => {
    const userInfo = await DB<IUser>('users')
      .where({ id: user.id, email: user.email })
      .first()
      .select('id', 'email', 'name');
    done(null, userInfo);
  });
};

const isAuthenticated = (req: Request, res: Response, nextFn: NextFunction) => {
  if (req.user && req.isAuthenticated()) return nextFn();
  else res.status(403).json(new Unauthorized('Unauthorized'));
};

export { isAuthenticated, initPassport };
