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

const NEUTRAL_100 = '#F7FAFC';
const NEUTRAL_200 = '#EEEBE5';
const NEUTRAL_900 = '#1A1F36';

const NEUTRAL_800 = '#3C4257';

const INPUT_BG = '#FAFAFA';

const TEXT_PRIMARY = '#274160';   // títulos/headings no card
const TEXT_SECONDARY = '#697386'; // texto auxiliar
const TEXT_INPUT = '#747681';     // texto de input
const PLACEHOLDER = '#94A3B8';    // placeholder (pode ajustar depois)

const BORDER_INPUT = '#E5E7EB';
const BORDER_FOCUS = INDIGO;
const BORDER_ERROR = '#DC2626';

const SUCCESS = '#22C55E';
const WARNING = '#F59E0B';
const ERROR = '#DC2626';
const DANGER = '#EF4444';

const BADGE_WARNING_BG = '#FFF4E0';
const BADGE_WARNING_FG = '#A67A5A';
const BADGE_ERROR_BG = '#FEE2E2';
const BADGE_ERROR_FG = '#B91C1C';

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

  /**
   * Bottom Navigation:
   * Barra de navegação customizada com pill shape.
   */
  bottomNavBg: WHITE,
  bottomNavActiveBg: INDIGO,
  bottomNavActiveFg: NEUTRAL_100,
  bottomNavInactiveBg: NEUTRAL_200,
  bottomNavInactiveIcon: NEUTRAL_900,

  /**
   * Header Home:
   * Topo índigo com avatar, textos claros e pill branco de status.
   */
  headerBg: INDIGO,
  headerText: NEUTRAL_100,
  headerNotifBg: NEUTRAL_100,
  headerNotifIcon: INDIGO,
  headerNotifDot: DANGER,

  statusPillBg: WHITE,
  statusPillText: NEUTRAL_900,
  statusDotSuccess: SUCCESS,
  statusDotDanger: DANGER,
  statusBadgeWarningBg: BADGE_WARNING_BG,
  statusBadgeWarningFg: BADGE_WARNING_FG,
  statusBadgeErrorBg: BADGE_ERROR_BG,
  statusBadgeErrorFg: BADGE_ERROR_FG,

  /**
   * Session List:
   * Card de últimas sessões com avatar, nome, especialidade.
   */
  sessionListBg: NEUTRAL_200,
  sessionListSeparator: NEUTRAL_100,
  sessionText: NEUTRAL_800,
  sessionChevron: NEUTRAL_800,
};
export const darkTheme: typeof lightTheme = {  /**
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

  bottomNavBg: '#1A2235',
  bottomNavActiveBg: '#5A80A2',
  bottomNavActiveFg: '#E6EEF7',
  bottomNavInactiveBg: '#1E2A3E',
  bottomNavInactiveIcon: '#A8B3C2',

  headerBg: '#0B1220',
  headerText: '#E6EEF7',
  headerNotifBg: '#1E2A3E',
  headerNotifIcon: '#E6EEF7',
  headerNotifDot: '#EF4444',

  statusPillBg: '#0F1A2C',
  statusPillText: '#E6EEF7',
  statusDotSuccess: '#22C55E',
  statusDotDanger: '#EF4444',
  statusBadgeWarningBg: '#3D2F1A',
  statusBadgeWarningFg: '#D4A574',
  statusBadgeErrorBg: '#3B1A1A',
  statusBadgeErrorFg: '#F87171',

  sessionListBg: '#1E2A3E',
  sessionListSeparator: '#2A3650',
  sessionText: '#A8B3C2',
  sessionChevron: '#A8B3C2',
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;
