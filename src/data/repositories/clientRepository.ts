import { ClientItemData } from "@/src/ui/ClientCard";
import { getDb } from "../db/initDb";
import { ClientListRow } from "../models/clientList.model";
import { mapClientRowsToClientItems } from "../mappers/clientMapper";

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

export const clientRepository = {
    getAll,
}