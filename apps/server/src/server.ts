import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import logger from './logger/index';

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

export default appInstance;
