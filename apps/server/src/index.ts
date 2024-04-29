import appInstance from './server';
import { Environment, serverConfig } from './config/config';
import { createServer } from 'http';

const server = createServer(appInstance);

//Start the Server
server.listen(serverConfig.PORT, () => {
  const logger = appInstance.get('logger');
  serverConfig.NODE_ENV === Environment.DEV
    ? logger.debug(`Server has started on Port ${serverConfig.PORT}`)
    : logger.info(`Server has started on Port ${serverConfig.PORT}`);
});

// Listen for the SIGINT signal
process.on('SIGINT', async () => {
  const logger = appInstance.get('logger');
  logger.info('Received SIGINT signal. Gracefully shutting down...');

  // Perform any necessary cleanup operations here
  // For example, close database connections, release resources, etc.

  // Close the server
  server.close(() => {
    logger.info('Server gracefully shut down');
    process.exit(0);
  });
});
