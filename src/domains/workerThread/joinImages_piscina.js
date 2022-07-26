import { __ndirname } from '../../support/utils.js';
import { Piscina } from 'piscina';
import path from 'node:path';

const concurrentTasksPerWorker = parseInt(process.argv[2] || 1);
const idleTimeout = parseInt(process.argv[3] || 0);

const piscina = new Piscina({
  filename: path.join(__ndirname(import.meta.url), '../../worker_piscina.js'),
  concurrentTasksPerWorker,
  idleTimeout,
});

export const joinImages = async (logger, { image, background }) => {
  const imageBase64 = await piscina.run({ image, background });

  logger.info('🧵 Worker: finished');

  return imageBase64;
};
