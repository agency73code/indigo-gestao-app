import { ClientItemData } from "@/src/ui/ClientCard";
import { ClientListRow } from "../models/clientList.model";

function getFallBackInitials(name: string): string {
    const parts = name
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (parts.length === 0) {
        return '';
    }

    if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase();
    }

    return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase();
}

function getAgeFromBirthDate(value: string | null): number {
    if (!value) {
        return 0;
    }

    const birthDate = new Date(value);
    if (Number.isNaN(birthDate.getTime())) {
        return 0;
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const hasHadBirthdayThisYear =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
            today.getDate() >= birthDate.getDate());

    if (!hasHadBirthdayThisYear) {
        age -= 1;
    }

    return age >= 0 ? age : 0;
}

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
                fallbackInitials: getFallBackInitials(name),
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