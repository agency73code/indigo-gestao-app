# UI Inventory — Gestão Índigo

> Atualizado em: 2025-06-14
> Status: **CONGELADO** — novos componentes exigem aprovação explícita.

---

## 1. Política de Uso

### 1.1 Regra de consumo
- Telas (`app/`) **devem** usar `src/ui/*` como primeira opção.
- Primitivos Tamagui são permitidos **apenas** para layout/container simples (YStack, XStack, ScrollView).
- Se um componente `src/ui/*` cobre o caso de uso, **é proibido** usar o primitivo equivalente.

### 1.2 Regra anti-duplicação
- **NÃO** criar componente novo se já existe equivalente em `src/ui/`.
- **NÃO** criar variações: `Button2`, `NewButton`, `LoginButton`, `PrimaryButton`.
- **NÃO** criar componente UI dentro de `src/features/` ou `app/`.
- Se faltar prop/variant, **estender** o componente existente (ver seção 4).

### 1.3 Criação de novo componente
Só é permitida quando:
1. Nenhum componente existente cobre o caso de uso (nem com extensão).
2. O usuário autoriza explicitamente.
3. Passa por review do Agent 06 (PR Reviewer).

---

## 2. Primitivos Tamagui Permitidos

Importar direto de `'tamagui'`. Não criar wrappers sem aprovação.

| Categoria | Componentes | Uso típico |
|-----------|-------------|------------|
| **Layout** | `XStack`, `YStack`, `ZStack`, `Stack`, `ScrollView` | Containers, espaçamento, agrupamento |
| **Texto** | `Text`, `SizableText`, `Paragraph`, `H1`–`H6` | Texto inline sem variante semântica do app |
| **Input** | `Input`, `TextArea`, `Label` | Dentro de composições (InputField já encapsula) |
| **Interação** | `Button`, `Switch`, `Checkbox`, `RadioGroup`, `Select`, `Slider` | Quando `src/ui/Button` não cobre o caso |
| **Overlay** | `Sheet`, `Dialog`, `Popover`, `Tooltip` | Modais, bottom sheets, menus |
| **Visual** | `Avatar`, `Image`, `Separator`, `Card` | Elementos visuais simples |
| **Utilitário** | `Theme`, `useTheme`, `Spinner` | Theming, loading states |

> **Atenção**: Para `Button`, `Card`, `Text` e `Input` — preferir SEMPRE as versões `src/ui/*` que já possuem as variantes do design system.

---

## 3. Componentes Oficiais (`src/ui/`)

### 3.1 Button — `@/src/ui/Button`
| Prop | Valores |
|------|---------|
| `variant` | `default`, `outline`, `secondary`, `ghost`, `destructive` |
| `size` | `sm`, `md`, `lg` |
| `disabled` | `boolean` |
| `onPress` | callback |
| `children` | `string` |

Compound: `ButtonFrame` (XStack) + `ButtonLabel` (Text).
- borderRadius: `$3` (8px) — matching InputField
- lg height: 56px — matching InputField
- Font sizes: sm=$1(12), md=$2(14), lg=$3(16)

### 3.2 Card — `@/src/ui/Card`
| Prop | Valores |
|------|---------|
| `padding` | Fixo `$6` (sem variantes — conflito com prop nativa resolvido) |

Styled `YStack` com bg `#FFFFFF` hardcoded (Tamagui $card instável no RC), borderRadius `$5`, sem border/shadow.
Telas usam `marginTop` negativo para overlap no header.

### 3.3 AppText — `@/src/ui/Text`
| Prop | Valores |
|------|---------|
| `variant` | `pageTitle`, `cardTitle`, `label`, `body`, `muted` |

`pageTitle`/`cardTitle` usam Sora (heading, peso 400). `label`/`body`/`muted` usam Inter (body).
- pageTitle: fontSize $7(28), lineHeight 36
- cardTitle: fontSize $5(20), lineHeight 28
- label: fontSize $2(14), weight 500
- body: fontSize $2(14), weight 400
- muted: fontSize $1(12), color $mutedForeground

### 3.4 InputField — `@/src/ui/InputField`
| Prop | Valores |
|------|---------|
| `label` | `string` |
| `error` | `string` (opcional) |
| `placeholder` | `string` |
| `value` | `string` |
| `onChangeText` | callback |
| `disabled` | `boolean` |
| `keyboardType` | KeyboardTypeOptions |
| `secureTextEntry` | `boolean` |
| `rightElement` | `React.ReactNode` (ex: password toggle) |

Label acima, Input, mensagem de erro abaixo. `focusStyle` muda borda.
- height: 56px — matching Button lg
- borderRadius: `$3` (8px) — matching Button
- fontSize: `$2` (14px)

