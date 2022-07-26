import { SUCESS_EXIT_CODE, __ndirname } from '../../support/utils.js';
import { Worker } from 'node:worker_threads';
import path from 'node:path';

export const joinImages = (logger, images) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      path.join(__ndirname(import.meta.url), '../../worker.js')
    );

    logger.info(`🧵 Worker: ${worker.threadId} started`);

    worker.postMessage(images);

    worker.once('message', resolve);
    worker.once('error', reject);
    worker.once('exit', code => {
      if (code !== SUCESS_EXIT_CODE) {
        reject(
          new Error(`Thread: ${worker.threadId} stopped with code: ${code}`)
        );
      }

      logger.error(`The thread ${worker.threadId} has been stopped`);
    });
  });
};
