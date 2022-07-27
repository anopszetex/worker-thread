InjectHttpInterceptor();
import { buildServer, InjectHttpInterceptor } from './server/index.js';
import { imageProcess } from './domains/handler/processImage.js';
import RouterEntity from './support/error/routerEntity.js';
import { logger } from './support/logger/service.js';
import { setTimeout } from 'node:timers/promises';
import { serverConfig } from './server/config.js';
import AppError from './support/error/index.js';
import { onStop } from './support/signal.js';
import { parse } from 'node:url';

const handler = async (req, res) => {
  await setTimeout(100);

  if (!req.url.includes('joinImages')) {
    res.writeHead(200);
    res.end('Without images');
    return;
  }

  const {
    query: { image, background },
  } = parse(req.url, true);

  req.log.info({ image, background }, '🧾 Request received');

  const routerEntity = new RouterEntity({ image, background });

  if (!routerEntity.isValid()) {
    req.log.warn('🧵 Request: empty files');
    res.end('empty files');
    return;
  }

  await imageProcess({ image, background, req, res }).catch(err => {
    req.log.error(err.message);

    // eslint-disable-next-line promise/no-return-wrap
    return Promise.reject(
      AppError.build('processImage', 'error processing image')
    );
  });
};

(async () => {
  const server = await buildServer();

  const start = server(handler);

  start.listen(serverConfig.port, () => {
    onStop((err, evt) => {
      start.close();
      logger.error({ err, evt }, '🔥 Server stopped');
    });

    logger.info(`🚀 Running at http://localhost:${serverConfig.port}`);
  });
})();
