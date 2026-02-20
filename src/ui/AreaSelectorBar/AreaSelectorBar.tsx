import { ChevronDown } from 'lucide-react-native';
import React, { memo, useCallback, useState } from 'react';
import { styled, Text, useTheme, XStack } from 'tamagui';

import { Button } from '@/src/ui/Button';
import { ModalSheet } from '@/src/ui/ModalSheet';
import { SelectItem } from '@/src/ui/SelectItem';
import { SpecialtyChip } from '@/src/ui/SpecialtyChip';

import type { AreaSelectorBarProps } from './AreaSelectorBar.types';

// ── Constants ────────────────────────────────────────────────
const CONTAINER_HEIGHT = 48;
const CHANGE_BUTTON_HEIGHT = 27;
const CHEVRON_SIZE = 14;
const TODOS_LABEL = 'Todos';
const MODAL_BUTTON_HEIGHT = 43;

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

const SectionLabel = styled(Text, {
  name: 'AreaSectionLabel',
  fontFamily: '$body',
  fontSize: '$1', // 12
  fontWeight: '700',
  color: '$neutral800',
  lineHeight: 16,
  paddingTop: '$2', // 8
  paddingBottom: '$1', // 4
  paddingLeft: '$1', // 4 + 20 modal = ~24-25px total
});

const FooterRow = styled(XStack, {
  name: 'AreaSelectorFooterRow',
  flex: 1,
  gap: '$3', // 12
});

// ── Component ────────────────────────────────────────────────

function AreaSelectorBarComponent({
  currentArea,
  areas,
  onSelectArea,
}: AreaSelectorBarProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [tempSelection, setTempSelection] = useState(currentArea);

  const hasMultipleAreas = areas.length > 1;

  const handleOpen = useCallback(() => {
    setTempSelection(currentArea);
    setOpen(true);
  }, [currentArea]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleApply = useCallback(() => {
    onSelectArea(tempSelection);
    setOpen(false);
  }, [onSelectArea, tempSelection]);

  const footer = (
    <FooterRow>
      <Button
        variant="secondary"
        size="modal"
        onPress={handleClose}
      >
        Cancelar
      </Button>
      <Button
        variant="default"
        size="modal"
        onPress={handleApply}
      >
        Aplicar
      </Button>
    </FooterRow>
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

      <ModalSheet
        isOpen={open}
        onClose={handleClose}
        title="Selecionar área"
        subtitle="Escolha uma área para filtrar programas e sessões."
        footer={footer}
      >
        {/* Seção: Filtro */}
        <SectionLabel>Filtro</SectionLabel>
        <SelectItem
          title={TODOS_LABEL}
          titleContent={<SpecialtyChip label={TODOS_LABEL} isOverflow />}
          subtitle="Mostrar todas as áreas"
          selected={tempSelection === TODOS_LABEL}
          onPress={() => setTempSelection(TODOS_LABEL)}
          type="radio"
        />

        {/* Seção: Áreas */}
        <SectionLabel>Áreas</SectionLabel>
        {areas.map((area) => (
          <SelectItem
            key={area}
            title={area}
            titleContent={<SpecialtyChip label={area} />}
            subtitle="Filtrar por especialidade"
            selected={tempSelection === area}
            onPress={() => setTempSelection(area)}
            type="radio"
          />
        ))}
      </ModalSheet>
    </>
  );
}

export const AreaSelectorBar = memo(AreaSelectorBarComponent);
