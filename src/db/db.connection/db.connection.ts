import pg from 'pg';
import 'dotenv/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';

import * as schema from '../models/ExoNodes.js';

type SchemaType = typeof schema;
type DBInstance = NodePgDatabase<SchemaType>;

let pool        : pg.Pool    | undefined;
let db          : DBInstance | undefined;

/* Initializes the PostgreSQL Pool and Drizzle ORM instance */
export const initDatabase = (): { pool: pg.Pool; db: DBInstance } => {

  try {

    if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL environment variable is missing.");

    // 1. Initialize the pg Pool correctly
    pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

    // 2. Initialize Drizzle with types
    db = drizzle(pool, { schema });

    console.log(' Database pool initialized successfully');
    return { pool, db };

  } catch (error) {

    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Database initialization failed:', errorMessage);
    process.exit(1);

  }

};

/* Returns the active Drizzle ORM instance for running queries */
export const getDB = (): DBInstance => {

  if (!db) throw new Error("Database not initialized. Call initDatabase() first.");
  return db;

};

/* Returns the raw pg Pool instance if needed */
export const getPool = (): pg.Pool => {

  if (!pool) throw new Error("Database pool not initialized. Call initDatabase() first.");
  return pool;
  
};
