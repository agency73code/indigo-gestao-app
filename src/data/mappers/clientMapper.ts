import { ClientItemData } from "@/src/ui/ClientCard";
import { ClientListRow } from "../models/clientList.model";
import { getAgeFromBirthDate, getFallbackInitials } from "./mapperUtils";

export function mapClientRowsToClientItems(rows: ClientListRow[]): ClientItemData[] {
    const clientsById = new Map<string, ClientItemData>();

    for (const row of rows) {
        const existing = clientsById.get(row.id);

        if (!existing) {
            const name = row.nome ?? '';
            clientsById.set(row.id, {
                id: row.id,
                name,
                age: getAgeFromBirthDate(row.data_nascimento),
                avatarUrl: row.avatar_url ?? '',
                fallbackInitials: getFallbackInitials(name),
                specialties: row.specialty_name ? [row.specialty_name] : [],
            });
            continue;
        }

        if (row.specialty_name && !existing.specialties.includes(row.specialty_name)) {
            existing.specialties.push(row.specialty_name);
        }
    }

    return Array.from(clientsById.values()).map((client) => ({
        ...client,
        specialties: [...client.specialties].sort((a, b) => a.localeCompare(b)),
    }));
}