import { createTamagui } from 'tamagui';

import { interFont, soraFont } from './fonts';
import { themes } from './themes';
import { tokens } from './tokens';

/**
 * Configuração principal do Tamagui para o app Gestão Índigo.
 *
 * Configuração construída sem defaultConfig para evitar conflitos de tipos
 * com shorthands no Tamagui 2.0.0-rc. Props usam nomes completos
 * (alignItems, borderRadius, etc.) para máxima legibilidade.
 *
 * - Inter = body/labels, Sora = headings
 * - Light/dark themes alinhados com o ERP
 */
export const tamaguiConfig = createTamagui({
  tokens,
  themes,
  fonts: {
    body: interFont,
    heading: soraFont,
  },
});

export type AppConfig = typeof tamaguiConfig;

// Tipagem global para imports de 'tamagui' reconhecerem nossos tokens/temas
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}
