/**
 * Type augmentation do Tamagui — separado do config principal
 * para evitar erro do Tamagui extractor (parseia .ts como JS).
 *
 * "Unexpected token 'typeof'" acontece quando typeof/declare module
 * estão no mesmo arquivo que createTamagui(). Separando aqui, o
 * extractor lê apenas JS-safe no config, e o TS compiler lê este
 * arquivo para type augmentation.
 */
import type { tamaguiConfig } from './tamagui.config';

export type AppConfig = typeof tamaguiConfig;

declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends AppConfig {}
}
