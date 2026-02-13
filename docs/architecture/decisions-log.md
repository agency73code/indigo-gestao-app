# Decisions Log — Gestão Índigo

> Registro formal de decisões arquiteturais. Cada entrada é imutável após merge.
> Agentes não podem sobrescrever decisões registradas aqui (ref: copilot-instructions.md §17).

---

## DECISION-001: Migração de StyleSheet.create para Tamagui

**Data:** 2025-07-14
**Status:** ✅ Implementada
**Autor:** Equipe Índigo

### Contexto
O projeto iniciou com `StyleSheet.create` + arquivo `.styles.ts` como padrão de estilos.
Com a necessidade de temas (light/dark), tokens tipados, fontes customizadas e variantes de componentes,
a abordagem foi revaliada.

### Decisão
Migrar **100% do sistema de estilos** para Tamagui:
- `styled()` substitui `StyleSheet.create`
- Tokens via `$token` (ex: `$primary`, `$4`, `$pill`) — nunca valor hardcoded
- Variantes via `variants` do `styled()` — nunca componente separado por variante
- Temas light/dark via TamaguiProvider
- Fontes configuradas no createTamagui (Inter body + Sora heading)
- **Não existe mais `.styles.ts`** — estilos ficam em `styled()` dentro do `.tsx`
- Componente UI = 3 arquivos: `.tsx` + `.types.ts` + `index.ts`

### Consequências
- Todos os agentes atualizados para referenciar Tamagui (não mais StyleSheet)
- `copilot-instructions.md` atualizado (seções 3, 6.2, 7, 8, 11, 12)
- Proibição formal de `StyleSheet.create` em qualquer código novo
- Proibição formal de arquivos `.styles.ts`
- Proibição de importar View/Text de react-native (usar Tamagui equivalentes)

### Pacotes Adicionados
- `tamagui` 2.0.0-rc.12
- `@tamagui/config` 2.0.0-rc.12
- `@tamagui/font-inter` 2.0.0-rc.12
- `@tamagui/babel-plugin` 2.0.0-rc.12
- `@expo-google-fonts/sora` 0.4.2

### Alternativas Consideradas
| Alternativa | Motivo da rejeição |
|-------------|-------------------|
| StyleSheet.create + tokens manuais | Sem temas, sem variantes tipadas, sem compilação |
| NativeWind / Tailwind | Proibido pela arquitetura (copilot-instructions §6.2) |
| Styled Components | Menos performance, sem compilação ahead-of-time |
| Unistyles | Menos ecossistema, sem componentes built-in |

---

## DECISION-002: Backend como API externa

**Data:** 2025-07-10
**Status:** ✅ Ativa
**Autor:** Equipe Índigo

### Contexto
O projeto é um app mobile offline-first. O backend existe em repositório separado.

### Decisão
- **Não existe** `src/backend/` neste projeto
- Comunicação com backend: `Repository → Outbox → Sync Engine → API externa`
- Front **nunca** faz fetch direto
- Regra aplicada em `copilot-instructions.md` §15

### Consequências
- Pasta `src/backend/` removida do projeto
- Todos os agentes instruídos a rejeitar código de servidor

---

## DECISION-003: Estrutura de pastas fixa

**Data:** 2025-07-10
**Status:** ✅ Ativa
**Autor:** Equipe Índigo

### Decisão
A estrutura de pastas definida em `copilot-instructions.md` §4 é **imutável**.
Novas pastas na raiz de `src/` só com justificativa arquitetural explícita e aprovação.

### Consequências
- Agentes recusam criar pastas fora da estrutura
- Anti-duplicação ativa (§16)

---

## DECISION-004: Auth Bootstrap — Login, Refresh, SecureStore

**Data:** 2026-02-13
**Status:** ✅ Implementada
**Autor:** Backend (repo externo, mergeado no front)

### Contexto
O backend subiu a primeira integração real com a API externa: autenticação completa
incluindo login, logout, refresh de token, e persistência via SecureStore.

### Decisão
Implementar auth diretamente em `src/features/auth/` com:
- **Zustand store** (`store.ts`): status (`loading`/`authenticated`/`unauthenticated`), session, bootstrap
- **SecureStore** (`storage.ts`): persistência segura da sessão (chave `auth_session_v1`)
- **httpClient** (`httpClient.ts`): HTTP client genérico com auto-refresh de token (singleton pattern para race condition)
- **authService** (`authService.ts`): `login()`, `logout()`, `me()`, `validateSession()`
- **useAuthBootstrap** (`useAuthBootstrap.ts`): hook que restaura sessão no mount do app
- **env** (`src/config/env.ts`): validação de `EXPO_PUBLIC_API_BASE_URL`
- **Schema SQL** (`src/data/db/schema.ts`): tabelas `terapeuta` + `cliente`

### Consequências
- `app/_layout.tsx` chama `useAuthBootstrap()` no mount
- `initDb()` agora executa `SCHEMA_SQL` (não mais placeholder com PRAGMA)
- httpClient faz fetch direto para a API (exceção à regra de outbox, justificada: auth é síncrono e não pode ser offline)
- Token armazenado **exclusivamente** via SecureStore (§6.3 cumprida)
- Zustand usado apenas para auth state (§5 OK — escopo mínimo)

### Nota arquitetural
O auth é a **única feature que acessa a rede diretamente** via httpClient.
Features de domínio (clientes, sessões, billing) devem seguir o outbox pattern:
`Hook → Repository → SQLite + Outbox → Sync Engine → API`
