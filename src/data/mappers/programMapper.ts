import type { ProgramStatus } from '@/src/ui/ProgramStatusBadge';
import type { ProgramItemData } from '@/src/ui/ProgramCard';
import { ProgramByClientRow } from '../models/programList.model';

export interface ProgramByClientData extends ProgramItemData {
  area: string;
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

function toLastSessionLabel(value: string | null): string {
    if (!value) {
        return 'sem sessões';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return 'sem sessões';
    }

    const now = Date.now();
    const diffMs = Math.max(0, now - date.getTime());
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) {
        return 'agora';
    }

    if (diffHours < 24) {
        return `há ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    }

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) {
        return 'ontem';
    }

    return `há ${diffDays} dias`;
}

function toProgramStatus(row: ProgramByClientRow): ProgramStatus {
    const normalizedStatus = row.status?.trim().toLowerCase() ?? '';
    const isActive =
        normalizedStatus === 'active' ||
        normalizedStatus === 'ativo' ||
        normalizedStatus === 'ativado';

    if (!isActive) {
        return 'pending';
    }

    const pendingCount = row.pending_sessions ?? 0;
    return pendingCount > 0 ? 'pending' : 'active';
}

export function mapProgramRowsToProgramItems(rows: ProgramByClientRow[]): ProgramByClientData[] {
    return rows.map((row) => {
        const status = toProgramStatus(row);
        const pendingCount = Math.max(0, row.pending_sessions ?? 0);

        return {
            id: row.id,
            name: row.nome_programa ?? 'Programa sem nome',
            area: row.area ?? '',
            specialty: toSpecialtyLabel(row.area),
            lastSessionLabel: toLastSessionLabel(row.last_session_at),
            status,
            pendingCount: status === 'pending' && pendingCount > 0 ? pendingCount : undefined,
        };
    });
}