### 3.5 Badge — `@/src/ui/Badge`
| Prop | Valores |
|------|---------|
| `variant` | `default`, `secondary`, `destructive`, `outline`, `success` |
| `children` | `string` |

Compound: `BadgeFrame` (XStack) + `BadgeLabel` (Text). Pill shape.

### 3.6 SplashAnimated — `@/src/ui/SplashAnimated`
| Prop | Valores |
|------|---------|
| `onAnimationComplete` | callback (chamado ao fim da animação) |

Animação de transição splash → tela real. Usa react-native-reanimated.
Sequência: logo fade-in + scale → logo move up → card branco slide-up com curva SVG → overlay fade-out.
**Exceção**: usa StyleSheet.create (renderiza antes do TamaguiProvider).

### 3.7 Avatar — `@/src/ui/Avatar`
| Prop | Valores |
|------|---------|
| `source` | `string \| number` (URL ou require) |
| `size` | `sm` (40), `md` (44), `lg` (56), `xl` (72) |
| `fallbackInitials` | `string` (iniciais exibidas quando imagem falha) |
| `accessibilityLabel` | `string` |

Wrapper de `@tamagui/Avatar` com fallback de iniciais em circle. Pill borderRadius.

### 3.8 BottomTabBar — `@/src/ui/BottomTabBar`
| Prop | Valores |
|------|---------|
| `state` | Bottom tab navigator state |
| `descriptors` | Tab descriptors |
| `navigation` | Tab navigation object |

Custom pill-shaped bottom tab bar. 343×64, white bg, space-between, paddingHorizontal 8.
Ícones: Home, Users, CloudUpload, User (lucide-react-native). Active: `$primary`, inactive: `$bottomNavInactiveIcon`.

### 3.9 StatusPill — `@/src/ui/StatusPill`
| Prop | Valores |
|------|---------|
| `status` | `allSent`, `sending`, `error`, `offline` |
| `count` | `number` (pendentes, para status `sending`) |

Pill de status de sincronização. Height 47px, paddingHorizontal 24.
4 estados visuais com ícone + dot + texto. Exibido no HomeHeader.

### 3.10 HomeHeader — `@/src/ui/HomeHeader`
| Prop | Valores |
|------|---------|
| `avatarSource` | `string` (URL da foto) |
| `userName` | `string` |
| `syncStatus` | `allSent \| sending \| error \| offline` |
| `syncCount` | `number` |
| `hasNotification` | `boolean` |
| `onNotificationPress` | callback |

Header da Home. Container h=172, bg `$headerBg` (primary), borderBottomRadius 45.
Avatar md + saudação dinâmica + botão notificação 38×38 + StatusPill.

### 3.11 QuickActions — `@/src/ui/QuickActions`
| Prop | Valores |
|------|---------|
| `onActionPress` | `(key: string) => void` |
| `onNewSessionPress` | callback |

Seção "Ações Rápidas" com 2 action cards (CalendarClock, Users) + CTA "Nova sessão" com Plus icon.
Cards: h=122, bg `$neutral200`, borderRadius 24 (literal), alignContent flex-end.
CTA: h=65, bg `$primary`, pill, ícone Plus com circle.

### 3.12 SessionCard — `@/src/ui/SessionCard`
| Prop | Valores |
|------|---------|
| `item` | `SessionItemData` |
| `onPress` | `(id: string) => void` |
| `showSeparator` | `boolean` |

Row com Avatar sm + nome + age + SpecialtyChip + dot + timeAgo + ChevronRight.
Usado dentro de RecentSessions na Home. Specialty chip via reusable `SpecialtyChip` component.

### 3.13 RecentSessions — `@/src/ui/RecentSessions`
| Prop | Valores |
|------|---------|
| `sessions` | `SessionItemData[]` |
| `onSessionPress` | `(id: string) => void` |

Seção "Últimas sessões" da Home. Container paddingHorizontal 22, marginTop 20, gap 10.
Title "Últimas sessões" Sora 18. ListCard bg `$sessionListBg`, borderRadius 16.
Renderiza lista de `SessionCard` com separadores.

### 3.14 SpecialtyChip — `@/src/ui/SpecialtyChip`
| Prop | Valores |
|------|---------|
| `label` | `string` (nome da especialidade) |
| `isOverflow` | `boolean` (quando `true`, renderiza como "+N" com estilo neutro) |

Chip de especialidade com cores dinâmicas. Height 20px, pill shape, fontSize 10.
Cores via `getSpecialtyColors()` de `src/utils/specialtyColors.ts` — 12 especialidades mapeadas.
Usado em SessionCard e ClientCard.

