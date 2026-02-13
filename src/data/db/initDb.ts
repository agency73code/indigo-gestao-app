import * as SQLite from 'expo-sqlite';

export type Db = SQLite.SQLiteDatabase;

let db: Db | null = null;

export async function getDb(): Promise<Db> {
  if (!db) {
    db = await SQLite.openDatabaseAsync('indigo.db');
  }
  return db;
}

/**
 * Inicializa o banco SQLite local.
 * Schema será expandido conforme features forem implementadas.
 */
export async function initDb(): Promise<void> {
  const database = await getDb();
  await database.execAsync(`
    PRAGMA foreign_keys = ON;
    PRAGMA journal_mode = WAL;
  `);
}
