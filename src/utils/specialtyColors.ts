/**
 * Mapa de cores por especialidade terapêutica.
 * Usado em chips de especialidade em várias telas (Home, Clientes, Sessões).
 *
 * Para adicionar uma especialidade nova, basta inserir uma entry aqui.
 * O helper `getSpecialtyColors()` retorna o fallback automático.
 */

interface SpecialtyColor {
  bg: string;
  text: string;
}

const SPECIALTY_COLORS: Record<string, SpecialtyColor> = {
  'Fonoaudiologia': { bg: '#E3F2FD', text: '#4A6A8F' },
  'Psicomotricidade': { bg: '#F3E5F5', text: '#7A6A8F' },
  'Fisioterapia': { bg: '#E8F5E9', text: '#5A8F6A' },
  'Terapia Ocupacional': { bg: '#FFF3E0', text: '#A57A5A' },
  'Psicopedagogia': { bg: '#FCE4EC', text: '#8F6A7A' },
  'Educador Físico': { bg: '#E0F2F1', text: '#5A8F85' },
  'Terapia ABA': { bg: '#F1F8E9', text: '#758F5A' },
  'Musicoterapia': { bg: '#EDE7F6', text: '#7A6AA5' },
  'Pedagogia': { bg: '#FFF9C4', text: '#A5955A' },
  'Neuropsicologia': { bg: '#E1F5FE', text: '#5A7EA5' },
  'Nutrição': { bg: '#FFEBEE', text: '#A56A6A' },
  'Psicologia': { bg: '#FFF3E0', text: '#8F6A4A' },
};

const DEFAULT_SPECIALTY_COLOR: SpecialtyColor = {
  bg: 'rgba(25, 22, 29, 0.06)',
  text: '#3C4257',
};

/**
 * Retorna { bg, text } para uma especialidade.
 * Case-insensitive: "fonoaudiologia" e "Fonoaudiologia" funcionam.
 * Se não encontrar, retorna DEFAULT_SPECIALTY_COLOR.
 */
export function getSpecialtyColors(specialty?: string): SpecialtyColor {
  if (!specialty) return DEFAULT_SPECIALTY_COLOR;

  // Busca exata primeiro
  const exact = SPECIALTY_COLORS[specialty];
  if (exact) return exact;

  // Busca case-insensitive
  const lower = specialty.toLowerCase();
  const match = Object.entries(SPECIALTY_COLORS).find(
    ([key]) => key.toLowerCase() === lower,
  );

  return match ? match[1] : DEFAULT_SPECIALTY_COLOR;
}

export { DEFAULT_SPECIALTY_COLOR, SPECIALTY_COLORS };
export type { SpecialtyColor };

