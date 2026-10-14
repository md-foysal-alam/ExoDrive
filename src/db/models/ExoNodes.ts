import { index, integer, pgEnum, pgTable, serial, text, timestamp, varchar, bigint } from 'drizzle-orm/pg-core';

export const ExoNodeType = pgEnum('exo_node_type', ['folder', 'file']);

export const ExoNodes = pgTable('vfs_nodes', {
  id          :  serial('id').primaryKey(),
  name        :  varchar('name', { length: 255 }).notNull(),
  type        :  ExoNodeType('type').notNull(),
  parentId    :  integer('parent_id'), 
  storageKey  :  text('storage_key'),
  mimeType    :  text('mime_type'),
  size        :  bigint('size', { mode: 'number' }).notNull().default(0), 
  createdAt   :  timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  deletedAt   :  timestamp('deleted_at', { withTimezone: true }),
}, (table)    => [index('vfs_nodes_parent_idx').on(table.parentId)]);
