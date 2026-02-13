# Estado Atual do Projeto — Gestão Índigo

> Atualizado em: 2026-02-13
> Commit base: pós-migração Tamagui + auth bootstrap

---

## 1. Visão Geral

| Item | Status |
|------|--------|
| Expo SDK | 54 |
| React Native | 0.81.5 |
| React | 19.1.0 |
| TypeScript | 5.9.2 (strict: true) |
| New Architecture | ✅ Habilitada |
| Tamagui | 2.0.0-rc.12 (ativo) |
| StyleSheet.create | ❌ Deprecado — não usar |
| Auth | ✅ Implementada (login, logout, refresh, SecureStore) |
| Offline-first | Arquitetura definida, implementação pendente |
| Backend | API externa (repo separado) — httpClient conectado |

---

## 2. Pacotes Instalados (Tamagui)

| Pacote | Versão | Propósito |
|--------|--------|-----------|
| `tamagui` | 2.0.0-rc.12 | UI kit completo (superset de @tamagui/core) |
| `@tamagui/config` | 2.0.0-rc.12 | Disponível (não importado atualmente — tipos RC incompatíveis com shorthands) |
| `@tamagui/font-inter` | 2.0.0-rc.12 | Fonte Inter (.otf) |
| `@tamagui/babel-plugin` | 2.0.0-rc.12 | Otimização do compilador |
| `@expo-google-fonts/sora` | 0.4.2 | Fonte Sora (300/400) |

---

## 3. Arquivos de Configuração Tamagui

| Arquivo | Propósito |
|---------|-----------|
| `babel.config.js` | Expo preset + @tamagui/babel-plugin |
| `src/styles/tokens.ts` | createTokens — paleta Indigo, Slate, espaçamentos, radius |
| `src/styles/fonts.ts` | Inter (body) + Sora (heading) |
| `src/styles/themes.ts` | lightTheme + darkTheme com tokens semânticos |
| `src/styles/tamagui.config.ts` | createTamagui + type declaration |
| `src/styles/index.ts` | Barrel exports |

---

## 4. Componentes UI Implementados

| Componente | Path | Variantes |
|------------|------|-----------|
| **Button** | `src/ui/Button/` | default, outline, secondary, ghost, destructive + sizes sm/md/lg |
| **Card** | `src/ui/Card/` | padding: none, sm, md, lg |
| **AppText** | `src/ui/Text/` | pageTitle, cardTitle, label, body, muted |
| **InputField** | `src/ui/InputField/` | label + error states |
| **Badge** | `src/ui/Badge/` | default, secondary, destructive, outline, success |

Padrão por componente: 3 arquivos (`<Nome>.tsx` + `<Nome>.types.ts` + `index.ts`).
**Não existe mais `.styles.ts`** — estilos ficam em `styled()` dentro do `.tsx`.

---

## 5. Fontes

| Fonte | Uso | Pesos | Fonte pkg |
|-------|-----|-------|-----------|
| **Inter** | Body ($body) | 300–700, default 400 | @tamagui/font-inter |
| **Sora** | Headings ($heading) | 300–400, default 300 | @expo-google-fonts/sora |

Regra: headings usam peso 300-400 (light). **Nunca bold para títulos.**

---

## 6. Tokens Principais

- **Primary**: `$indigo500` (#2B4970)
- **Radius pill**: `$pill` (9999)
- **Space default**: `true` = 16px
- **Size default**: `true` = 44px (altura de botão)
- Paleta completa: Indigo (50-900), Slate (50-950), Status (destructive, success, warning)

---

## 7. Temas

| Tema | Background | Text | Primary | Card |
|------|-----------|------|---------|------|
| **Light** | #FFFFFF | #0F172A | #2B4970 | #FFFFFF |
| **Dark** | #0F172A | #F8FAFC | #5A80A2 | #1E293B |

---

## 8. Features (Domínio)

### Auth (✅ Implementada)
| Arquivo | Propósito |
|---------|-----------|
| `src/features/auth/types.ts` | `AuthUser`, `AuthSession`, `LoginPayload`, `LoginResponse` |
| `src/features/auth/storage.ts` | SecureStore: save/get/clear session (`auth_session_v1`) |
| `src/features/auth/store.ts` | Zustand: status, session, bootstrap, setSession, clearSession, logout |
| `src/features/auth/httpClient.ts` | HTTP client com auto-refresh de token + race condition protection |
| `src/features/auth/authService.ts` | `login()`, `logout()`, `me()`, `validateSession()` |
| `src/features/auth/useAuthBootstrap.ts` | Hook que restaura sessão do SecureStore no app mount |
| `src/config/env.ts` | Valida `EXPO_PUBLIC_API_BASE_URL` do `.env` |
| `src/__debug__/testLogin.ts` | Script de teste manual de login |

### Vazias (estrutura de pastas apenas)
- `src/features/session/hooks/` — sessões clínicas
- `src/features/billing/hooks/` — faturamento
- `src/features/client/hooks/` — clientes

---

## 9. Data Layer

- `src/data/db/initDb.ts` — `getDb()` + `initDb()` que executa `SCHEMA_SQL`
- `src/data/db/schema.ts` — Schema SQL real: tabelas `terapeuta` + `cliente` + índice `idx_cliente_nome`
- `src/data/repositories/` — vazio
- `src/data/sync/` — vazio (outbox + sync engine)
- `src/data/models/` — vazio
- `src/data/mappers/` — vazio

---

## 10. Próximos Passos

1. ~~Implementar schema SQL~~ ✅ (terapeuta + cliente)
2. ~~Auth bootstrap~~ ✅ (login/logout/refresh/SecureStore)
3. Criar Zod schemas em `src/shared/` (para validação de inputs)
4. Implementar primeiro repository com outbox (ex: ClienteRepository)
5. Criar sync engine (`src/data/sync/`)
6. Implementar feature completa (ex: clientes — CRUD + tela)
7. Tela de login consumindo authService
8. Criar telas no Expo Router consumindo hooks
