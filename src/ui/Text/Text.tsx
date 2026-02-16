import { styled, Text as TamaguiText } from 'tamagui';

/**
 * AppText — componente de texto com variantes tipográficas.
 *
 * Escala tipográfica (font size ↔ token):
 *   $1:12  $2:14  $3:16  $4:18  $5:20  $6:24  $7:28  $8:32  $9:36
 *
 * pageTitle / cardTitle: Sora (peso 300–400, nunca bold)
 * label / body / muted: body font (DM Sans / Inter)
 */
export const AppText = styled(TamaguiText, {
  name: 'AppText',
  fontFamily: '$body',
  color: '$color',

  variants: {
    variant: {
      pageTitle: {
        fontFamily: '$heading',
        fontWeight: '400',
        fontSize: '$7',     // 28
        lineHeight: 36,
        letterSpacing: -1,
      },
      cardTitle: {
        fontFamily: '$heading',
        fontWeight: '400',
        fontSize: '$5',     // 20
        lineHeight: 28,
        letterSpacing: -0.5,
      },
      label: {
        fontFamily: '$body',
        fontWeight: '500',
        fontSize: '$2',     // 14
        lineHeight: 20,
      },
      body: {
        fontFamily: '$body',
        fontWeight: '400',
        fontSize: '$2',     // 14
        lineHeight: 20,
      },
      muted: {
        fontFamily: '$body',
        fontWeight: '400',
        fontSize: '$1',     // 12
        lineHeight: 16,
        color: '$mutedForeground',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'body',
  },
});
