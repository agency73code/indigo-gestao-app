import { createInterFont } from '@tamagui/font-inter';
import { createFont } from 'tamagui';

/**
 * Fontes do projeto Gestão Índigo.
 *
 * - Body / Labels: DM Sans (peso 400–600)
 *   TODO: instalar @expo-google-fonts/dm-sans e trocar createInterFont → createFont DM Sans.
 *   Enquanto isso, Inter substitui temporariamente com a mesma escala.
 *
 * - Headings / Card titles: Sora (peso 300–400, nunca bold)
 *
 * Escala tipográfica (font size ↔ token):
 *   $1:12  $2:14  $3:16  $4:18  $5:20  $6:24  $7:28  $8:32  $9:36  true:16
 *
 * Escala de line-height:
 *   $1:16  $2:20  $3:22  $4:24  $5:28  $6:32  $7:36  $8:40  $9:44  true:22
 */

// ── Body font (Inter temporário → DM Sans futuro) ────────────
export const bodyFont = createInterFont({
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    true: 16,
  },
  lineHeight: {
    1: 16,
    2: 20,
    3: 22,
    4: 24,
    5: 28,
    6: 32,
    7: 36,
    8: 40,
    9: 44,
    true: 22,
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

/** @deprecated Use bodyFont. Alias mantido por compatibilidade. */
export const interFont = bodyFont;

// ── Sora (headings) ──────────────────────────────
// Carregada via @expo-google-fonts/sora em app/_layout.tsx
export const soraFont = createFont({
  family: 'Sora',
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    true: 20,
  },
  lineHeight: {
    1: 16,
    2: 20,
    3: 22,
    4: 24,
    5: 28,
    6: 32,
    7: 36,
    8: 40,
    9: 44,
    true: 28,
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
