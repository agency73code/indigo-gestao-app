import { ChevronRight } from 'lucide-react-native';
import React, { memo, useCallback } from 'react';
import { styled, Text, useTheme, XStack, YStack } from 'tamagui';

import { Avatar } from '@/src/ui/Avatar';
import { SpecialtyChip } from '@/src/ui/SpecialtyChip';

import type { SessionCardProps } from './SessionCard.types';

// ── Constants ────────────────────────────────────────────────
const CHEVRON_SIZE = 18;

// ── Styled ───────────────────────────────────────────────────

const Row = styled(XStack, {
  name: 'SessionCardRow',
  alignItems: 'center',
  paddingHorizontal: '$2.5', // 10
  paddingVertical: '$2.5', // 10
  gap: '$3', // 12
  pressStyle: { opacity: 0.85 },
});

const InfoColumn = styled(YStack, {
  name: 'SessionCardInfo',
  flex: 1,
  minWidth: 0,
  gap: '$1', // 4
});

const TopLine = styled(XStack, {
  name: 'SessionCardTopLine',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const PatientName = styled(Text, {
  name: 'SessionCardName',
  fontFamily: '$body',
  fontSize: 12,
  fontWeight: '500',
  color: '$sessionText',
  numberOfLines: 1,
});

const AgeText = styled(Text, {
  name: 'SessionCardAge',
  fontFamily: '$body',
  fontSize: 12,
  fontWeight: '500',
  color: '$sessionText',
  flexShrink: 0,
});

const MetaLine = styled(XStack, {
  name: 'SessionCardMeta',
  alignItems: 'center',
  gap: '$2', // 8
});

const DotSeparator = styled(Text, {
  name: 'SessionCardDot',
  fontFamily: '$body',
  fontSize: 10,
  fontWeight: '500',
  color: '$sessionText',
});

const TimeText = styled(Text, {
  name: 'SessionCardTime',
  fontFamily: '$body',
  fontSize: 10,
  fontWeight: '500',
  color: '$sessionText',
});

const Separator = styled(YStack, {
  name: 'SessionCardSeparator',
  height: 1,
  backgroundColor: '$sessionListSeparator',
  marginHorizontal: '$2.5', // 10
});

// ── Component ────────────────────────────────────────────────

function SessionCardComponent({ item, onPress, showSeparator }: SessionCardProps) {
  const theme = useTheme();

  const handlePress = useCallback(() => {
    onPress(item.id);
  }, [onPress, item.id]);

  return (
    <YStack>
      <Row
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={`${item.patientName}, ${item.age}, ${item.specialtyLabel}`}
      >
        <Avatar
          source={item.avatarSource}
          size="sm"
          fallbackInitials={item.fallbackInitials}
          accessibilityLabel={`Foto de ${item.patientName}`}
        />

        <InfoColumn>
          <TopLine>
            <PatientName>{item.patientName}</PatientName>
            <AgeText>{item.age}</AgeText>
          </TopLine>

          <MetaLine>
            <SpecialtyChip label={item.specialtyLabel} />
            <DotSeparator>•</DotSeparator>
            <TimeText>{item.timeAgo}</TimeText>
          </MetaLine>
        </InfoColumn>

        <ChevronRight
          size={CHEVRON_SIZE}
          color={theme.sessionChevron.val}
          strokeWidth={2}
        />
      </Row>

      {showSeparator && <Separator />}
    </YStack>
  );
}

export const SessionCard = memo(SessionCardComponent);
