import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import logger from './logger/index';
import authRoutes from './routes/auth.routes';
import todoRoutes from './routes/todo.routes';
import userRoutes from './routes/user.routes';
import { swaggerInit } from './routes/swagger.config';

const appInstance: Express = express();

appInstance.use(express.json());
appInstance.use(express.urlencoded({ extended: false }));
appInstance.use(function (_: Request, res: Response, nextFn: NextFunction) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  nextFn();
});

appInstance.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

appInstance.set('logger', logger);

//Routes//
swaggerInit(appInstance);
appInstance.use('/auth', authRoutes);
appInstance.use('/v1/todo', todoRoutes);
appInstance.use('/v1/user', userRoutes);
export default appInstance;
