import { Check } from 'lucide-react-native';
import React, { memo } from 'react';
import { styled, Text, useTheme, XStack, YStack } from 'tamagui';

import type { SelectItemProps } from './SelectItem.types';

// ── Constants ────────────────────────────────────────────────
const ITEM_HEIGHT = 53;
const RADIO_OUTER = 18;
const RADIO_INNER = 12;
const CHECK_CIRCLE = 34;
const CHECK_ICON = 16;

// ── Styled ───────────────────────────────────────────────────

const ItemContainer = styled(XStack, {
  name: 'SelectItemContainer',
  height: ITEM_HEIGHT,
  borderRadius: '$select', // 32
  alignItems: 'center',
  paddingLeft: '$4', // 16
  paddingRight: '$2.5', // 10
  gap: '$3', // 12
  pressStyle: { opacity: 0.8 },

  variants: {
    selected: {
      true: {
        backgroundColor: '$selectSelectedBg',
        borderWidth: 1,
        borderColor: '$selectSelectedBorder',
      },
      false: {
        backgroundColor: '$selectDefaultBg',
        borderWidth: 1,
        borderColor: 'transparent',
      },
    },
  } as const,

  defaultVariants: {
    selected: false,
  },
});

const TextGroup = styled(YStack, {
  name: 'SelectItemTextGroup',
  flex: 1,
  justifyContent: 'center',
});

const TitleText = styled(Text, {
  name: 'SelectItemTitle',
  fontFamily: '$body',
  fontSize: '$1', // 12
  fontWeight: '700',
  color: '$neutral800',
  lineHeight: 16,
});

const SubtitleText = styled(Text, {
  name: 'SelectItemSubtitle',
  fontFamily: '$body',
  fontSize: '$1', // 12
  fontWeight: '400',
  color: '$uiTextSecondary',
  lineHeight: 16,
});

// ── Radio indicator ──────────────────────────────────────────

const RadioOuter = styled(XStack, {
  name: 'SelectItemRadioOuter',
  width: RADIO_OUTER,
  height: RADIO_OUTER,
  borderRadius: RADIO_OUTER / 2,
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    selected: {
      true: {
        backgroundColor: '$radioSelectedBg',
      },
      false: {
        backgroundColor: '$radioDefault',
      },
    },
  } as const,
});

const RadioInner = styled(XStack, {
  name: 'SelectItemRadioInner',
  width: RADIO_INNER,
  height: RADIO_INNER,
  borderRadius: RADIO_INNER / 2,
  backgroundColor: '$accentBlue',
});

// ── Check indicator ──────────────────────────────────────────

const CheckCircle = styled(YStack, {
  name: 'SelectItemCheckCircle',
  width: CHECK_CIRCLE,
  height: CHECK_CIRCLE,
  borderRadius: CHECK_CIRCLE / 2,
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',

  variants: {
    selected: {
      true: {
        backgroundColor: '$checkSelectedBg',
      },
      false: {
        backgroundColor: 'transparent',
      },
    },
  } as const,
});

// ── Component ────────────────────────────────────────────────

function SelectItemComponent({
  title,
  subtitle,
  selected,
  onPress,
  type = 'radio',
}: SelectItemProps) {
  const theme = useTheme();

  const checkColor = selected
    ? theme.accentBlue.val
    : theme.radioDefault.val;

  return (
    <ItemContainer
      selected={selected}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={title}
    >
      {/* Radio indicator (left side) */}
      {type === 'radio' ? (
        <RadioOuter selected={selected}>
          {selected ? <RadioInner /> : null}
        </RadioOuter>
      ) : null}

      {/* Text */}
      <TextGroup>
        <TitleText>{title}</TitleText>
        {subtitle ? <SubtitleText>{subtitle}</SubtitleText> : null}
      </TextGroup>

      {/* Check indicator (right side) */}
      <CheckCircle selected={selected}>
        <Check
          size={CHECK_ICON}
          color={checkColor}
          strokeWidth={2.5}
        />
      </CheckCircle>
    </ItemContainer>
  );
}

export const SelectItem = memo(SelectItemComponent);
