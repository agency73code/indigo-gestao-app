import type { SessionItemData } from '@/src/ui/SessionCard';

/**
 * Mock de sessões recentes para desenvolvimento.
 * Quando a API real estiver disponível, desativar via `useMock: false`
 * no hook useRecentSessions.
 */
export const MOCK_RECENT_SESSIONS: SessionItemData[] = [
  {
    id: '1a2b3c4d-0001',
    avatarSource: 'https://i.pravatar.cc/150?u=aline',
    patientName: 'Aline Nogueira da Silva',
    fallbackInitials: 'AN',
    age: '12 anos',
    specialty: 'fonoaudiologia',
    specialtyLabel: 'Fonoaudiologia',
    timeAgo: 'Há 2 horas',
  },
  {
    id: '1a2b3c4d-0002',
    avatarSource: 'https://i.pravatar.cc/150?u=arthur',
    patientName: 'Arthur Pereira Makalister',
    fallbackInitials: 'AP',
    age: '07 anos',
    specialty: 'terapia_aba',
    specialtyLabel: 'Terapia ABA',
    timeAgo: 'Ontem',
  },
  {
    id: '1a2b3c4d-0003',
    avatarSource: 'https://i.pravatar.cc/150?u=natangomes',
    patientName: 'Natan Gomes Oliveira',
    fallbackInitials: 'NG',
    age: '06 anos',
    specialty: 'fisioterapia',
    specialtyLabel: 'Fisioterapia',
    timeAgo: 'Há 3 dias',
  },
];
