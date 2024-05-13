import { Environment, serverConfig } from '../config/config';
import config, { IConfig } from '../knexfile';
import knex, { Knex } from 'knex';

const selectedDBConfig =
  config[
    serverConfig.NODE_ENV === Environment.DEV
      ? 'development'
      : serverConfig.NODE_ENV === Environment.PROD
        ? 'production'
        : 'test'
  ];
const DB = knex<Knex.Config<IConfig>>(selectedDBConfig);
export { DB };
