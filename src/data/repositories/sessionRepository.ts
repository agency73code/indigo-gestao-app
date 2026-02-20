import { SessionItemData } from "@/src/ui/SessionCard";
import { getDb } from "../db/initDb";
import { mapSessionRowsToSessionItems } from "../mappers/sessionMapper";
import { SessionRecentRow } from "../models/sessionRecent.model";

const DEFAULT_RECENT_LIMIT = 3;

async function getRecent(limit = DEFAULT_RECENT_LIMIT): Promise<SessionItemData[]> {
    const db = await getDb();
    const safeLimit = Math.max(1, Math.floor(limit));

    const rows = await db.getAllAsync<SessionRecentRow>(
        `
            SELECT
                s.id,
                c.nome AS patient_name,
                c.data_nascimento,
                c.avatar_url,
                s.area,
                s.data_criacao
            FROM sessao s
            INNER JOIN cliente c ON c.id = s.cliente_id
            ORDER BY s.data_criacao DESC
            LIMIT ${safeLimit};
        `,
    );

    return mapSessionRowsToSessionItems(rows);
}

async function getPendingCount(): Promise<number> {
    // TODO: substituir pelo count real quando draft sessions existir
    // Query real será: SELECT COUNT(*) AS total FROM sessao WHERE server_id IS NULL;
    const db = await getDb();
    const row = await db.getFirstAsync<{ total: number }>(
        `SELECT COUNT(*) AS total FROM sessao;`,
    );
    const total = row?.total ?? 0;
    // Mock: simula ~30% das sessões como pendentes (mínimo 1 se houver sessões)
    return total > 0 ? Math.max(1, Math.floor(total * 0.3)) : 0;
}

export const sessionRepository = {
    getRecent,
    getPendingCount,
};