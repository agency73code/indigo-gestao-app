import { styled, YStack } from 'tamagui';

/**
 * Card — container visual com borda, radius e sombra.
 * Padding variants: none, sm, md, lg.
 * Cards usam radius maior e fundo do tema ($card).
 */
export const CardStyled = styled(YStack, {
  name: 'Card',
  background: '$card',
  borderRadius: '$5',
  borderWidth: 1,
  borderColor: '$borderColor',
  overflow: 'hidden',

  variants: {
    padding: {
      none: { padding: 0 },
      sm: { padding: '$2' },
      md: { padding: '$4' },
      lg: { padding: '$6' },
    },
  } as const,

  defaultVariants: {
    padding: 'md',
  },
});

export { CardStyled as Card };
