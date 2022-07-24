import pino from 'pino';

const dest = pino.destination();

const isEnviroment = enviroment => process.env.NODE_ENV === enviroment;

const checkPrettyPrint = () => {
  if (!isEnviroment('development')) {
    return null;
  }

  return {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  };
};

const options = {
  name: 'http-server',
  messageKey: 'message',
  level: isEnviroment('production') ? 'info' : 'debug',
  transport: checkPrettyPrint(),
  formatters: {
    level(label) {
      return { level: label };
    },
  },
};

export const logger = pino(options, dest);
