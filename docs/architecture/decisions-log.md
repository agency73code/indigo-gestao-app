# Decisions Log — Gestão Índigo

> Registro formal de decisões arquiteturais. Decisão registrada vence conflito com prompt.

---

## DECISION-001: StyleSheet.create → Tamagui

- **Data**: 2026-02-13
- **Status**: ✅ Implementada
- **Contexto**: Projeto iniciava com StyleSheet.create. Migrou para Tamagui `styled()` + tokens `$token` para design system consistente com light/dark themes.
- **Decisão**: Tamagui é o padrão exclusivo de estilos. StyleSheet.create, inline styles e .styles.ts são proibidos.
- **Consequência**: Todos os componentes em `src/ui/` usam `styled()`. Componentes antigos (ThemedText, ThemedView) são legado — não usar.

---

## DECISION-002: Backend como API externa

- **Data**: 2026-02-13
- **Status**: ✅ Ativa
- **Contexto**: Backend reside em repositório separado.
- **Decisão**: Não existe `src/backend/` neste projeto. Comunicação via outbox pattern.
- **Consequência**: Nenhum código de servidor neste repo. Frontend nunca faz fetch direto (exceto auth).

---

## DECISION-003: Estrutura de pastas fixa

- **Data**: 2026-02-13
- **Status**: ✅ Ativa
- **Decisão**: Pastas definidas em `copilot-instructions.md` §4 não podem ser alteradas sem aprovação.
- **Consequência**: Novos módulos seguem estrutura existente. Sem pastas ad-hoc.

---

## DECISION-004: Auth Bootstrap (exceção ao outbox)

- **Data**: 2026-02-13
- **Status**: ✅ Implementada
- **Contexto**: Auth precisa de acesso síncrono à rede para login/refresh. Outbox pattern não se aplica a auth.
- **Decisão**: Auth é a ÚNICA feature que acessa rede diretamente via httpClient. Todas as demais features de domínio (clientes, sessões, billing) DEVEM seguir outbox pattern.
- **Consequência**: `src/features/auth/` contém httpClient e authService com fetch direto. Demais features usam Repository → Outbox → Sync Engine.

---

## DECISION-005: UI Inventory Congelado

- **Data**: 2026-02-13
- **Status**: ✅ Ativa
- **Contexto**: Projeto possui 6 componentes oficiais em `src/ui/` (Button, Card, AppText, InputField, Badge, SplashAnimated) + primitivos Tamagui. Risco de duplicação por agentes.
- **Decisão**: Componentes UI estão congelados. Proibido criar novos sem aprovação explícita. Extensão incremental (nova prop/variant) é permitida. Duplicações (Button2, LoginButton) são proibidas.
- **Consequência**: Agentes 03, 04, 06 devem consultar `docs/ui-kit/ui-inventory.md` antes de gerar UI. Telas consomem `src/ui/*` como primeira opção.

---

## DECISION-006: Dark Mode Desabilitado

- **Data**: 2026-02-14
- **Status**: ✅ Ativa
- **Contexto**: Figma não possui design dark mode. Dispositivos em dark mode causavam renderização incorreta.
- **Decisão**: Tema forçado `'light'` em `_layout.tsx` (`const appTheme = 'light' as const`). Não implementar dark mode sem Figma aprovado.
- **Consequência**: `useColorScheme()` importado mas não utilizado para theming. DarkTheme não importado de `@react-navigation/native`.

---

## DECISION-007: Card com backgroundColor Hardcoded

- **Data**: 2026-02-14
- **Status**: ✅ Ativa
- **Contexto**: Token `$card` do Tamagui RC 2.0.0-rc.12 não resolvia corretamente dentro de `styled()`, resultando em card transparente.
- **Decisão**: Card.tsx usa `backgroundColor: '#FFFFFF'` hardcoded temporariamente. Sem variantes de padding (conflito com prop nativa). Padding fixo `$6`.
- **Consequência**: Quando Tamagui estabilizar, migrar para `$card` token. Card não tem border/shadow — diferenciação visual via `marginTop` negativo (overlap no header).

---

## DECISION-008: SplashAnimated usa StyleSheet.create (exceção)

- **Data**: 2026-02-14
- **Status**: ✅ Ativa
- **Contexto**: SplashAnimated renderiza como overlay **sobre** o TamaguiProvider — styled() do Tamagui requer o provider ativo.
- **Decisão**: SplashAnimated é o ÚNICO componente autorizado a usar `StyleSheet.create`. Usa react-native-reanimated para animação. Cores hardcoded (#274160, #FFFFFF) para independência do theme provider.
- **Consequência**: Exceção documentada. Não serve como precedente para outros componentes.

---

## DECISION-009: Input e Button Height 56px / Radius $3

- **Data**: 2026-02-14
- **Status**: ✅ Ativa
- **Contexto**: Design exige consistência visual entre input e button.
- **Decisão**: InputField height=56, borderRadius=$3 (8px). Button lg height=56, borderRadius=$3 (8px). Ambos matching.
- **Consequência**: Toda nova interação de formulário deve seguir height 56px para consistência.
