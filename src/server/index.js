import http from 'node:http';
import { logger } from '../support/logger/service.js';

function InjectHttpInterceptor() {
  const oldEmit = http.Server.prototype.emit;

  http.Server.prototype.emit = function (...args) {
    const [type, request] = args;

    if (type === 'request') {
      Object.assign(request, { log: logger });
    }

    return oldEmit.apply(this, args);
  };
}

const buildServer = async () => {
  return http.createServer;
};

export { buildServer, InjectHttpInterceptor };
