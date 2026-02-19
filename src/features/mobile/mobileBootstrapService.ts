import { getDb, initDb } from "@/src/data/db/initDb";
import { createHttpClient } from "@/src/features/auth/httpClient";
import { useAuthStore } from "@/src/features/auth/store";
import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";
import {
    BaseResponse,
    EstimulosResponse,
    IdMaps,
    ProgramasResponse,
    SessoesResponse,
} from "./mobileBootstrap.types";

const httpClient = createHttpClient();

const BOOTSTRAP_KEY_PREFIX = "MOBILE_BOOTSTRAP_DONE_";

let bootstrapPromise: Promise<void> | null = null;

function getBootstrapKey(therapistId: string): string {
  return `${BOOTSTRAP_KEY_PREFIX}${therapistId}`;
}

function createLocalId(): string {
  return Crypto.randomUUID();
}

function requiredMapLookup(
  map: Map<number, string>,
  serverId: number,
  label: string,
): string {
  const localId = map.get(serverId);

  if (!localId) {
    throw new Error(
      `[bootstrap] referência inválida: ${label} server_id=${serverId} não encontrado`,
    );
  }

  return localId;
}

function toIntegerFlag(
  value: boolean | number | null | undefined,
): number | null {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === "number") {
    return value;
  }

  return value ? 1 : 0;
}

function toStatusFlag(value: string | number): number {
  if (typeof value === "number") {
    return value;
  }

  const normalized = value.toLowerCase();
  if (
    normalized === "active" ||
    normalized === "ativo" ||
    normalized === "ativado"
  ) {
    return 1;
  }

  return 0;
}

async function fetchBase(): Promise<BaseResponse> {
  return httpClient.get<BaseResponse>("/mobile/bootstrap/base");
}

async function fetchProgramas(): Promise<ProgramasResponse> {
  return httpClient.get<ProgramasResponse>("/mobile/bootstrap/programas");
}

async function fetchEstimulos(): Promise<EstimulosResponse> {
  return httpClient.get<EstimulosResponse>("/mobile/bootstrap/estimulos");
}

async function fetchSessoes(days: number): Promise<SessoesResponse> {
  return httpClient.get<SessoesResponse>(
    `/mobile/bootstrap/sessoes?days=${days}`,
  );
}

