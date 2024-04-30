import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import { Express } from 'express';
import { serve, setup } from 'swagger-ui-express';

export const swaggerInit = (appInstance: Express): void => {
  const options: Options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'To Do Express Server',
        version: '1.0.0',
        description: 'API Documentation for the sever',
      },
    },
    apis: ['**/*.ts'],
    servers: [
      {
        url: 'http://localhost:4001',
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
