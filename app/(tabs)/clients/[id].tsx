import { useLocalSearchParams, useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { styled, Text, useTheme, XStack, YStack } from 'tamagui';

import { useConnectivity } from '@/src/core/hooks/useConnectivity';
import { useClientPrograms } from '@/src/features/client/hooks';
import { ClientDetailHeader } from '@/src/ui/ClientDetailHeader';
import type { ProgramItemData } from '@/src/ui/ProgramCard';
import { ProgramCard } from '@/src/ui/ProgramCard';

// ── Constants ────────────────────────────────────────────────
const ADD_BUTTON_HEIGHT = 30;
const PLUS_ICON_SIZE = 20;

// ── Styled ───────────────────────────────────────────────────

const ScreenContainer = styled(YStack, {
  name: 'ClientProgramsScreen',
  flex: 1,
  backgroundColor: '$screenBackground',
});

const ContentWrapper = styled(YStack, {
  name: 'ClientProgramsContent',
  gap: '$4', // 16
});

const TitleRow = styled(XStack, {
  name: 'ClientProgramsTitleRow',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const SectionTitle = styled(Text, {
  name: 'ClientProgramsSectionTitle',
  fontFamily: '$heading',
  fontSize: 18,
  fontWeight: '400',
  color: '$sessionText',
});

const AddButton = styled(XStack, {
  name: 'ClientProgramsAddButton',
  height: ADD_BUTTON_HEIGHT,
  borderRadius: '$pill',
  borderWidth: 1,
  borderColor: '$areaSelectorBorder',
  backgroundColor: '$screenBackground',
  alignItems: 'center',
  paddingHorizontal: '$3', // 12
  gap: '$1.5', // 6
  pressStyle: { opacity: 0.7 },

  variants: {
    isDisabled: {
      true: {
        opacity: 0.5,
      },
    },
  } as const,
});

const AddButtonText = styled(Text, {
  name: 'ClientProgramsAddText',
  fontFamily: '$body',
  fontSize: 12,
  fontWeight: '500',
  color: '$sessionText',
});

// ── Component ────────────────────────────────────────────────

export default function ClientProgramsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const { isOnline } = useConnectivity();

  const {
    client,
    programs,
    currentArea,
    areas,
    setCurrentArea,
  } = useClientPrograms(id);

  const [areaSheetOpen, setAreaSheetOpen] = useState(false);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleChangeArea = useCallback(() => {
    // Mock: alterna para a próxima área disponível
    if (areas.length <= 1) return;
    const currentIndex = areas.indexOf(currentArea);
    const nextIndex = (currentIndex + 1) % areas.length;
    setCurrentArea(areas[nextIndex]);
  }, [areas, currentArea, setCurrentArea]);

  const handleAddProgram = useCallback(() => {
    if (!isOnline) {
      Alert.alert(
        'Sem conexão',
        'Você só pode criar programas com internet.',
      );
      return;
    }
    // TODO: navegar para criação de programa
  }, [isOnline]);

  const handleNewSession = useCallback((programId: string) => {
    // TODO: navegar para criação de sessão
  }, []);

  const handleViewSessions = useCallback((programId: string) => {
    // TODO: navegar para lista de sessões do programa
  }, []);

  const handleProgramPress = useCallback((programId: string) => {
    // TODO: navegar para detalhe do programa
  }, []);

  const handleProgramMenu = useCallback((programId: string) => {
    Alert.alert('Menu', 'Ver programa\nEditar programa (requer internet)');
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: ProgramItemData }) => (
      <ProgramCard
        item={item}
        onNewSession={handleNewSession}
        onViewSessions={handleViewSessions}
        onPress={handleProgramPress}
        onMenu={handleProgramMenu}
      />
    ),
    [handleNewSession, handleViewSessions, handleProgramPress, handleProgramMenu],
  );

  const keyExtractor = useCallback(
    (item: ProgramItemData) => item.id,
    [],
  );

  const ListHeader = useCallback(
    () => (
      <ContentWrapper>
        <TitleRow>
          <SectionTitle>Programas ativos</SectionTitle>
          <AddButton
            isDisabled={!isOnline}
            onPress={handleAddProgram}
            accessibilityRole="button"
            accessibilityLabel="Adicionar programa"
          >
            <Plus
              size={PLUS_ICON_SIZE}
              color={theme.sessionText.val}
              strokeWidth={1.8}
            />
            <AddButtonText>Adicionar Programa</AddButtonText>
          </AddButton>
        </TitleRow>
      </ContentWrapper>
    ),
    [isOnline, handleAddProgram, theme],
  );

  if (!client) return null;

  return (
    <ScreenContainer>
      <ClientDetailHeader
        clientName={client.name}
        clientAge={client.age}
        avatarUrl={client.avatarUrl}
        fallbackInitials={client.fallbackInitials}
        isOnline={isOnline}
        onBack={handleBack}
        currentArea={currentArea}
        hasMultipleAreas={areas.length > 1}
        onChangeArea={handleChangeArea}
      />

      <FlatList
        data={programs}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={{
          paddingTop: 16,
          paddingHorizontal: 22,
          paddingBottom: 100,
          gap: 10,
        }}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
}
