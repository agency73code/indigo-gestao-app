export interface ProgramByClientRow {
    id: string;
    nome_programa: string | null;
    area: string | null;
    status: string | null;
    last_session_at: string | null;
    pending_sessions: number | null;
}