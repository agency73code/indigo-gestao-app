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
const SCHEMA_VERSION = 2;

export async function initDb(): Promise<void> {
  const database = await getDb();
  await database.execAsync('PRAGMA foreign_keys = ON;');

  // Verifica versão atual do banco
  const result = await database.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version;',
  );
  const currentVersion = result?.user_version ?? 0;

  if (currentVersion < SCHEMA_VERSION) {
    // Schema desatualizado — dropa tudo e recria (dev only)
    await database.execAsync(`
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
      DROP TABLE IF EXISTS outbox;
    `);
    await database.execAsync(SCHEMA_SQL);
    await database.execAsync(`PRAGMA user_version = ${SCHEMA_VERSION};`);
  }
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