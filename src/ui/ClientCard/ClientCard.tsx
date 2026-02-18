import { ChevronRight } from 'lucide-react-native';
import React, { memo, useCallback, useMemo } from 'react';
import { styled, Text, useTheme, XStack, YStack } from 'tamagui';

import { Avatar } from '@/src/ui/Avatar';
import { SpecialtyChip } from '@/src/ui/SpecialtyChip';

import type { ClientCardProps } from './ClientCard.types';

// ── Constants ────────────────────────────────────────────────
const CHEVRON_SIZE = 20;
const MAX_VISIBLE_CHIPS = 2;

// ── Styled ───────────────────────────────────────────────────

const CardFrame = styled(XStack, {
  name: 'ClientCardFrame',
  backgroundColor: '$sessionListBg', // neutral200 #EEEBE5
  borderRadius: '$pill',
  alignItems: 'center',
  paddingHorizontal: '$2.5', // 10
  paddingVertical: '$2.5', // 10
  gap: '$3', // 12
  pressStyle: { opacity: 0.85 },
});

const InfoColumn = styled(YStack, {
  name: 'ClientCardInfo',
  flex: 1,
  minWidth: 0,
  gap: '$1', // 4
});

const TopLine = styled(XStack, {
  name: 'ClientCardTopLine',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const ClientName = styled(Text, {
  name: 'ClientCardName',
  fontFamily: '$body',
  fontSize: 12,
  fontWeight: '500',
  color: '$sessionText', // neutral800
  numberOfLines: 1,
});

const AgeText = styled(Text, {
  name: 'ClientCardAge',
  fontFamily: '$body',
  fontSize: 12,
  fontWeight: '500',
  color: '$sessionText', // neutral800
  flexShrink: 0,
});

const ChipsRow = styled(XStack, {
  name: 'ClientCardChips',
  alignItems: 'center',
  gap: '$1', // 4
  flexWrap: 'wrap',
});

// ── Component ────────────────────────────────────────────────

function ClientCardComponent({ item, onPress, maxChips = MAX_VISIBLE_CHIPS }: ClientCardProps) {
  const theme = useTheme();

  const handlePress = useCallback(() => {
    onPress(item.id);
  }, [onPress, item.id]);

  const { visible, overflowCount } = useMemo(() => {
    const vis = item.specialties.slice(0, maxChips);
    const overflow = Math.max(0, item.specialties.length - maxChips);
    return { visible: vis, overflowCount: overflow };
  }, [item.specialties, maxChips]);

  return (
    <CardFrame
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`${item.name}, ${item.age} anos`}
    >
      <Avatar
        source={item.avatarUrl}
        size="sm"
        fallbackInitials={item.fallbackInitials}
        accessibilityLabel={`Foto de ${item.name}`}
      />

      <InfoColumn>
        <TopLine>
          <ClientName>{item.name}</ClientName>
          <AgeText>{`${String(item.age).padStart(2, '0')} anos`}</AgeText>
        </TopLine>

        <ChipsRow>
          {visible.map((specialty) => (
            <SpecialtyChip key={specialty} label={specialty} />
          ))}
          {overflowCount > 0 && (
            <SpecialtyChip label={`+${overflowCount}`} isOverflow />
          )}
        </ChipsRow>
      </InfoColumn>

      <ChevronRight
        size={CHEVRON_SIZE}
        color={theme.sessionChevron.val}
        strokeWidth={2}
      />
    </CardFrame>
  );
}

export const ClientCard = memo(ClientCardComponent);
