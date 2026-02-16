import { createTamagui } from 'tamagui';

import { bodyFont, soraFont } from './fonts';
import { themes } from './themes';
import { tokens } from './tokens';

/**
 * Configuração principal do Tamagui para o app Gestão Índigo.
 *
 * Configuração construída sem defaultConfig para evitar conflitos de tipos
 * com shorthands no Tamagui 2.0.0-rc. Props usam nomes completos
 * (alignItems, borderRadius, etc.) para máxima legibilidade.
 *
 * - Body: DM Sans (Inter temporário) = $body
 * - Headings: Sora = $heading
 * - Light/dark themes alinhados com o Figma Mobile
 */
export const tamaguiConfig = createTamagui({
  tokens,
  themes,
  fonts: {
    body: bodyFont,
    heading: soraFont,
  },
});

export type AppConfig = typeof tamaguiConfig;

// Tipagem global para imports de 'tamagui' reconhecerem nossos tokens/temas
declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends AppConfig {}
}
