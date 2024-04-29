import { type LoggerOptions, transports, format, createLogger } from 'winston';
import { Environment, serverConfig } from '../config/config';

const options: LoggerOptions = {
  transports: [
    new transports.Console({
      level: serverConfig.NODE_ENV === Environment.DEV ? 'debug' : 'info',
      format: format.combine(
        format.colorize({
          colors: { debug: 'blue', error: 'red', info: 'green' },
        }),
        format.simple(),
      ),
    }),
  ],
};

const logger = createLogger(options);

export default logger;
