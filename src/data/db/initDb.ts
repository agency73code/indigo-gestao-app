import * as SQLite from 'expo-sqlite';

import { SCHEMA_SQL } from './schema';

export type Db = SQLite.SQLiteDatabase;

let db: Db | null = null;

export async function getDb(): Promise<Db> {
  if (!db) {
    db = await SQLite.openDatabaseAsync('indigo.db');
  }
  return db;
}

/**
 * Versão do schema. Incrementar sempre que o schema.ts mudar.
 * Em dev, incrementar força um DROP + recreate completo do banco.
 */
const SCHEMA_VERSION = 3;

async function addColumnIfNotExists(
  database: Db,
  tableName: string,
  columnName: string,
  columnDefinition: string,
): Promise<void> {
  const rows = await database.getAllAsync<{ name: string }>(
    `PRAGMA table_info(${tableName});`,
  );
  const hasColumn = rows.some((row) => row.name === columnName);

  if (!hasColumn) {
    await database.execAsync(
      `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnDefinition};`,
    );
  }
}

async function runMigrations(database: Db, currentVersion: number): Promise<void> {
  if (currentVersion < 3) {
    await addColumnIfNotExists(database, 'cliente', 'data_nascimento', 'TEXT');
    await addColumnIfNotExists(database, 'cliente', 'avatar_url', 'TEXT');
  }
}

export async function initDb(): Promise<void> {
  const database = await getDb();
  await database.execAsync('PRAGMA foreign_keys = ON;');

  // Verifica versão atual do banco
  const result = await database.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version;',
  );
  const currentVersion = result?.user_version ?? 0;

  if (currentVersion === 0) {
    await database.execAsync(SCHEMA_SQL);
    await database.execAsync(`PRAGMA user_version = ${SCHEMA_VERSION};`);
    return;
  }

  if (currentVersion < SCHEMA_VERSION) {
    await runMigrations(database, currentVersion);
    await database.execAsync(`PRAGMA user_version = ${SCHEMA_VERSION}`);
  }
}