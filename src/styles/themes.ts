/**
 * Temas light/dark do app Gestão Índigo (Mobile).
 * Figma base: fundo índigo (#274160), card branco, inputs #FAFAFA,
 * heading Sora, body DM Sans (fonts ficam em fonts.ts).
 *
 * Regra: manter chaves existentes (background/primary/muted/etc)
 * para não quebrar componentes atuais, mas alinhar valores ao app.
 */

const INDIGO = '#274160';
const INDIGO_DARK = '#274160'; // pressed
const WHITE = '#FFFFFF';

const INPUT_BG = '#FAFAFA';

const TEXT_PRIMARY = '#274160';   // títulos/headings no card
const TEXT_SECONDARY = '#697386'; // texto auxiliar
const TEXT_INPUT = '#747681';     // texto de input
const PLACEHOLDER = '#94A3B8';    // placeholder (pode ajustar depois)

const BORDER_INPUT = '#E5E7EB';
const BORDER_FOCUS = INDIGO;
const BORDER_ERROR = '#DC2626';

const SUCCESS = '#16A34A';
const WARNING = '#F59E0B';
const ERROR = '#DC2626';

export const lightTheme = {
  /**
   * Background da aplicação:
   * No design do app, a “tela” tem fundo índigo.
   * O branco aparece como “card” central.
   */
  background: INDIGO,
  backgroundHover: INDIGO,
  backgroundPress: INDIGO_DARK,
  backgroundFocus: INDIGO,
  backgroundStrong: INDIGO,
  backgroundTransparent: 'transparent',

  /**
   * Texto padrão:
   * No app, textos em superfícies claras (card) usam índigo/cinza, não preto slate.
   * Para evitar quebrar componentes que usam "color" global, colocamos índigo.
   */
  color: TEXT_PRIMARY,
  colorHover: TEXT_PRIMARY,
  colorPress: TEXT_PRIMARY,
  colorFocus: TEXT_PRIMARY,
  colorTransparent: 'transparent',

  /**
   * Primary:
   * Botão principal e topo.
   */
  primary: INDIGO,
  primaryForeground: WHITE,

  /**
   * Secondary / Muted / Accent:
   * No app, essas superfícies são “cinzas claros”.
   */
  secondary: INPUT_BG,
  secondaryForeground: TEXT_PRIMARY,

  muted: INPUT_BG,
  mutedForeground: TEXT_SECONDARY,

  accent: INPUT_BG,
  accentForeground: TEXT_PRIMARY,

  /**
   * Destructive / Status
   */
  destructive: ERROR,
  destructiveForeground: WHITE,

  success: SUCCESS,
  warning: WARNING,

  /**
   * Card:
   * Superfície branca com textos em índigo/cinza.
   */
  card: WHITE,
  cardForeground: TEXT_PRIMARY,

  /**
   * Border / Input:
   * Inputs são cinza claro, borda clara, focus índigo.
   */
  borderColor: BORDER_INPUT,
  borderColorHover: BORDER_INPUT,
  borderColorFocus: BORDER_FOCUS,
  borderColorPress: BORDER_INPUT,

  inputBackground: INPUT_BG,
  placeholderColor: PLACEHOLDER,

  /**
   * Tokens extras úteis (NÃO quebram nada):
   * Alguns componentes preferem usar diretamente.
   */
  textPrimary: TEXT_PRIMARY,
  textSecondary: TEXT_SECONDARY,
  textInput: TEXT_INPUT,
  textButtonPrimary: WHITE,

  buttonPrimary: INDIGO,
  buttonPrimaryPressed: INDIGO_DARK,
  buttonDisabled: BORDER_INPUT,

  borderError: BORDER_ERROR,
  statusError: ERROR,
  statusSuccess: SUCCESS,
  statusWarning: WARNING,

  /**
   * Shadow:
   * Card tem sombra suave.
   */
  screenBackground: '#F7FAFC',

  shadowColor: 'rgba(0,0,0,0.08)',
  shadowColorHover: 'rgba(0,0,0,0.12)',
};

export const darkTheme: typeof lightTheme = {
  /**
   * Se você ainda não desenhou dark no Figma,
   * NÃO inventa um tema “slate completo”.
   * Faz um dark mínimo coerente com a marca:
   */
  background: '#0B1220',
  backgroundHover: '#0B1220',
  backgroundPress: '#0E172A',
  backgroundFocus: '#0B1220',
  backgroundStrong: '#0B1220',
  backgroundTransparent: 'transparent',

  color: '#E6EEF7',
  colorHover: '#E6EEF7',
  colorPress: '#E6EEF7',
  colorFocus: '#E6EEF7',
  colorTransparent: 'transparent',

  primary: '#274160', // indigo mais claro no dark para contraste
  primaryForeground: '#081018',

  secondary: '#111A2B',
  secondaryForeground: '#E6EEF7',

  muted: '#111A2B',
  mutedForeground: '#A8B3C2',

  accent: '#111A2B',
  accentForeground: '#E6EEF7',

  destructive: '#EF4444',
  destructiveForeground: WHITE,

  success: '#22C55E',
  warning: '#F59E0B',

  card: '#0F1A2C',
  cardForeground: '#E6EEF7',

  borderColor: '#1E2A3E',
  borderColorHover: '#274160',
  borderColorFocus: '#5A80A2',
  borderColorPress: '#274160',

  inputBackground: '#111A2B',
  placeholderColor: '#7B8798',

  textPrimary: '#E6EEF7',
  textSecondary: '#A8B3C2',
  textInput: '#E6EEF7',
  textButtonPrimary: '#081018',

  buttonPrimary: '#274160',
  buttonPrimaryPressed: '#4C6F8E',
  buttonDisabled: '#1E2A3E',

  borderError: '#EF4444',
  statusError: '#EF4444',
  statusSuccess: '#22C55E',
  statusWarning: '#F59E0B',

  screenBackground: '#0D1520',

  shadowColor: 'rgba(0,0,0,0.35)',
  shadowColorHover: 'rgba(0,0,0,0.45)',
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;
