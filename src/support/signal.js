import { SUCESS_EXIT_CODE } from './utils.js';

const listeners = [];

export const onStop = listener => {
  listeners.push(listener);
};

const handler = async (err, signal) => {
  try {
    listeners[0](err, signal);
  } catch (e) {
    console.error({ e });
  } finally {
    // eslint-disable-next-line no-process-exit
    process.exit(SUCESS_EXIT_CODE);
  }
};

process.on('beforeExit', () => handler(null, 'beforeExit'));
process.on('exit', () => handler(null, 'exit'));
process.on('uncaughtException', err => handler(err, 'uncaughtException'));
process.on('SIGINT', () => handler(null, 'SIGINT'));
process.on('SIGQUIT', () => handler(null, 'SIGQUIT'));
process.on('SIGTERM', () => handler(null, 'SIGTERM'));
