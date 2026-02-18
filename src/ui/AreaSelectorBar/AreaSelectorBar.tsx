import { ChevronDown } from 'lucide-react-native';
import React, { memo } from 'react';
import { styled, Text, useTheme, XStack } from 'tamagui';

import { SpecialtyChip } from '@/src/ui/SpecialtyChip';

import type { AreaSelectorBarProps } from './AreaSelectorBar.types';

// ── Constants ────────────────────────────────────────────────
const CONTAINER_HEIGHT = 48;
const CHANGE_BUTTON_HEIGHT = 27;
const CHEVRON_SIZE = 14;

// ── Styled ───────────────────────────────────────────────────

const SelectorContainer = styled(XStack, {
  name: 'AreaSelectorContainer',
  height: CONTAINER_HEIGHT,
  borderRadius: '$pill',
  backgroundColor: '$areaSelectorBg',
  alignItems: 'center',
  paddingLeft: '$4', // 16
  paddingRight: '$3', // 12
  gap: '$2.5', // 10
});

const AreaLabel = styled(Text, {
  name: 'AreaSelectorLabel',
  fontFamily: '$body',
  fontSize: 12,
  fontWeight: '400',
  color: '$areaSelectorLabel',
});

const Spacer = styled(XStack, {
  name: 'AreaSelectorSpacer',
  flex: 1,
});

const ChangeButton = styled(XStack, {
  name: 'AreaSelectorChangeButton',
  height: CHANGE_BUTTON_HEIGHT,
  borderRadius: '$pill',
  borderWidth: 1,
  borderColor: '#EEEBE5',
  backgroundColor: '#EEEBE5',
  alignItems: 'center',
  paddingHorizontal: '$3', // 12
  gap: '$1', // 4
  pressStyle: { opacity: 0.7 },
});

const ChangeButtonText = styled(Text, {
  name: 'AreaSelectorChangeText',
  fontFamily: 'InterSemiBold',
  fontSize: 10,
  color: '$areaSelectorLabel',
});

// ── Component ────────────────────────────────────────────────

function AreaSelectorBarComponent({
  currentArea,
  hasMultipleAreas,
  onChangeArea,
}: AreaSelectorBarProps) {
  const theme = useTheme();

  return (
    <SelectorContainer>
      <AreaLabel>Area Atual:</AreaLabel>
      <SpecialtyChip label={currentArea} />
      <Spacer />
      {hasMultipleAreas && (
        <ChangeButton
          onPress={onChangeArea}
          accessibilityRole="button"
          accessibilityLabel="Trocar área"
        >
          <ChangeButtonText>Trocar</ChangeButtonText>
          <ChevronDown
            size={CHEVRON_SIZE}
            color={theme.areaSelectorLabel.val}
            strokeWidth={2}
          />
        </ChangeButton>
      )}
    </SelectorContainer>
  );
}

export const AreaSelectorBar = memo(AreaSelectorBarComponent);
