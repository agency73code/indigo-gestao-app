/**
 * Temas light/dark do projeto Gestão Índigo.
 * Mapeiam cores semânticas (background, primary, muted, etc.)
 * para tokens do palette definidos em tokens.ts.
 *
 * Coerência com o ERP: mesma semântica, adaptada para mobile.
 */

export const lightTheme = {
  // ── Backgrounds ─────────────────────────────
  background: '#FFFFFF',
  backgroundHover: '#F8FAFC',
  backgroundPress: '#F1F5F9',
  backgroundFocus: '#F1F5F9',
  backgroundStrong: '#F1F5F9',
  backgroundTransparent: 'transparent',

  // ── Foregrounds ─────────────────────────────
  color: '#0F172A',
  colorHover: '#0F172A',
  colorPress: '#1E293B',
  colorFocus: '#0F172A',
  colorTransparent: 'transparent',

  // ── Primary (Indigo) ───────────────────────
  primary: '#2B4970',
  primaryForeground: '#FFFFFF',

  // ── Secondary ──────────────────────────────
  secondary: '#F1F5F9',
  secondaryForeground: '#0F172A',

  // ── Muted ──────────────────────────────────
  muted: '#F1F5F9',
  mutedForeground: '#64748B',

  // ── Accent ─────────────────────────────────
  accent: '#F1F5F9',
  accentForeground: '#0F172A',

  // ── Destructive ────────────────────────────
  destructive: '#EF4444',
  destructiveForeground: '#FFFFFF',

  // ── Success / Warning ──────────────────────
  success: '#22C55E',
  warning: '#EAB308',

  // ── Card ───────────────────────────────────
  card: '#FFFFFF',
  cardForeground: '#0F172A',

  // ── Border / Input ─────────────────────────
  borderColor: '#E2E8F0',
  borderColorHover: '#CBD5E1',
  borderColorFocus: '#2B4970',
  borderColorPress: '#CBD5E1',
  inputBackground: '#FFFFFF',
  placeholderColor: '#94A3B8',

  // ── Shadow ─────────────────────────────────
  shadowColor: 'rgba(0,0,0,0.08)',
  shadowColorHover: 'rgba(0,0,0,0.12)',
};

export const darkTheme: typeof lightTheme = {
  // ── Backgrounds ─────────────────────────────
  background: '#0F172A',
  backgroundHover: '#1E293B',
  backgroundPress: '#334155',
  backgroundFocus: '#1E293B',
  backgroundStrong: '#1E293B',
  backgroundTransparent: 'transparent',

  // ── Foregrounds ─────────────────────────────
  color: '#F8FAFC',
  colorHover: '#F8FAFC',
  colorPress: '#E2E8F0',
  colorFocus: '#F8FAFC',
  colorTransparent: 'transparent',

  // ── Primary (Indigo — lighter for dark theme)
  primary: '#5A80A2',
  primaryForeground: '#FFFFFF',

  // ── Secondary ──────────────────────────────
  secondary: '#1E293B',
  secondaryForeground: '#F8FAFC',

  // ── Muted ──────────────────────────────────
  muted: '#1E293B',
  mutedForeground: '#94A3B8',

  // ── Accent ─────────────────────────────────
  accent: '#1E293B',
  accentForeground: '#F8FAFC',

  // ── Destructive ────────────────────────────
  destructive: '#DC2626',
  destructiveForeground: '#FFFFFF',

  // ── Success / Warning ──────────────────────
  success: '#16A34A',
  warning: '#EAB308',

  // ── Card ───────────────────────────────────
  card: '#1E293B',
  cardForeground: '#F8FAFC',

  // ── Border / Input ─────────────────────────
  borderColor: '#334155',
  borderColorHover: '#475569',
  borderColorFocus: '#5A80A2',
  borderColorPress: '#475569',
  inputBackground: '#1E293B',
  placeholderColor: '#64748B',

  // ── Shadow ─────────────────────────────────
  shadowColor: 'rgba(0,0,0,0.3)',
  shadowColorHover: 'rgba(0,0,0,0.4)',
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;
