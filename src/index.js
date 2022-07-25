InjectHttpInterceptor();
import { buildServer, InjectHttpInterceptor } from './server/index.js';
import { __ndirname, SUCESS_EXIT_CODE } from './support/utils.js';
import { logger } from './support/logger/service.js';
import { serverConfig } from './server/config.js';
import { Worker } from 'node:worker_threads';
import { parse } from 'node:url';

const joinImages = (logger, images) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(`${__ndirname(import.meta.url)}/worker.js`);

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

const handler = async (req, res) => {
  if (!req.url.includes('joinImages')) {
    res.writeHead(200);
    res.end('Without images');
    return;
  }

  const {
    query: { image, background },
  } = parse(req.url, true);

  req.log.info({ image, background }, '🧾 Request received');

  res.writeHead(200, { 'Content-Type': 'text/html' });

  const imageBase64 = await joinImages(req.log, { image, background });

  res.end(`
  <div style="display: grid; place-items: center;">
    <img style="display: block; margin: 0 auto; width: 40%;" src="data:image/jpeg;base64,${imageBase64}" />
  </div>`);
};

(async () => {
  const server = await buildServer();

  server(handler).listen(serverConfig.port, () => {
    logger.info(`🚀 Running at http://localhost:${serverConfig.port}`);
  });
})();
