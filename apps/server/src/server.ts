import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import swaggerJsDoc, { Options } from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import logger from './logger/index';
import authRoutes from './routes/auth.routes';
import todoRoutes from './routes/todo.routes';
import userRoutes from './routes/user.routes';
import DB from './db';
import { swaggerInit } from './routes/swagger.config';
// import { IToDo } from './validation_schema/types';

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
