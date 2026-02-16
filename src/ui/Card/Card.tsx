import { styled, YStack } from 'tamagui';

/**
 * Card — container visual com radius e fundo branco.
 */
export const CardStyled = styled(YStack, {
  name: 'Card',
  backgroundColor: '#FFFFFF',
  borderRadius: '$5',
  borderWidth: 0,
  padding: '$6',
});

export { CardStyled as Card };
