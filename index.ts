import Fastify from 'fastify';

import 'dotenv/config';

import { exoRoutes } from './src/routes/exo.routes.js';
import { initDatabase } from './src/db/db.connection/db.connection.js';


const fastify = Fastify({ logger: true });

fastify.addContentTypeParser('application/octet-stream', (request, payload, done) => {
  done(null, payload);
});

fastify.register(exoRoutes, { prefix: '/api' });

fastify.get('/api/health', async (req, reply) => { 
  console.log("api health is ok");
});

const start = async () => {

  try {
    
    await initDatabase();
    const port = Number.parseInt(process.env.PORT || '3000', 10);
    await fastify.listen({ port, host: '127.0.0.1' });
    fastify.log.info(`VFS API running on http://127.0.0.1:${port}`);
    
  } catch (err) {
    
    fastify.log.error(err);
    process.exit(1);

  }
  
};
void start();
