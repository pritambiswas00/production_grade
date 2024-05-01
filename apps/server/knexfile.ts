// Update with your config settings.
import { Knex } from 'knex';
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
enum Env {
  DEV = 'development',
  STAGING = 'staging',
  PROD = 'production',
}

enum Connection {
  SQLITE3 = 'sqlite3',
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
      directory: './src/migrations',
    },
    seeds: {
      directory: './src/seeds',
    },
  },

  staging: {
    client: Connection.SQLITE3,
    connection: {
      filename: '/staging.db3',
    },
    useNullAsDefault: true,
    pool: { min: 0, max: 7 },
    debug: true,
    migrations: {
      directory: './src/migrations',
    },
    seeds: {
      directory: './src/seeds',
    },
  },

  production: {
    client: Connection.SQLITE3,
    connection: {
      filename: './src/prod.db3',
    },
    useNullAsDefault: true,
    pool: { min: 0, max: 7 },
    debug: false,
  },
} satisfies Record<Env, Knex.Config<IConfig>>;
