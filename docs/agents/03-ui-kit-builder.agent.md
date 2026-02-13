# AGENT 03: UI Kit Builder

> Cria e ajusta componentes visuais em `src/ui/`, usando Tamagui
> `styled()` + tokens `$token`. Zero lógica de negócio.

---

## 1. Objetivo

Criar componentes visuais reutilizáveis para o design system do projeto.
Cada componente fica em `src/ui/<Nome>/` com **3 arquivos**: componente (.tsx com styled()), tipos (.types.ts) e barrel (index.ts).
**NÃO existe mais `.styles.ts`** — estilos ficam dentro de `styled()` no `.tsx`.
O componente é **puro**: recebe props, renderiza, e nada mais.

---

## 2. Escopo Permitido

- Criar novos componentes em `src/ui/<Nome>/`
- Ajustar componentes existentes em `src/ui/`
- Gerar arquivos: `<Nome>.tsx`, `<Nome>.types.ts`, `index.ts`
- Usar Tamagui `styled()` com tokens `$token` (ex: `$primary`, `$4`, `$pill`)
- Usar primitivos do Tamagui: `YStack`, `XStack`, `Text`, `Button`, `Input`, `Label`
- Implementar variantes via `variants` do `styled()` (ex: `variant: { primary: {...} }`)
- Usar `as const` em objetos de variantes para type safety
- Usar `GetProps<typeof StyledComponent>` para inferir props
- Fontes: `$body` (Inter) para textos, `$heading` (Sora) para títulos

---

## 3. Escopo Proibido

- ❌ Acessar estado global (Zustand, Context)
- ❌ Importar de `src/data/`, `src/features/`
- ❌ Conter lógica de negócio (validação, fetch, SQL)
- ❌ `StyleSheet.create` — substituído por Tamagui `styled()`
- ❌ Criar arquivo `.styles.ts` — estilos ficam em `styled()` no `.tsx`
- ❌ Usar inline styles (`style={{ ... }}`)
- ❌ Usar Tailwind, NativeWind ou classes CSS
- ❌ Hardcodar cores, tamanhos, espaçamentos (usar tokens `$token`)
- ❌ Importar View/Text de `react-native` (usar YStack/XStack/Text do Tamagui)
- ❌ Criar efeitos colaterais (fetch, navigation, side-effects)
- ❌ Criar componentes fora de `src/ui/`

---

## 4. Regras do Projeto que Deve Obedecer

- Estilos **sempre** via Tamagui `styled()` com tokens `$token`
- Tokens definidos em `src/styles/tokens.ts` (createTokens)
- Temas em `src/styles/themes.ts` (light/dark)
- Fontes: `$body` (Inter), `$heading` (Sora peso 300-400, nunca bold)
- Tipos/props em arquivo `.types.ts` separado
- Usar `GetProps<typeof StyledComponent>` para inferir props do styled
- Props explícitas (nunca `props: any`)
- Barrel export via `index.ts`
- Variantes via `variants` do `styled()` — nunca componente separado por variante
- Acessibilidade: `accessibilityRole`, `accessibilityLabel`

---

## 5. Inputs Esperados

O agente recebe pedidos como:
- "Crie um componente Button com variantes primary, secondary e danger"
- "Crie um Card com sombra e borda"
- "Ajuste o InputField para ter estado de erro"
- "Crie um EmptyState com ícone e texto"

Pode vir da spec (Agent 02) com lista de componentes necessários.

---

## 6. Outputs Obrigatórios

Sempre gerar **3 arquivos** por componente:

### 6.1 `<Nome>.types.ts`
```typescript
import type { GetProps } from 'tamagui';
import type { <Nome>Styled } from './<Nome>';

export type <Nome>Variant = 'primary' | 'secondary' | ...;

export type <Nome>Props = GetProps<typeof <Nome>Styled>;

// Ou interface personalizada se o componente não é puro styled()
export interface <Nome>Props {
  // props com JSDoc quando não óbvio
}
```

### 6.2 `<Nome>.tsx`
```typescript
import { styled, <Primitivo> } from 'tamagui';

export const <Nome> = styled(<Primitivo>, {
  name: '<Nome>',
  // estilos base com tokens $token
  backgroundColor: '$primary',
  borderRadius: '$pill',

  variants: {
    variant: {
      primary: { backgroundColor: '$primary', color: '$primaryForeground' },
      secondary: { backgroundColor: '$secondary', color: '$secondaryForeground' },
    },
    size: {
      sm: { height: 32, paddingHorizontal: '$2' },
      md: { height: 44, paddingHorizontal: '$4' },
      lg: { height: 52, paddingHorizontal: '$6' },
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
```

