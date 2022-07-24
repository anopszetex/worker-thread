InjectHttpInterceptor();
import { buildServer, InjectHttpInterceptor } from './server/index.js';
import { serverConfig } from './server/config.js';
import { logger } from './support/logger/service.js';

function handler(req, res) {
  req.log.info('succesfully handled request');

  return res.end('ok');
}

(async () => {
  const server = await buildServer();

  server(handler).listen(serverConfig.port, () => {
    logger.info(`🚀 Running at http://localhost:${serverConfig.port}`);
  });
})();