### 3.15 ClientCard — `@/src/ui/ClientCard`
| Prop | Valores |
|------|---------|
| `item` | `ClientItemData` |
| `onPress` | `(id: string) => void` |
| `maxChips` | `number` (default 2, máximo visível antes de "+N") |

Card de cliente: Avatar sm + nome (12px) + idade (right-aligned) + row de SpecialtyChips com overflow "+N" + ChevronRight 20px.
CardFrame: bg `$sessionListBg`, borderRadius 16, padding 10.

### 3.16 ClientsHeader — `@/src/ui/ClientsHeader`
| Prop | Valores |
|------|---------|
| `isOnline` | `boolean` |
| `searchText` | `string` |
| `onSearchChange` | `(text: string) => void` |

Header da tela Clientes. Container h=172, bg `$headerBg`, borderBottomRadius 45.
TopRow: IconCircle 38×38 (Users 24px) + TitleText "Clientes" (Sora 18) + compact status pill (h=26, dot verde/laranja + texto).
SearchContainer: h=47, pill, bg `$headerNotifBg`, Search icon 20px + Input placeholder.

---

## 4. Política de Extensão

Quando falta uma prop ou variant, o fluxo é:

```
Detectar necessidade → Verificar este inventário → Propor extensão → Implementar no src/ui/*
```

### Extensões permitidas (sem aprovação extra):
- Adicionar **variant** nova ao `variants` do `styled()` (ex: `warning` no Badge)
- Adicionar **prop** semântica ao componente (ex: `rightIcon` no InputField)
- Adicionar **size** nova (ex: `xl` no Button)

### Extensões que exigem aprovação:
- Mudar comportamento base do componente
- Remover variant existente
- Alterar tokens de referência
- Criar componente novo

### Exemplo: Adicionar `rightIcon` ao InputField
```
1. InputField.types.ts → adicionar `rightIcon?: React.ReactNode`
2. InputField.tsx → renderizar rightIcon dentro do container de input
3. Sem novo arquivo. Sem wrapper. Sem InputFieldWithIcon.
```

---

## 5. Mapeamento para Telas de Auth

### 5.1 Padrão Visual das Auth Screens
Todas as 5 telas seguem o mesmo padrão:
- `$screenBackground` como bg da tela
- Header area com `$primary` bg (30-40% da tela)
- Curva SVG de transição
- Card com `marginTop` negativo (overlap no header) + `zIndex: 1`
- Logo Indigo ao final do conteúdo

### 5.2 Login Screen — Componentes
| Elemento | Componente | Configuração |
|----------|-----------|--------------|
| Container da tela | `YStack` | `backgroundColor="$screenBackground"` |
| Header | `YStack` | `backgroundColor="$primary"` height=35% |
| Curva | `Svg` + `Path` | `react-native-svg` fill=primaryColor |
| Card do formulário | `Card` | `marginTop={-150}` `zIndex={1}` |
| Título | `AppText` | `variant="pageTitle"` |
| Subtítulo | `AppText` | `variant="body"` `color="$textSecondary"` |
| Campo Email | `InputField` | `keyboardType="email-address"` |
| Campo Senha | `InputField` | `secureTextEntry` + `rightElement` (Feather eye icon) |
| Link Recuperar | `Link` + `AppText` | `variant="body"` `fontWeight="600"` `color="$primary"` |
| Botão CTA | `Button` | `variant="default"` `size="lg"` |
| Logo | `Image` (RN) | `require('@/assets/logo/logo.indigo.png')` |
| Loading | Via `Button` | `disabled={loading}` + texto "Entrando..." |
| Feedback de erro | `AppText` | `variant="muted"` `color="$destructive"` |

### 5.3 Hook → Service → Backend (Login)
```
LoginScreen → useLogin() → authService.login() → httpClient.post('/auth/login')
                                    ↓
                            useAuthStore.setSession()
                                    ↓
                            SecureStore (persist)
```

> **NÃO criar**: `LoginButton`, `EmailInput`, `PasswordInput`, `LoginCard`, `LoginForm`.
> Usar os componentes oficiais com props adequadas.

---

## 6. Regras para Agentes

| Agente | Deve fazer |
|--------|-----------|
| **03 — UI Kit Builder** | Consultar este inventário ANTES de criar qualquer componente. Só estender existentes ou criar com aprovação. |
| **04 — Screen Builder** | Consumir `src/ui/*` primeiro. Nunca criar componentes dentro da feature ou tela. |
| **06 — PR Reviewer** | Verificar: duplicação, backend lock, tokens hardcoded, primitivo onde havia `src/ui/*`. |
