import { SessionItemData, SpecialtyKey } from "@/src/ui/SessionCard";
import { SessionRecentRow } from "../models/sessionRecent.model";

function getFallbackInitials(name: string): string {
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

function getAgeLabelFromBirthDate(value: string | null): string {
    if (!value) {
        return '00 anos';
    }

    const birthDate = new Date(value);
    if (Number.isNaN(birthDate.getTime())) {
        return '00 anos';
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

    const safeAge = age >= 0 ? age : 0;
    return `${String(safeAge).padStart(2, '0')} anos`;
}

function toSpecialtyLabel(area: string | null): string {
    if (!area?.trim()) {
        return 'Especialidade';
    }

    return area
        .trim()
        .split(/[_\s-]+/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ');
}

function toSpecialtyKey(area: string | null): SpecialtyKey {
    const normalized = area?.trim().toLowerCase().replace(/[\s-]+/g, '_') ?? '';

    const areaToKey: Record<string, SpecialtyKey> = {
        fonoaudiologia: 'fonoaudiologia',
        terapia_aba: 'terapia_aba',
        fisioterapia: 'fisioterapia',
        psicologia: 'psicologia',
        terapia_ocupacional: 'terapia_ocupacional',
        neuropsicologia: 'neuropsicologia',
    };

    return areaToKey[normalized] ?? 'psicologia';
}

function toTimeAgo(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return 'Agora';
    }

    const now = Date.now();
    const diffMs = Math.max(0, now - date.getTime());
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) {
        return 'Agora';
    }

    if (diffHours < 24) {
        return `Há ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    }

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) {
        return 'Ontem';
    }

    return `Há ${diffDays} dias`;
}

export function mapSessionRowsToSessionItems(rows: SessionRecentRow[]): SessionItemData[] {
    return rows.map((row) => {
        const patientName = row.patient_name ?? '';
        const specialtyLabel = toSpecialtyLabel(row.area);

        return {
            id: row.id,
            avatarSource: row.avatar_url ?? '',
            patientName,
            fallbackInitials: getFallbackInitials(patientName),
            age: getAgeLabelFromBirthDate(row.data_nascimento),
            specialty: toSpecialtyKey(row.area),
            specialtyLabel,
            timeAgo: toTimeAgo(row.data_criacao),
        };
    });
}