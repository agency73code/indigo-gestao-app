import type { ProgramItemData } from '@/src/ui/ProgramCard';

export interface MockClientDetail {
  id: string;
  name: string;
  age: number;
  avatarUrl: string;
  fallbackInitials: string;
  areas: string[];
}

export const MOCK_CLIENT_DETAIL: MockClientDetail = {
  id: 'client-001',
  name: 'Aline Nogueira da Silva',
  age: 12,
  avatarUrl: 'https://i.pravatar.cc/80?img=1',
  fallbackInitials: 'AN',
  areas: ['Terapia ABA', 'Fonoaudiologia'],
};

export const MOCK_PROGRAMS: Record<string, ProgramItemData[]> = {
  'Terapia ABA': [
    {
      id: 'prog-001',
      name: 'Comunicação funcional',
      specialty: 'Fonoaudiologia',
      lastSessionLabel: 'há 2 dias',
      status: 'active',
    },
    {
      id: 'prog-002',
      name: 'Comunicação funcional',
      specialty: 'Fonoaudiologia',
      lastSessionLabel: 'há 3 horas',
      status: 'pending',
      pendingCount: 1,
    },
    {
      id: 'prog-003',
      name: 'Fonetica e articulação',
      specialty: 'Fonoaudiologia',
      lastSessionLabel: 'ontem',
      status: 'active',
    },
    {
      id: 'prog-004',
      name: 'Fluência e monitoramento',
      specialty: 'Fonoaudiologia',
      lastSessionLabel: 'há 2 dias',
      status: 'active',
    },
  ],
  'Fonoaudiologia': [
    {
      id: 'prog-005',
      name: 'Programa de linguagem receptiva e expressiva avançado',
      specialty: 'Fonoaudiologia',
      lastSessionLabel: 'há 1 semana',
      status: 'active',
    },
    {
      id: 'prog-006',
      name: 'Treino de sons fricativos',
      specialty: 'Fonoaudiologia',
      lastSessionLabel: 'há 4 dias',
      status: 'pending',
      pendingCount: 3,
    },
  ],
};
