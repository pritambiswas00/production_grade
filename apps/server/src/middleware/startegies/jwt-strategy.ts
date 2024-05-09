import passportJWT, { VerifiedCallback } from 'passport-jwt';
import { DB } from '../../db/index';
import { IUser } from '../../validationSchema/types';
import { serverConfig } from '../../config/config';

const PassportJWT = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const genJWTStrategy = () => {
  return new PassportJWT(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: serverConfig.JWT_SECRET_KEY,
    },
    async (
      jwtPayload: Pick<IUser, 'id' | 'email' | 'name'>,
      callback: VerifiedCallback,
    ) => {
      return DB<IUser>('users')
        .where({ id: jwtPayload.id })
        .first()
        .select('email', 'id', 'name')
        .then((user) => callback(null, user))
        .catch((error) => callback(error));
    },
  );
};

export { genJWTStrategy };
