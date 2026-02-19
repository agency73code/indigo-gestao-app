export const SCHEMA_SQL = `
PRAGMA foreign_keys = ON;

-- =========================
-- BASE: TERAPEUTA / CLIENTE
-- =========================

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
  emailContato TEXT,
  data_nascimento TEXT,
  avatar_url TEXT,
  updated_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_cliente_nome ON cliente(nome);

-- =========================
-- ÁREA DE ATUAÇÃO + VÍNCULO
-- =========================

CREATE TABLE IF NOT EXISTS area_atuacao (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS terapeuta_cliente (
  id TEXT PRIMARY KEY,            -- UUID local
  server_id INTEGER UNIQUE,       -- id do backend quando sincronizar

  terapeuta_id TEXT NOT NULL,
  cliente_id TEXT NOT NULL,
  area_atuacao_id INTEGER NOT NULL,

  valor_sessao REAL NOT NULL,
  data_inicio TEXT NOT NULL,
  data_fim TEXT,

  papel TEXT DEFAULT 'responsible',
  status TEXT DEFAULT 'active',

  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,

  FOREIGN KEY (terapeuta_id) REFERENCES terapeuta(id),
  FOREIGN KEY (cliente_id) REFERENCES cliente(id),
  FOREIGN KEY (area_atuacao_id) REFERENCES area_atuacao(id)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_tc_unique
ON terapeuta_cliente(terapeuta_id, cliente_id);

-- =========================
-- PROGRAMA (OCP) + ESTÍMULOS
-- =========================

CREATE TABLE IF NOT EXISTS ocp (
  id TEXT PRIMARY KEY,            -- UUID local (ou use server_id no bootstrap)
  server_id INTEGER UNIQUE,

  cliente_id TEXT NOT NULL,
  terapeuta_id TEXT NOT NULL,

  nome_programa TEXT NOT NULL,
  area TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'ativado',

  data_inicio TEXT NOT NULL,
  data_fim TEXT NOT NULL,

  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,

  FOREIGN KEY (cliente_id) REFERENCES cliente(id),
  FOREIGN KEY (terapeuta_id) REFERENCES terapeuta(id)
);

CREATE TABLE IF NOT EXISTS estimulo (
  id TEXT PRIMARY KEY,            -- UUID local (se criar offline)
  server_id INTEGER UNIQUE,

  nome TEXT NOT NULL,
  descricao TEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_estimulo_nome
ON estimulo(nome);

CREATE TABLE IF NOT EXISTS estimulo_ocp (
  id TEXT PRIMARY KEY,            -- UUID local
  server_id INTEGER UNIQUE,

  estimulo_id TEXT NOT NULL,
  ocp_id TEXT NOT NULL,

  nome_override TEXT,
  descricao TEXT,
  metodos TEXT,
  tecnicas_procedimentos TEXT,

  status INTEGER NOT NULL DEFAULT 1,

  FOREIGN KEY (estimulo_id) REFERENCES estimulo(id),
  FOREIGN KEY (ocp_id) REFERENCES ocp(id)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_estimulo_ocp_unique
ON estimulo_ocp(estimulo_id, ocp_id);

-- =========================
-- SESSÃO + TRIALS
-- =========================

CREATE TABLE IF NOT EXISTS sessao (
  id TEXT PRIMARY KEY,            -- UUID local
  server_id INTEGER UNIQUE,

  ocp_id TEXT NOT NULL,
  cliente_id TEXT NOT NULL,
  terapeuta_id TEXT NOT NULL,

  area TEXT NOT NULL,
  observacoes_sessao TEXT,

  data_criacao TEXT NOT NULL,

  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,

  FOREIGN KEY (ocp_id) REFERENCES ocp(id),
  FOREIGN KEY (cliente_id) REFERENCES cliente(id),
  FOREIGN KEY (terapeuta_id) REFERENCES terapeuta(id)
);

CREATE INDEX IF NOT EXISTS idx_sessao_terapeuta_data
ON sessao(terapeuta_id, data_criacao);

CREATE INDEX IF NOT EXISTS idx_sessao_ocp
ON sessao(ocp_id);

CREATE TABLE IF NOT EXISTS sessao_trial (
  id TEXT PRIMARY KEY,            -- UUID local
  server_id INTEGER UNIQUE,

  sessao_id TEXT NOT NULL,
  estimulo_ocp_id TEXT NOT NULL,

  ordem INTEGER NOT NULL,
  resultado TEXT NOT NULL,        -- error | prompted | independent

  -- campos opcionais por área
  duracao_minutos INTEGER,
  utilizou_carga INTEGER,
  valor_carga REAL,
  teve_desconforto INTEGER,
  descricao_desconforto TEXT,
  teve_compensacao INTEGER,
  descricao_compensacao TEXT,
  participacao INTEGER,
  suporte INTEGER,

  FOREIGN KEY (sessao_id) REFERENCES sessao(id),
  FOREIGN KEY (estimulo_ocp_id) REFERENCES estimulo_ocp(id)
);

CREATE INDEX IF NOT EXISTS idx_trial_sessao
ON sessao_trial(sessao_id);

-- =========================
-- FATURAMENTO (1:1 com sessão)
-- =========================

CREATE TABLE IF NOT EXISTS faturamento (
  id TEXT PRIMARY KEY,
  server_id INTEGER UNIQUE,

  sessao_id TEXT UNIQUE,
  cliente_id TEXT NOT NULL,
  terapeuta_id TEXT NOT NULL,

  inicio_em TEXT NOT NULL,
  fim_em TEXT NOT NULL,

  tipo_atendimento TEXT NOT NULL,
  status TEXT NOT NULL,

  ajuda_custo INTEGER,
  valor_ajuda_custo REAL,
  observacao_faturamento TEXT,
  motivo_rejeicao TEXT,

  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,

  FOREIGN KEY (sessao_id) REFERENCES sessao(id),
  FOREIGN KEY (cliente_id) REFERENCES cliente(id),
  FOREIGN KEY (terapeuta_id) REFERENCES terapeuta(id)
);

-- =========================
-- ANEXOS DE SESSÃO
-- =========================

CREATE TABLE IF NOT EXISTS sessao_arquivo (
  id TEXT PRIMARY KEY,
  server_id INTEGER UNIQUE,

  sessao_id TEXT NOT NULL,

  nome TEXT NOT NULL,
  caminho TEXT NOT NULL,
  tamanho INTEGER NOT NULL,

  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,

  FOREIGN KEY (sessao_id) REFERENCES sessao(id)
);
`;