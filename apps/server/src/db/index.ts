import { Environment, serverConfig } from '../config/config';
import knex from 'knex';
const config = require('../../knexfile');

console.log(serverConfig.NODE_ENV, 'ENV');
const selectedDBConfig =
  config[
    serverConfig.NODE_ENV === Environment.DEV ? 'development' : Environment.PROD
  ];
const DB = knex(selectedDBConfig);
export { DB };
