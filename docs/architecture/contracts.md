# Contracts — Gestão Índigo

> Contratos tipados e interfaces entre camadas.
> Referência cruzada para agentes (copilot-instructions.md §17).

---

## 1. Componente UI (src/ui/)

### Contrato de Arquivos
Cada componente em `src/ui/<Nome>/` **DEVE** ter:

| Arquivo | Obrigatório | Conteúdo |
|---------|-------------|----------|
| `<Nome>.tsx` | ✅ | `styled()` do Tamagui + variantes |
| `<Nome>.types.ts` | ✅ | Interface de props + tipos de variantes |
| `index.ts` | ✅ | Barrel export |
| `<Nome>.styles.ts` | ❌ PROIBIDO | Não existe mais com Tamagui |

### Contrato de Imports
```
src/ui/ pode importar de:
  ✅ tamagui (styled, primitivos)
  ✅ src/styles/ (se necessário para tokens avançados)
  ❌ src/data/
  ❌ src/features/
  ❌ src/core/
  ❌ react-native (View, Text — usar Tamagui)
```

### Contrato de styled()
```typescript
// Padrão obrigatório
export const NomeComponente = styled(Primitivo, {
  name: 'NomeComponente',     // obrigatório para devtools
  // estilos base com tokens $token
  variants: {
    variant: {
      primary: { ... },       // cada variante usando tokens
    },
  } as const,                 // as const para type safety
  defaultVariants: {
    variant: 'primary',
  },
});
```

---

## 2. Hook (src/features/**/hooks/)

### Contrato de Retorno
Todo hook **DEVE** retornar:
```typescript
interface UseXReturn {
  dados: T[];           // ou T | null para detalhe
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  // + ações de mutação (create, update, delete)
}
```

### Contrato de Imports
```
src/features/ pode importar de:
  ✅ src/data/repositories/
  ✅ src/shared/ (Zod schemas)
  ✅ src/utils/
  ❌ src/ui/
  ❌ src/data/db/ (direto)
  ❌ src/core/stores/ (preferir dependency injection)
```

### Contrato de Validação
- Todo `create` e `update` **DEVE** chamar `Schema.parse(input)` antes de `repo.create()`
- Falha de validação → `setError(message)`, nunca throw sem catch

---

## 3. Repository (src/data/repositories/)

### Contrato de Interface
```typescript
interface BaseRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
}
```

### Contrato de Outbox
- Todo `create`, `update`, `delete` **DEVE** chamar `outbox.enqueue()` após SQL
- Formato do evento: `{ type: 'INSERT'|'UPDATE'|'DELETE', table, payload, timestamp }`

### Contrato de Imports
```
src/data/repositories/ pode importar de:
  ✅ src/data/db/ (getDb)
  ✅ src/data/mappers/
  ✅ src/data/sync/ (outbox)
  ✅ src/shared/ (tipos)
  ✅ src/utils/
  ❌ src/ui/
  ❌ src/features/
  ❌ src/core/
```

---

## 4. Tela (app/)

### Contrato de Imports
```
app/ pode importar de:
  ✅ src/features/**/hooks/ (via barrel)
  ✅ src/ui/ (componentes visuais)
  ✅ src/core/ (providers, stores globais)
  ✅ src/styles/ (config Tamagui, se necessário)
  ❌ src/data/ (qualquer subpasta)
  ❌ SQL, fetch, outbox direto
```

### Contrato de Estados
Toda tela de listagem **DEVE** cobrir:

| Estado | Renderiza |
|--------|-----------|
| `loading === true` | Skeleton ou ActivityIndicator |
| `error !== null` | Mensagem + botão retry |
| `dados.length === 0` | EmptyState com CTA |
| `dados.length > 0` | FlatList com componentes de src/ui/ |

---

## 5. Tokens e Temas

### Contrato de Tokens
- Cor **NUNCA** hardcoded — usar `$tokenName`
- Espaçamento via tokens: `$1`=4, `$2`=8, `$3`=12, `$4`=16, `$6`=24, `$8`=32
- Radius: `$pill`=9999 (botões), `$5`=16 (cards), `$3`=8 (inputs)
- Fonte body: `$body` (Inter)
- Fonte heading: `$heading` (Sora, peso 300-400)

### Contrato de Temas
Temas devem definir **todos** os tokens semânticos:
```
background, color, primary, primaryForeground,
secondary, secondaryForeground, muted, mutedForeground,
accent, accentForeground, destructive, destructiveForeground,
card, cardForeground, borderColor, inputBackground,
placeholderColor, shadowColor, success
```

---

## 6. Zustand (src/core/stores/)

### Contrato de Escopo
Zustand é **APENAS** para estado global mínimo:
- ✅ Auth state (token, user, isAuthenticated)
- ✅ Sync status (lastSync, isSyncing, pendingCount)
- ❌ Dados de domínio (clientes, sessões, trials)
- ❌ Cache de listas
- ❌ Estado de UI

---

## 7. Fluxo de Dados (A Lei)

```
┌──────────┐     ┌──────────┐     ┌──────────────┐     ┌─────────┐
│   Tela   │ ──→ │   Hook   │ ──→ │  Repository   │ ──→ │  SQLite │
│  (app/)  │     │(features)│     │(data/repos)   │     │ (data/db)│
└──────────┘     └──────────┘     └──────────────┘     └─────────┘
                                         │
                                         ▼
                                  ┌──────────────┐
                                  │    Outbox     │
                                  │  (data/sync)  │
                                  └──────────────┘
                                         │
                                         ▼
                                  ┌──────────────┐     ┌──────────┐
                                  │  Sync Engine  │ ──→ │API externa│
                                  │  (data/sync)  │     │(repo sep) │
                                  └──────────────┘     └──────────┘
```

**Nenhuma seta pode ser invertida. Nenhuma camada pode ser pulada.**

---

## Visualização Interativa

Para visualização completa do fluxo offline-first com estados de sincronização, abra:
📊 [flow-architecture.html](./flow-architecture.html)
