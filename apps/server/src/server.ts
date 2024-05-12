import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { Database } from 'sqlite3';
import sqliteStoreFactory from 'express-session-sqlite';
import helmet from 'helmet';
import logger from './logger/index';
import authRoutes from './routes/auth.routes';
import todoRoutes from './routes/todo.routes';
import userRoutes from './routes/user.routes';
import { swaggerInit } from './routes/swagger.config';
import { initPassport } from './middleware/index';
import { Environment, serverConfig } from './config/config';

//Session Store//
const SQLiteStore = sqliteStoreFactory(session);

const appInstance: Express = express();

appInstance.use(express.json());
appInstance.use(express.urlencoded({ extended: false }));
appInstance.use(helmet());

appInstance.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

//Logger//
appInstance.set('logger', logger);

//Session//
appInstance.use(cookieParser());
appInstance.use(
  session({
    secret: serverConfig.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    store: new SQLiteStore({
      driver: Database,
      path: './sessions.db',
      ttl: 300000,
      prefix:
        serverConfig.NODE_ENV === Environment.DEV
          ? Environment.DEV
          : Environment.PROD,
      cleanupInterval: 240000,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

//Passport JS
initPassport(appInstance);

//Rate Limiter
appInstance.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
  }),
);

//Documentation Route//
swaggerInit(appInstance);

//API Routes//
appInstance.use('/auth', authRoutes);
appInstance.use('/v1/todo', todoRoutes);
appInstance.use('/v1/user', userRoutes);
export default appInstance;
