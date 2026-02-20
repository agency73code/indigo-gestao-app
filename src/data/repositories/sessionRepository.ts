import { SessionItemData } from "@/src/ui/SessionCard";
import { getDb } from "../db/initDb";
import { SessionRecentRow } from "../models/sessionRecent.model";
import { mapSessionRowsToSessionItems } from "../mappers/sessionMapper";

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

export const sessionRepository = {
    getRecent,
};