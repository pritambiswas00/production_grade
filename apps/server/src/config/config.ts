import { z, infer as _infer } from 'zod';
import { config } from 'dotenv';
import { resolve } from 'path';

export enum Environment {
  DEV = 'development',
  PROD = 'production',
  TEST = 'test',
}
config({
  path: resolve(__dirname, '..', '..', '.env'),
  debug: process.env.NODE_ENV === Environment.DEV ? true : false,
});

const ServerConfig = z
  .object({
    NODE_ENV: z
      .enum([Environment.DEV, Environment.PROD, Environment.TEST])
      .default(Environment.DEV),
    PORT: z
      .string()
      .max(4, { message: 'PORT length must be 4' })
      .refine((c) => Number(c), { message: 'Please provide valid PORT' })
      .default('8080'),
    SESSION_KEY: z.string().default('SESSION_KEY'),
    JWT_SECRET_KEY: z.string().default('JWT_SECRET_KEY'),
  })
  .readonly();

type IServerConfig = _infer<typeof ServerConfig>;
const serverConfig: IServerConfig = ServerConfig.parse(process.env);

export { type IServerConfig, serverConfig };
