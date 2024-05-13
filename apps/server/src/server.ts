import express, { Express } from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { Database } from 'sqlite3';
import sqliteStoreFactory from 'express-session-sqlite';
import pgSession from 'connect-pg-simple';
import { Pool } from 'pg';
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
const PGSessionStore = pgSession(session);

const appInstance: Express = express();

appInstance.use(express.json());
appInstance.use(express.urlencoded({ extended: false }));
appInstance.use(helmet());

appInstance.use(
  cors({
    origin: '*',
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
    store: new PGSessionStore({
      tableName: 'session',
      pool: new Pool({
        max: 3,
        min: 1,
        application_name: 'express_to_do',
        host: 'aws-0-ap-south-1.pooler.supabase.com',
        database: 'postgres',
        port: 5432,
        user: 'postgres.fufpzfuxofkldvkfdwkg',
        password: '/)PKg7$RT5?u*iq',
      }),
      ttl: 1000 * 60 * 60 * 24,
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
