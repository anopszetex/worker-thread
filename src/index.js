InjectHttpInterceptor();
import { buildServer, InjectHttpInterceptor } from './server/index.js';
import { imageProcess } from './domains/handler/processImage.js';
import { logger } from './support/logger/service.js';
import { setTimeout } from 'node:timers/promises';
import { serverConfig } from './server/config.js';
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

  if (!image || !background) {
    req.log.warn('🧵 Request: empty files');
    res.end('empty files');
    return;
  }

  await imageProcess({ image, background, req, res });
};

(async () => {
  const server = await buildServer();

  server(handler).listen(serverConfig.port, () => {
    logger.info(`🚀 Running at http://localhost:${serverConfig.port}`);
  });
})();
