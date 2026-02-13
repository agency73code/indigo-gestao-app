export const SCHEMA_SQL = `
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS terapeuta (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT,
  perfil_acesso TEXT,
  ativo INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT
);

CREATE TABLE IF NOT EXISTS cliente (
  id TEXT PRIMARY KEY,
  nome TEXT,
  status TEXT,
  updated_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_cliente_nome ON cliente(nome);
`;