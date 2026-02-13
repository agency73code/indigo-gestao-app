import { styled, Text as TamaguiText } from 'tamagui';

/**
 * AppText — componente de texto com variantes tipográficas.
 * pageTitle / cardTitle: Sora (peso 300–400, nunca bold)
 * label / body / muted: Inter
 */
export const AppText = styled(TamaguiText, {
  name: 'AppText',
  fontFamily: '$body',
  color: '$color',

  variants: {
    variant: {
      pageTitle: {
        fontFamily: '$heading',
        fontWeight: '300',
        fontSize: '$9',
        lineHeight: 42,
        letterSpacing: -1,
      },
      cardTitle: {
        fontFamily: '$heading',
        fontWeight: '400',
        fontSize: '$7',
        lineHeight: 30,
        letterSpacing: -0.5,
      },
      label: {
        fontFamily: '$body',
        fontWeight: '500',
        fontSize: '$4',
        lineHeight: 22,
      },
      body: {
        fontFamily: '$body',
        fontWeight: '400',
        fontSize: '$4',
        lineHeight: 22,
      },
      muted: {
        fontFamily: '$body',
        fontWeight: '400',
        fontSize: '$3',
        lineHeight: 20,
        color: '$mutedForeground',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'body',
  },
});
