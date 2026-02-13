import { createInterFont } from '@tamagui/font-inter';
import { createFont } from 'tamagui';

/**
 * Fontes do projeto Gestão Índigo.
 * - Body / Labels: Inter (peso 400–600)
 * - Headings / Card titles: Sora (peso 300–400, nunca bold)
 */

// ── Inter (body) ──────────────────────────────────
export const interFont = createInterFont({
  size: {
    1: 11,
    2: 12,
    3: 13,
    4: 14,
    5: 16,
    6: 18,
    7: 20,
    8: 24,
    9: 30,
    10: 36,
    true: 14,
  },
  weight: {
    1: '300',
    4: '400',
    5: '500',
    6: '600',
    7: '700',
    true: '400',
  },
  letterSpacing: {
    4: 0,
    5: 0,
    6: -0.2,
    7: -0.3,
    8: -0.4,
    true: 0,
  },
});

// ── Sora (headings) ──────────────────────────────
// Loaded via @expo-google-fonts/sora in app/_layout.tsx
export const soraFont = createFont({
  family: 'Sora',
  size: {
    1: 11,
    2: 12,
    3: 13,
    4: 14,
    5: 16,
    6: 18,
    7: 20,
    8: 24,
    9: 30,
    10: 36,
    true: 20,
  },
  lineHeight: {
    1: 16,
    2: 18,
    3: 20,
    4: 22,
    5: 24,
    6: 28,
    7: 30,
    8: 36,
    9: 42,
    10: 48,
    true: 30,
  },
  weight: {
    3: '300',
    4: '400',
    true: '300', // headings default = light
  },
  letterSpacing: {
    4: 0,
    5: 0,
    6: -0.5,
    7: -0.5,
    8: -0.5,
    9: -1,
    10: -1,
    true: -0.5,
  },
  face: {
    300: { normal: 'Sora_300Light' },
    400: { normal: 'Sora_400Regular' },
  },
});
