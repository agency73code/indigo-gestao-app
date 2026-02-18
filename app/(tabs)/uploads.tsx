import React from 'react';
import { YStack } from 'tamagui';

import { AppText } from '@/src/ui/Text';

export default function UploadsScreen() {
  return (
    <YStack flex={1} alignItems="center" justifyContent="center" backgroundColor="$screenBackground">
      <AppText>Envios</AppText>
    </YStack>
  );
}
