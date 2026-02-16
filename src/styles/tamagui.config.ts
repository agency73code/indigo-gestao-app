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

// IMPORTANTE: typeof, declare module e interface ficam em
// tamagui.config.types.ts para não quebrar o Tamagui extractor
// que parseia este arquivo como JS puro.
