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
const SCHEMA_VERSION = 5;

const ALL_TABLES = [
  'sessao_arquivo',
  'faturamento',
  'sessao_trial',
  'sessao',
  'estimulo_ocp',
  'estimulo',
  'ocp',
  'terapeuta_cliente',
  'area_atuacao',
  'cliente',
  'terapeuta',
] as const;

async function dropAllTables(database: Db): Promise<void> {
  await database.execAsync('PRAGMA foreign_keys = OFF;');
  for (const table of ALL_TABLES) {
    await database.execAsync(`DROP TABLE IF EXISTS ${table};`);
  }
  await database.execAsync('PRAGMA foreign_keys = ON;');
}

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

  if (currentVersion < 4) {
    await addColumnIfNotExists(database, 'estimulo', 'created_at', 'TEXT');
    await addColumnIfNotExists(database, 'estimulo', 'updated_at', 'TEXT');
    await addColumnIfNotExists(database, 'estimulo_ocp', 'created_at', 'TEXT');
    await addColumnIfNotExists(database, 'estimulo_ocp', 'updated_at', 'TEXT');
    await addColumnIfNotExists(database, 'sessao_trial', 'created_at', 'TEXT');
    await addColumnIfNotExists(database, 'sessao_trial', 'updated_at', 'TEXT');
  }
}

/**
 * Flag que indica se o banco foi recriado do zero nesta sessão.
 * Permite que o bootstrap saiba que precisa re-baixar dados.
 */
let dbWasReset = false;

export function wasDbReset(): boolean {
  return dbWasReset;
}

export function clearDbResetFlag(): void {
  dbWasReset = false;
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
    dbWasReset = true;
    return;
  }

  if (currentVersion < SCHEMA_VERSION) {
    // DROP completo + recreate para garantir schema limpo
    await dropAllTables(database);
    await database.execAsync(SCHEMA_SQL);
    await database.execAsync(`PRAGMA user_version = ${SCHEMA_VERSION};`);
    dbWasReset = true;
  }
}