// Update with your config settings.
import { Knex } from 'knex';
import { serverConfig } from './config/config';
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
enum Env {
  DEV = 'development',
  TEST = 'test',
  PROD = 'production',
}

enum Connection {
  SQLITE3 = 'sqlite3',
  POSTGRES = 'postgresql',
}

export interface IConfig {
  client: Connection;
  connection: {
    filename: string;
  };
  useNullAsDefault: boolean;
  pool: { min: number; max: number };
  debug: boolean;
  migrations: {
    directory: string;
  };
  seeds: {
    directory: string;
  };
}

export default {
  development: {
    client: Connection.SQLITE3,
    connection: {
      filename: './dev.db3',
    },
    useNullAsDefault: true,
    pool: { min: 0, max: 7 },
    debug: true,
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },

  test: {
    client: Connection.SQLITE3,
    connection: {
      filename: '/dev.db3',
    },
    useNullAsDefault: true,
    pool: { min: 0, max: 7 },
    debug: true,
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },

  production: {
    client: Connection.POSTGRES,
    connection: {
      host: serverConfig.HOST,
      port: Number(serverConfig.DB_PORT),
      user: serverConfig.USER,
      password: serverConfig.PASSWORD,
      database: serverConfig.DATABASE,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
} satisfies Record<Env, Knex.Config<IConfig>>;
