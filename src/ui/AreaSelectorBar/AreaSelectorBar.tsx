import { Check, ChevronDown } from 'lucide-react-native';
import React, { memo, useCallback, useState } from 'react';
import { Modal, Pressable } from 'react-native';
import { styled, Text, useTheme, XStack, YStack } from 'tamagui';

import { SpecialtyChip } from '@/src/ui/SpecialtyChip';

import type { AreaSelectorBarProps } from './AreaSelectorBar.types';

// ── Constants ────────────────────────────────────────────────
const CONTAINER_HEIGHT = 48;
const CHANGE_BUTTON_HEIGHT = 27;
const CHEVRON_SIZE = 14;
const CHECK_SIZE = 16;
const TODOS_LABEL = 'Todos';

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
  fontFamily: '$body',
  fontSize: 10,
  fontWeight: '600',
  color: '$areaSelectorLabel',
});

const DropdownOverlay = styled(YStack, {
  name: 'AreaDropdownOverlay',
  flex: 1,
  justifyContent: 'flex-end',
  backgroundColor: 'rgba(0,0,0,0.25)',
});

const DropdownCard = styled(YStack, {
  name: 'AreaDropdownCard',
  backgroundColor: '$screenBackground',
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  paddingTop: '$4',
  paddingBottom: '$8',
  paddingHorizontal: '$5',
  gap: '$1',
});

const DropdownTitle = styled(Text, {
  name: 'AreaDropdownTitle',
  fontFamily: '$heading',
  fontSize: 16,
  fontWeight: '600',
  color: '$sessionText',
  paddingBottom: '$2',
});

const OptionRow = styled(XStack, {
  name: 'AreaDropdownOption',
  height: 48,
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: '$3',
  borderRadius: '$3',
  pressStyle: { opacity: 0.7, backgroundColor: '$areaSelectorBg' },
});

const OptionText = styled(Text, {
  name: 'AreaDropdownOptionText',
  fontFamily: '$body',
  fontSize: 15,
  fontWeight: '400',
  color: '$sessionText',
});

// ── Component ────────────────────────────────────────────────

function AreaSelectorBarComponent({
  currentArea,
  areas,
  onSelectArea,
}: AreaSelectorBarProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const hasMultipleAreas = areas.length > 1;
  const allOptions = [TODOS_LABEL, ...areas];

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSelect = useCallback(
    (area: string) => {
      onSelectArea(area);
      setOpen(false);
    },
    [onSelectArea],
  );

  return (
    <>
      <SelectorContainer>
        <AreaLabel>Área Atual:</AreaLabel>
        {currentArea === TODOS_LABEL ? (
          <SpecialtyChip label={TODOS_LABEL} isOverflow />
        ) : (
          <SpecialtyChip label={currentArea} />
        )}
        <Spacer />
        {hasMultipleAreas && (
          <ChangeButton
            onPress={handleOpen}
            accessibilityRole="button"
            accessibilityLabel="Selecionar área"
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

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        <Pressable onPress={handleClose} style={{ flex: 1 }}>
          <DropdownOverlay>
            <Pressable onPress={(e) => e.stopPropagation()}>
              <DropdownCard>
                <DropdownTitle>Selecionar área</DropdownTitle>
                {allOptions.map((area) => (
                  <OptionRow
                    key={area}
                    onPress={() => handleSelect(area)}
                    accessibilityRole="button"
                    accessibilityLabel={`Selecionar ${area}`}
                  >
                    <OptionText
                      fontWeight={area === currentArea ? '600' : '400'}
                    >
                      {area}
                    </OptionText>
                    {area === currentArea && (
                      <Check
                        size={CHECK_SIZE}
                        color={theme.sessionText.val}
                        strokeWidth={2.5}
                      />
                    )}
                  </OptionRow>
                ))}
              </DropdownCard>
            </Pressable>
          </DropdownOverlay>
        </Pressable>
      </Modal>
    </>
  );
}

export const AreaSelectorBar = memo(AreaSelectorBarComponent);