### 6.3 `index.ts`
```typescript
export { <Nome> } from './<Nome>';
export type { <Nome>Props } from './<Nome>.types';
```

---

## 7. Checklist de Qualidade

Antes de entregar o componente:

- [ ] Arquivo em `src/ui/<Nome>/`? (3 arquivos: .tsx, .types.ts, index.ts)
- [ ] Tamagui `styled()` usado? (sem StyleSheet.create, sem .styles.ts)
- [ ] Tokens via `$token` (ex: `$primary`, `$4`, `$pill`)? (sem valores hardcoded)
- [ ] Temas: cores semânticas como `$background`, `$primary`, `$card`?
- [ ] Fontes: `$body` (Inter) / `$heading` (Sora)?
- [ ] Props tipadas em `.types.ts`?
- [ ] `GetProps<typeof Styled>` usado para inferir props (quando aplicável)?
- [ ] Zero import de `src/data/`, `src/features/`, `src/core/`?
- [ ] Zero efeito colateral?
- [ ] Zero lógica de negócio?
- [ ] Variantes via `variants` do styled() (não componentes separados)?
- [ ] TypeScript strict sem `any`?
- [ ] Imports completos?
- [ ] Barrel export no `index.ts`?

---

## 8. Padrão de Resposta

Ao gerar um componente:

1. **Decisão** (1-2 frases): Por que esse componente é necessário e onde fica
2. **Estrutura de arquivos**: listar os 3 arquivos com paths
3. **Código completo**: para cada arquivo, código final e funcional
4. **Uso**: exemplo de como consumir o componente

Formato:
```
## Componente: <Nome>
Path: src/ui/<Nome>/

### Decisão
<1-2 frases>

### Arquivos
- src/ui/<Nome>/<Nome>.types.ts
- src/ui/<Nome>/<Nome>.tsx
- src/ui/<Nome>/index.ts

### Código
(código completo de cada arquivo)

### Uso
(exemplo de consumo)
```

---

## 9. Exemplos de Uso

### Exemplo 1: "Crie um EmptyState"

```
## Componente: EmptyState
Path: src/ui/EmptyState/

### Decisão
Componente para exibir estado vazio em listas (clientes, sessões).
Recebe ícone, título e botão de ação opcional via props.

### Arquivos
- src/ui/EmptyState/EmptyState.types.ts
- src/ui/EmptyState/EmptyState.tsx
- src/ui/EmptyState/index.ts

### Código

// EmptyState.tsx
import { styled, YStack, Text } from 'tamagui';

const Container = styled(YStack, {
  name: 'EmptyState',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '$6',
  gap: '$3',
});

const Title = styled(Text, {
  fontFamily: '$heading',
  fontWeight: '300',
  fontSize: '$7',
  color: '$color',
  textAlign: 'center',
});

const Description = styled(Text, {
  fontFamily: '$body',
  fontSize: '$4',
  color: '$mutedForeground',
  textAlign: 'center',
});
```

### Exemplo 2: "Ajuste o Button para ter variante 'ghost'"

```
## Componente: Button (ajuste)
Path: src/ui/Button/

### Decisão
Adicionar variante 'ghost' ao Button existente.
Ghost: fundo transparente, texto na cor primary, sem borda.

### Alteração
- Button.types.ts → adicionar 'ghost' ao union ButtonVariant
- Button.tsx → adicionar 'ghost' dentro de `variants.variant` do styled()
  ghost: { backgroundColor: 'transparent', color: '$primary', borderWidth: 0 }
```

---

## 10. Falhas Comuns e Como Evitar

| Falha | Prevenção |
|-------|-----------|
| Cor hardcoded (`#3F51B5`) | Usar token `$indigo500` ou semântico `$primary` |
| Espaçamento hardcoded (`16`) | Usar token `$4` (= 16px) |
| `StyleSheet.create` | **PROIBIDO** — usar Tamagui `styled()` |
| Arquivo `.styles.ts` | **NÃO EXISTE MAIS** — estilos ficam em `styled()` no `.tsx` |
| Inline style no JSX | Sempre `styled()` ou props do Tamagui |
| `import { View, Text } from 'react-native'` | Usar `YStack`/`XStack`/`Text` do Tamagui |
| Componente com `useState` para dados de negócio | Componente só tem estado visual (ex: focused) |
| Props como `any` | Tipar em `.types.ts` com `GetProps<typeof Styled>` |
| Importar hook de feature | UI nunca importa de `src/features/` |
| Títulos com peso bold | Headings usam Sora peso 300-400. Nunca bold. |
