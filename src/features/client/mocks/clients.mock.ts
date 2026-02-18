import type { ClientItemData } from '@/src/ui/ClientCard';

/**
 * Mock de clientes para desenvolvimento.
 * Quando a API real estiver disponível, desativar via `USE_MOCK = false`
 * no hook useClients.
 */
export const MOCK_CLIENTS: ClientItemData[] = [
  {
    id: 'client-001',
    name: 'Aline Nogueira da Silva',
    age: 12,
    avatarUrl: 'https://i.pravatar.cc/80?img=1',
    fallbackInitials: 'AN',
    specialties: ['Fonoaudiologia', 'Terapia ABA'],
  },
  {
    id: 'client-002',
    name: 'Arthur Pereira Makalister',
    age: 7,
    avatarUrl: 'https://i.pravatar.cc/80?img=3',
    fallbackInitials: 'AP',
    specialties: ['Terapia ABA'],
  },
  {
    id: 'client-003',
    name: 'Natan Gomes Oliveira',
    age: 6,
    avatarUrl: 'https://i.pravatar.cc/80?img=5',
    fallbackInitials: 'NG',
    specialties: ['Fisioterapia', 'Fonoaudiologia', 'Terapia ABA', 'Psicologia'],
  },
  {
    id: 'client-004',
    name: 'Maria Clara Santos',
    age: 9,
    avatarUrl: 'https://i.pravatar.cc/80?img=9',
    fallbackInitials: 'MC',
    specialties: ['Psicomotricidade', 'Terapia Ocupacional'],
  },
  {
    id: 'client-005',
    name: 'Lucas Ferreira da Costa',
    age: 4,
    avatarUrl: 'https://i.pravatar.cc/80?img=11',
    fallbackInitials: 'LF',
    specialties: ['Fonoaudiologia'],
  },
  {
    id: 'client-006',
    name: 'Isabela Rodrigues Mendes',
    age: 8,
    avatarUrl: 'https://i.pravatar.cc/80?img=16',
    fallbackInitials: 'IR',
    specialties: ['Terapia ABA', 'Psicopedagogia', 'Musicoterapia'],
  },
  {
    id: 'client-007',
    name: 'Pedro Henrique Lima',
    age: 5,
    avatarUrl: 'https://i.pravatar.cc/80?img=14',
    fallbackInitials: 'PH',
    specialties: ['Neuropsicologia', 'Terapia Ocupacional', 'Fonoaudiologia', 'Fisioterapia', 'Nutrição'],
  },
  {
    id: 'client-008',
    name: 'Sofia Almeida Duarte',
    age: 11,
    avatarUrl: 'https://i.pravatar.cc/80?img=20',
    fallbackInitials: 'SA',
    specialties: ['Pedagogia', 'Educador Físico'],
  },
  {
    id: 'client-009',
    name: 'Gabriel Martins Souza',
    age: 3,
    avatarUrl: 'https://i.pravatar.cc/80?img=12',
    fallbackInitials: 'GM',
    specialties: ['Fonoaudiologia', 'Terapia ABA', 'Fisioterapia'],
  },
  {
    id: 'client-010',
    name: 'Valentina Costa Ribeiro',
    age: 10,
    avatarUrl: 'https://i.pravatar.cc/80?img=25',
    fallbackInitials: 'VR',
    specialties: ['Psicologia'],
  },
];
