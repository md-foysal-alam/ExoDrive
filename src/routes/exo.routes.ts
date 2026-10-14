import type { FastifyInstance, FastifyReply } from 'fastify';
import { and, eq, isNotNull, isNull } from 'drizzle-orm';

import { getDB } from '../db/db.connection/db.connection.js';
import { ExoNodes } from '../db/models/ExoNodes.js';

function publicNode(node: typeof ExoNodes.$inferSelect) {
  const { storageKey: _storageKey, ...result } = node;
  return result;
}

export async function exoRoutes(fastify: FastifyInstance): Promise<void> {

  fastify.get('/trash', async () => {
    const rows = await getDB().select().from(ExoNodes).where(isNotNull(ExoNodes.deletedAt));
    return rows.map(publicNode);
  });

}
