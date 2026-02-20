import type { ProgramItemData } from '@/src/ui/ProgramCard';

import { getDb } from '../db/initDb';
import { mapProgramRowsToProgramItems } from '../mappers/programMapper';
import type { ProgramByClientRow } from '../models/programList.model';

export type ProgramsByArea = Record<string, ProgramItemData[]>;

async function getByClient(clientId: string): Promise<ProgramsByArea> {
    const db = await getDb();

    const rows = await db.getAllAsync<ProgramByClientRow>(
        `
            SELECT
                o.id,
                o.nome_programa,
                o.area,
                o.status,
                MAX(s.data_criacao) AS last_session_at,
                SUM(CASE WHEN s.server_id IS NULL THEN 1 ELSE 0 END) AS pending_sessions
            FROM ocp o
            LEFT JOIN sessao s ON s.ocp_id = o.id
            WHERE o.cliente_id = ?
            GROUP BY o.id, o.nome_programa, o.area, o.status
            ORDER BY o.area COLLATE NOCASE ASC, o.nome_programa COLLATE NOCASE ASC;
        `,
        clientId,
    );

    const programItems = mapProgramRowsToProgramItems(rows);

    return programItems.reduce<ProgramsByArea>((acc, item) => {
        const area = item.specialty || 'Sem área';
        if (!acc[area]) {
            acc[area] = [];
        }

        acc[area].push({
            id: item.id,
            name: item.name,
            specialty: item.specialty,
            lastSessionLabel: item.lastSessionLabel,
            status: item.status,
            pendingCount: item.pendingCount,
        });
        return acc;
    }, {});
}

export const programRepository = {
  getByClient,
};