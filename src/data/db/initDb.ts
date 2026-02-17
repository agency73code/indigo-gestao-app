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
  await database.execAsync('PRAGMA foreign_keys = ON;');
  await database.execAsync(SCHEMA_SQL);
}

// TODO: APAGAR
export async function resetDb() {
  const db = await getDb();
  await db.execAsync(`
    DROP TABLE IF EXISTS sessao_arquivo;
    DROP TABLE IF EXISTS faturamento;
    DROP TABLE IF EXISTS sessao_trial;
    DROP TABLE IF EXISTS sessao;
    DROP TABLE IF EXISTS estimulo_ocp;
    DROP TABLE IF EXISTS estimulo;
    DROP TABLE IF EXISTS ocp;
    DROP TABLE IF EXISTS terapeuta_cliente;
    DROP TABLE IF EXISTS area_atuacao;
    DROP TABLE IF EXISTS cliente;
    DROP TABLE IF EXISTS terapeuta;
  `);
}