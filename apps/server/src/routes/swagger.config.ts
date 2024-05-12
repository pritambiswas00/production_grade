import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import { Express } from 'express';
import { serve, setup } from 'swagger-ui-express';
import { Environment, serverConfig } from '../config/config';

export const swaggerInit = (appInstance: Express): void => {
  const options: Options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'To Do Application',
        version: '1.0.0',
        description: 'API Documentation',
      },
    },
    apis: ['**/*.ts'],
    servers: [
      {
        url:
          serverConfig.NODE_ENV === Environment.DEV
            ? `http://localhost:${serverConfig.PORT}`
            : `http://34.133.83.12:${serverConfig.PORT}`,
      },
    ],
  };
  const specs = swaggerJSDoc(options);
  appInstance.use(
    '/docs',
    serve,
    setup(specs, {
      explorer: true,
    }),
  );
};
