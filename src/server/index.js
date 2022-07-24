import http from 'node:http';
import { logger } from '../support/logger/service.js';

function InjectHttpInterceptor() {
  const oldEmit = http.Server.prototype.emit;

  http.Server.prototype.emit = function (...args) {
    if (args[0] === 'request') {
      args[1].log = logger;
    }

    return Reflect.apply(oldEmit, this, args);
  };
}

const buildServer = async () => {
  return http.createServer;
};

export { buildServer, InjectHttpInterceptor };