async function persistAll(
  base: BaseResponse,
  programas: ProgramasResponse,
  estimulos: EstimulosResponse,
  sessoes: SessoesResponse,
): Promise<void> {
  await initDb();
  const db = await getDb();

  const maps: IdMaps = {
    ocpServerToLocal: new Map<number, string>(),
    estimuloServerToLocal: new Map<number, string>(),
    estimuloOcpServerToLocal: new Map<number, string>(),
    sessaoServerToLocal: new Map<number, string>(),
  };

  await db.execAsync("BEGIN TRANSACTION;");

  try {
    const terapeuta = base.terapeuta;
    await db.runAsync(
      `INSERT INTO terapeuta (id, nome, email, perfil_acesso, ativo, updated_at)
             VALUES (?, ?, ?, ?, ?, ?);`,
      terapeuta.id,
      terapeuta.nome,
      terapeuta.email ?? null,
      terapeuta.perfilAcesso ?? null,
      terapeuta.atividade === false ? 0 : 1,
      terapeuta.atualizadoEm ?? null,
    );

    for (const cliente of base.clientes) {
      await db.runAsync(
        `INSERT INTO cliente (
                    id,
                    nome,
                    status,
                    emailContato,
                    data_nascimento,
                    avatar_url,
                    updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                  nome = excluded.nome,
                  status = excluded.status,
                  emailContato = excluded.emailContato,
                  data_nascimento = excluded.data_nascimento,
                  avatar_url = excluded.avatar_url,
                  updated_at = excluded.updated_at;`,
        cliente.id,
        cliente.nome ?? null,
        cliente.status ?? null,
        cliente.emailContato ?? null,
        cliente.dataNascimento,
        cliente.avatarUrl ?? null,
        cliente.atualizadoEm ?? null,
      );

    }

    for (const area of base.areasAtuacao) {
      await db.runAsync(
        `INSERT INTO area_atuacao (id, nome)
                 VALUES (?, ?)
                 ON CONFLICT(id) DO UPDATE SET nome = excluded.nome;`,
        area.id,
        area.nome,
      );
    }

    for (const terapeutaCliente of base.terapeutaClientes) {
      await db.runAsync(
        `INSERT INTO terapeuta_cliente (
                    id,
                    server_id,
                    terapeuta_id,
                    cliente_id,
                    area_atuacao_id,
                    valor_sessao,
                    data_inicio,
                    data_fim,
                    papel,
                    status,
                    created_at,
                    updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        createLocalId(),
        terapeutaCliente.id,
        terapeutaCliente.terapeutaId,
        terapeutaCliente.clienteId,
        terapeutaCliente.areaAtuacaoId,
        terapeutaCliente.valorSessao,
        terapeutaCliente.dataInicio,
        terapeutaCliente.dataFim ?? null,
        terapeutaCliente.papel ?? "responsible",
        terapeutaCliente.status ?? "active",
        terapeutaCliente.criadoEm,
        terapeutaCliente.atualizadoEm,
      );
    }

    for (const ocp of programas.ocps) {
      const localId = createLocalId();
      maps.ocpServerToLocal.set(ocp.id, localId);

      if (ocp.id === 9358017 /* ou compara pelo localId se preferir */) {
        console.log("[OCP FAIL CANDIDATE]", {
          ocpServerId: ocp.id,
          clienteId: ocp.clienteId,
          terapeutaId: ocp.terapeutaId,
        });

        const c = await db.getFirstAsync(
          `SELECT id FROM cliente WHERE id = ? LIMIT 1;`,
          [ocp.clienteId],
        );
        const t = await db.getFirstAsync(
          `SELECT id FROM terapeuta WHERE id = ? LIMIT 1;`,
          [ocp.terapeutaId],
        );

        console.log("[OCP FK EXISTS]", { cliente: !!c, terapeuta: !!t, c, t });
      }

      await db.runAsync(
        `INSERT INTO ocp (
                    id,
                    server_id,
                    cliente_id,
                    terapeuta_id,
                    nome_programa,
                    area,
                    status,
                    data_inicio,
                    data_fim,
                    created_at,
                    updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        localId,
        ocp.id,
        ocp.clienteId,
        ocp.terapeutaId,
        ocp.nomePrograma,
        ocp.area,
        ocp.status,
        ocp.dataInicio,
        ocp.dataFim,
        ocp.criadoEm,
        ocp.atualizadoEm,
      );
    }

    for (const estimulo of estimulos.estimulos) {
      const localId = createLocalId();
      maps.estimuloServerToLocal.set(estimulo.id, localId);

      await db.runAsync(
        `INSERT INTO estimulo (
                    id,
                    server_id,
                    nome,
                    descricao
                ) VALUES (?, ?, ?, ?);`,
        localId,
        estimulo.id,
        estimulo.nome,
        estimulo.descricao ?? null,
      );
    }

    for (const estimuloOcp of estimulos.estimuloOcps) {
      const estimuloLocalId = requiredMapLookup(
        maps.estimuloServerToLocal,
        estimuloOcp.estimuloId,
        "estimulo_id",
      );
      const ocpLocalId = requiredMapLookup(
        maps.ocpServerToLocal,
        estimuloOcp.ocpId,
        "ocp_id",
      );
      const localId = createLocalId();

      maps.estimuloOcpServerToLocal.set(estimuloOcp.id, localId);

      await db.runAsync(
        `INSERT INTO estimulo_ocp (
                    id,
                    server_id,
                    estimulo_id,
                    ocp_id,
                    nome_override,
                    descricao,
                    metodos,
                    tecnicas_procedimentos,
                    status
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        localId,
        estimuloOcp.id,
        estimuloLocalId,
        ocpLocalId,
        estimuloOcp.nomeOverride ?? null,
        estimuloOcp.descricao ?? null,
        estimuloOcp.metodos ?? null,
        estimuloOcp.tecnicasProcedimentos ?? null,
        toStatusFlag(estimuloOcp.status),
        estimuloOcp.criadoEm,
        estimuloOcp.atualizadoEm,
      );
    }

    for (const sessao of sessoes.sessoes) {
      const ocpLocalId = requiredMapLookup(
        maps.ocpServerToLocal,
        sessao.ocpId,
        "sessao.ocp_id",
      );
      const localId = createLocalId();

      maps.sessaoServerToLocal.set(sessao.id, localId);

      await db.runAsync(
        `INSERT INTO sessao (
                    id,
                    server_id,
                    ocp_id,
                    cliente_id,
                    terapeuta_id,
                    area,
                    observacoes_sessao,
                    data_criacao,
                    created_at,
                    updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        localId,
        sessao.id,
        ocpLocalId,
        sessao.clienteId,
        sessao.terapeutaId,
        sessao.area,
        sessao.observacoesSessao ?? null,
        sessao.dataCriacao,
        sessao.criadoEm,
        sessao.atualizadoEm,
      );
    }

    for (const trial of sessoes.sessaoTrials) {
      const sessaoLocalId = requiredMapLookup(
        maps.sessaoServerToLocal,
        trial.sessaoId,
        "trial.sessao_id",
      );
      const estimuloOcpLocalId = requiredMapLookup(
        maps.estimuloOcpServerToLocal,
        trial.estimuloOcpId,
        "trial.estimulo_ocp_id",
      );

      await db.runAsync(
        `INSERT INTO sessao_trial (
                    id,
                    server_id,
                    sessao_id,
                    estimulo_ocp_id,
                    ordem,
                    resultado,
                    duracao_minutos,
                    utilizou_carga,
                    valor_carga,
                    teve_desconforto,
                    descricao_desconforto,
                    teve_compensacao,
                    descricao_compensacao,
                    participacao,
                    suporte
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        createLocalId(),
        trial.id,
        sessaoLocalId,
        estimuloOcpLocalId,
        trial.ordem,
        trial.resultado,
        trial.duracaoMinutos ?? null,
        toIntegerFlag(trial.utilizouCarga),
        trial.valorCarga ?? null,
        toIntegerFlag(trial.teveDesconforto),
        trial.descricaoDesconforto ?? null,
        toIntegerFlag(trial.teveCompensacao),
        trial.descricaoCompensacao ?? null,
        trial.participacao ?? null,
        trial.suporte ?? null,
        trial.criadoEm,
        trial.atualizadoEm,
      );
    }

    for (const faturamento of sessoes.faturamentos) {
      const sessaoLocalId = requiredMapLookup(
        maps.sessaoServerToLocal,
        faturamento.sessaoId,
        "faturamento.sessao_id",
      );

      await db.runAsync(
        `INSERT INTO faturamento (
                    id,
                    server_id,
                    sessao_id,
                    cliente_id,
                    terapeuta_id,
                    inicio_em,
                    fim_em,
                    tipo_atendimento,
                    status,
                    ajuda_custo,
                    valor_ajuda_custo,
                    observacao_faturamento,
                    motivo_rejeicao,
                    created_at,
                    updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        createLocalId(),
        faturamento.id,
        sessaoLocalId,
        faturamento.clienteId,
        faturamento.terapeutaId,
        faturamento.inicioEm,
        faturamento.fimEm,
        faturamento.tipoAtendimento,
        faturamento.status,
        toIntegerFlag(faturamento.ajudaCusto),
        faturamento.valorAjudaCusto ?? null,
        faturamento.observacaoFaturamento ?? null,
        faturamento.motivoRejeicao ?? null,
        faturamento.criadoEm,
        faturamento.atualizadoEm,
      );
    }

    for (const arquivo of sessoes.sessaoArquivos ?? []) {
      const sessaoLocalId = requiredMapLookup(
        maps.sessaoServerToLocal,
        arquivo.sessaoId,
        "sessao_arquivo.sessao_id",
      );

      await db.runAsync(
        `INSERT INTO sessao_arquivo (
                    id,
                    server_id,
                    sessao_id,
                    nome,
                    caminho,
                    tamanho,
                    created_at,
                    updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        createLocalId(),
        arquivo.id,
        sessaoLocalId,
        arquivo.nome,
        arquivo.caminho,
        arquivo.tamanho,
        arquivo.criadoEm,
        arquivo.atualizadoEm,
      );
    }

    await db.execAsync("COMMIT;");
  } catch (error) {
    await db.execAsync("ROLLBACK;");
    throw error;
  }
}

async function countTable(tableName: string): Promise<number> {
  const db = await getDb();
  const row = await db.getFirstAsync<{ total: number }>(
    `SELECT COUNT(*) as total FROM ${tableName};`,
  );
  return row?.total ?? 0;
}

async function logCounts(): Promise<void> {
  const [
    terapeutaCount,
    clienteCount,
    areaAtuacaoCount,
    terapeutaClienteCount,
    ocpCount,
    estimuloCount,
    estimuloOcpCount,
    sessaoCount,
    sessaoTrialCount,
    faturamentoCount,
    sessaoArquivoCount,
  ] = await Promise.all([
    countTable("terapeuta"),
    countTable("cliente"),
    countTable("area_atuacao"),
    countTable("terapeuta_cliente"),
    countTable("ocp"),
    countTable("estimulo"),
    countTable("estimulo_ocp"),
    countTable("sessao"),
    countTable("sessao_trial"),
    countTable("faturamento"),
    countTable("sessao_arquivo"),
  ]);

  console.log(
    `[bootstrap] terapeuta=${terapeutaCount} cliente=${clienteCount} area_atuacao=${areaAtuacaoCount} terapeuta_cliente=${terapeutaClienteCount} ocp=${ocpCount} estimulo=${estimuloCount} estimulo_ocp=${estimuloOcpCount} sessao=${sessaoCount} sessao_trial=${sessaoTrialCount} faturamento=${faturamentoCount} sessao_arquivo=${sessaoArquivoCount}`,
  );
}

async function runBootstrapImpl(days = 30): Promise<void> {
  const session = useAuthStore.getState().session;
  const therapistId = session?.user?.id;

  if (!therapistId) {
    console.log(
      "[bootstrap] Without a logged-in therapist: Bootstrap wont run.",
    );
    return;
  }

  const bootstrapKey = getBootstrapKey(therapistId);
  const alreadyBootstrapped = await SecureStore.getItemAsync(bootstrapKey);

  if (alreadyBootstrapped === "1") {
    return;
  }

  const base = await fetchBase();
  const programas = await fetchProgramas();
  const estimulos = await fetchEstimulos();
  const sessoes = await fetchSessoes(days);

  await persistAll(base, programas, estimulos, sessoes);
  await SecureStore.setItemAsync(bootstrapKey, "1");
  await logCounts();
}

export const mobileBootstrapService = {
  async runBootstrap(days = 30): Promise<void> {
    if (bootstrapPromise) {
      return bootstrapPromise;
    }

    bootstrapPromise = runBootstrapImpl(days)
      .catch((error) => {
        console.error("[bootstrap] failed:", error);
        throw error;
      })
      .finally(() => {
        bootstrapPromise = null;
      });

    return bootstrapPromise;
  },
};

export const mobileBootstrapInternals = {
  fetchBase,
  fetchProgramas,
  fetchEstimulos,
  fetchSessoes,
  persistAll,
  logCounts,
};
