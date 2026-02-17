import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import type { SplashAnimatedProps } from './SplashAnimated.types';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const PRIMARY_COLOR = '#274160';
const SCREEN_BG = '#F7FAFC';

/**
 * SplashAnimated — transição profissional de cor.
 *
 * Sequência:
 * 1. Tela cheia azul primary (800ms de hold)
 * 2. Gradiente animado: faixa clara sobe do rodapé cobrindo a tela (700ms)
 * 3. Overlay faz fade-out suave, revelando a tela real por baixo (400ms)
 */
export function SplashAnimated({ onAnimationComplete }: SplashAnimatedProps) {
  const colorProgress = useSharedValue(0);
  const wipeTranslateY = useSharedValue(SCREEN_HEIGHT);
  const overlayOpacity = useSharedValue(1);

  useEffect(() => {
    // Phase 1: Hold azul primary (800ms) — depois inicia transição

    // Phase 2: Faixa clara sobe do rodapé
    wipeTranslateY.value = withDelay(
      800,
      withTiming(0, {
        duration: 700,
        easing: Easing.inOut(Easing.cubic),
      }),
    );

    // Phase 2b: Cor de fundo faz crossfade simultâneo
    colorProgress.value = withDelay(
      800,
      withTiming(1, {
        duration: 700,
        easing: Easing.inOut(Easing.cubic),
      }),
    );

    // Phase 3: Overlay fade-out
    overlayOpacity.value = withDelay(
      1700,
      withTiming(0, { duration: 400, easing: Easing.in(Easing.cubic) }, (finished) => {
        if (finished) {
          runOnJS(onAnimationComplete)();
        }
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const backgroundStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      colorProgress.value,
      [0, 1],
      [PRIMARY_COLOR, SCREEN_BG],
    );
    return { backgroundColor };
  });

  const wipeStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: wipeTranslateY.value }],
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  return (
    <Animated.View style={[styles.overlay, overlayStyle]}>
      {/* Base: azul → claro via interpolateColor */}
      <Animated.View style={[styles.background, backgroundStyle]}>
        {/* Faixa clara que sobe do rodapé */}
        <Animated.View style={[styles.wipe, wipeStyle]} />
      </Animated.View>
    </Animated.View>
  );
}

/**
 * Nota: Usamos StyleSheet aqui propositalmente.
 * Este componente é de infraestrutura (splash animation),
 * renderizado ANTES do TamaguiProvider estar ativo na tela.
 * Tamagui styled() depende do provider, então StyleSheet é necessário aqui.
 */
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
  background: {
    flex: 1,
  },
  wipe: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT,
    backgroundColor: SCREEN_BG,
  },
});
