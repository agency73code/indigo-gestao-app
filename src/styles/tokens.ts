import { createTokens } from 'tamagui';

/**
 * Design tokens do projeto Gestão Índigo.
 * SINGLE SOURCE OF TRUTH para cores, espaçamento, tamanhos e radius.
 *
 * Paleta completa: indigo (brand), slate (neutros frios), gray (neutros quentes),
 * status (red/green/amber) + aliases semânticos do Figma Mobile.
 */
export const tokens = createTokens({
  color: {
    // ── Base ──────────────────────────────────────
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',

    // ── Indigo scale (brand) ─────────────────────
    indigo50: '#E6EEF7',
    indigo100: '#C4D5E8',
    indigo200: '#9FB8D5',
    indigo300: '#7A9BC2',
    indigo400: '#5A80A2',
    indigo500: '#274160',
    indigo600: '#1F3550',
    indigo700: '#182A40',
    indigo800: '#111E30',
    indigo900: '#0B1220',

    // ── Slate (neutros frios) ────────────────────
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

    // ── Gray (neutros quentes) ───────────────────
    gray50: '#FAFAFA',
    gray100: '#F5F5F5',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
    gray900: '#111827',

    // ── Status ───────────────────────────────────
    red500: '#DC2626',
    red600: '#B91C1C',
    green500: '#22C55E',
    green600: '#15803D',
    amber500: '#F59E0B',
    amber600: '#D97706',
    danger: '#EF4444',

    // ── Badge ────────────────────────────────────
    badgeWarningBg: '#FFF4E0',
    badgeWarningFg: '#A67A5A',
    badgeErrorBg: '#FEE2E2',
    badgeErrorFg: '#B91C1C',

    // ── Neutral scale (warm / UI surfaces) ─────────
    neutral0: '#FFFFFF',
    neutral100: '#F7FAFC',
    neutral200: '#EEEBE5',
    neutral900: '#1A1F36',

    // ── App Semantics (Figma Mobile) ─────────────
    brandIndigo: '#274160',
    brandIndigoPressed: '#1F3550',
    uiScreenBg: '#F7FAFC',
    uiInputBg: '#FAFAFA',
    uiTextSecondary: '#697386',
    uiTextInput: '#747681',
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
    5.5: 22,
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
    card: 24,
    header: 45,
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
