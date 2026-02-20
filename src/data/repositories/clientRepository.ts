import { ClientItemData } from "@/src/ui/ClientCard";
import { getDb } from "../db/initDb";
import { ClientDetailRow } from "../models/clientDetail.model";
import { ClientListRow } from "../models/clientList.model";
import {
  ClientDetailData,
  mapClientDetailRowToClientData,
  mapClientRowsToClientItems,
} from "../mappers/clientMapper";

async function getAll(): Promise<ClientItemData[]> {
    const db = await getDb();

    const rows = await db.getAllAsync<ClientListRow>(`
        SELECT
            c.id,
            c.nome,
            c.data_nascimento,
            c.avatar_url,
            aa.nome AS specialty_name
        FROM cliente c
        LEFT JOIN terapeuta_cliente tc ON tc.cliente_id = c.id
        LEFT JOIN area_atuacao aa ON aa.id = tc.area_atuacao_id
        ORDER BY c.nome COLLATE NOCASE ASC, aa.nome COLLATE NOCASE ASC;    
    `);

    return mapClientRowsToClientItems(rows);
}

async function getById(clientId: string): Promise<ClientDetailData | null> {
    const db = await getDb();

    const row = await db.getFirstAsync<ClientDetailRow>(
        `
            SELECT
                c.id,
                c.nome,
                c.data_nascimento,
                c.avatar_url
            FROM cliente c
            WHERE c.id = ?
            LIMIT 1;
        `,
        clientId,
    );

    if (!row) {
        return null;
    }

    return mapClientDetailRowToClientData(row);
}

export const clientRepository = {
    getAll,
    getById,
}