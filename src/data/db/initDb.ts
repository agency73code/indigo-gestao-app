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

export async function initDb(): Promise<void> {
  const database = await getDb();
  await database.execAsync(SCHEMA_SQL);

  // garante FK ligado
  await database.execAsync('PRAGMA foreign_keys = ON;');
}
