import React, { memo, useCallback, useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    PanResponder,
    Pressable,
} from 'react-native';
import { styled, Text, XStack, YStack } from 'tamagui';

import type { ModalSheetProps } from './ModalSheet.types';

// ── Constants ────────────────────────────────────────────────
const GRABBER_WIDTH = 80;
const GRABBER_HEIGHT = 5;
const SEPARATOR_HEIGHT = 0.5;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const DISMISS_THRESHOLD = 100; // px de arrasto para fechar

// ── Styled ───────────────────────────────────────────────────

const Overlay = styled(YStack, {
  name: 'ModalSheetOverlay',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '$modalOverlay',
});

const ContentWrapper = styled(YStack, {
  name: 'ModalSheetContent',
  flex: 1,
  justifyContent: 'flex-end',
});

const SheetContainer = styled(YStack, {
  name: 'ModalSheetContainer',
  backgroundColor: '$screenBackground',
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  paddingBottom: '$8', // 32
  overflow: 'hidden',
});

const GrabberBar = styled(XStack, {
  name: 'ModalSheetGrabber',
  width: GRABBER_WIDTH,
  height: GRABBER_HEIGHT,
  borderRadius: '$pill',
  backgroundColor: '$modalGrabber',
  alignSelf: 'center',
  marginTop: '$3', // 12
});

const HeaderSection = styled(YStack, {
  name: 'ModalSheetHeader',
  paddingHorizontal: '$5', // 20
  paddingTop: '$2', // 8
  paddingBottom: '$3', // 12
});

const TitleText = styled(Text, {
  name: 'ModalSheetTitle',
  fontFamily: '$heading',
  fontSize: '$3', // 16
  fontWeight: '600',
  color: '$neutral900',
});

const SubtitleText = styled(Text, {
  name: 'ModalSheetSubtitle',
  fontFamily: '$body',
  fontSize: '$1', // 12
  fontWeight: '400',
  color: '$textSecondary',
  marginTop: '$0.5', // 2
});

const Separator = styled(XStack, {
  name: 'ModalSheetSeparator',
  height: SEPARATOR_HEIGHT,
  backgroundColor: '$modalSeparator',
  marginHorizontal: '$5', // 20
});

const BodySection = styled(YStack, {
  name: 'ModalSheetBody',
  paddingHorizontal: '$5', // 20
  paddingTop: '$3', // 12
  paddingBottom: '$4', // 16
  gap: '$2', // 8
});

const FooterSection = styled(XStack, {
  name: 'ModalSheetFooter',
  paddingHorizontal: '$5', // 20
  paddingTop: '$4', // 16
  gap: '$3', // 12
});

// ── Component ────────────────────────────────────────────────

function ModalSheetComponent({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
}: ModalSheetProps) {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  // Anima entrada quando abre
  useEffect(() => {
    if (isOpen) {
      translateY.setValue(SCREEN_HEIGHT);
      overlayOpacity.setValue(0);
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 4,
          speed: 14,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen, translateY, overlayOpacity]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_evt, state) =>
        state.dy > 8 && Math.abs(state.dy) > Math.abs(state.dx),
      onPanResponderMove: (_evt, state) => {
        if (state.dy > 0) {
          translateY.setValue(state.dy);
        }
      },
      onPanResponderRelease: (_evt, state) => {
        if (state.dy > DISMISS_THRESHOLD || state.vy > 0.5) {
          animateOut();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 8,
          }).start();
        }
      },
    }),
  ).current;

  const animateOut = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  }, [onClose, translateY, overlayOpacity]);

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="none"
      onRequestClose={animateOut}
      statusBarTranslucent
    >
      {/* Scrim escuro com fade independente */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: overlayOpacity,
        }}
      >
        <Overlay />
      </Animated.View>

      {/* Área clicável para fechar */}
      <Pressable onPress={animateOut} style={{ flex: 1 }}>
        <ContentWrapper>
          <Animated.View
            style={{ transform: [{ translateY }] }}
            {...panResponder.panHandlers}
          >
            <Pressable onPress={(e) => e.stopPropagation()}>
              <SheetContainer>
                <GrabberBar />

                <HeaderSection>
                  <TitleText>{title}</TitleText>
                  {subtitle ? <SubtitleText>{subtitle}</SubtitleText> : null}
                </HeaderSection>

                <Separator />

                <BodySection>{children}</BodySection>

                {footer ? (
                  <>
                    <Separator />
                    <FooterSection>{footer}</FooterSection>
                  </>
                ) : null}
              </SheetContainer>
            </Pressable>
          </Animated.View>
        </ContentWrapper>
      </Pressable>
    </Modal>
  );
}

export const ModalSheet = memo(ModalSheetComponent);
