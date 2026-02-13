import { createTokens } from 'tamagui';

/**
 * Design tokens do projeto Gestão Índigo.
 * Baseados na semântica do ERP (Tailwind/shadcn) adaptados para Tamagui.
 * SINGLE SOURCE OF TRUTH para cores, espaçamento, tamanhos e radius.
 */
export const tokens = createTokens({
  color: {
    // ── Brand: Indigo ─────────────────────────────
    indigo50: '#E8EDF3',
    indigo100: '#C5D0DE',
    indigo200: '#9FB3C8',
    indigo300: '#7896B2',
    indigo400: '#5A80A2',
    indigo500: '#2B4970',
    indigo600: '#243F63',
    indigo700: '#1C3350',
    indigo800: '#14273D',
    indigo900: '#0D1B2A',

    // ── Neutral: Slate ────────────────────────────
    slate50: '#F8FAFC',
    slate100: '#F1F5F9',
    slate200: '#E2E8F0',
    slate300: '#CBD5E1',
    slate400: '#94A3B8',
    slate500: '#64748B',
    slate600: '#475569',
    slate700: '#334155',
    slate800: '#1E293B',
    slate900: '#0F172A',

    // ── Base ──────────────────────────────────────
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',

    // ── Status ────────────────────────────────────
    red400: '#F87171',
    red500: '#EF4444',
    red600: '#DC2626',
    green500: '#22C55E',
    green600: '#16A34A',
    yellow500: '#EAB308',
  },

  space: {
    true: 16,
    0: 0,
    0.5: 2,
    1: 4,
    1.5: 6,
    2: 8,
    2.5: 10,
    3: 12,
    3.5: 14,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
  },

  size: {
    true: 44,
    0: 0,
    0.25: 2,
    0.5: 4,
    0.75: 8,
    1: 20,
    1.5: 24,
    2: 28,
    3: 32,
    4: 36,
    5: 40,
    6: 44,
    7: 48,
    8: 52,
    9: 56,
    10: 60,
    11: 64,
    12: 68,
  },

  radius: {
    true: 8,
    0: 0,
    1: 4,
    2: 6,
    3: 8,
    4: 12,
    5: 16,
    6: 20,
    7: 24,
    8: 28,
    pill: 9999,
  },

  zIndex: {
    0: 0,
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500,
  },
});
