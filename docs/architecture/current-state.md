# Estado Atual do Projeto — Gestão Índigo

> Atualizado em: 2026-02-14
> Commit base: pós-migração Tamagui + auth screens completas + splash animation

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
| Auth Screens | ✅ 5 telas (login, forgot-password, email-sent, reset-password, success) |
| Auth Hooks | ✅ useLogin, useForgotPassword, useResetPassword |
| Splash Animation | ✅ react-native-reanimated custom overlay |
| Offline-first | Arquitetura definida, implementação pendente |
| Backend | API externa (repo separado) — httpClient conectado |
| Dark Mode | ❌ Forçado light — Figma dark não existe ainda |

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
| **Card** | `src/ui/Card/` | Simplificado: bg #FFFFFF, borderRadius $5, padding $6, sem variantes de padding |
| **AppText** | `src/ui/Text/` | pageTitle, cardTitle, label, body, muted |
| **InputField** | `src/ui/InputField/` | label + error states + rightElement (password toggle) |
| **Badge** | `src/ui/Badge/` | default, secondary, destructive, outline, success |
| **SplashAnimated** | `src/ui/SplashAnimated/` | Animação de splash: logo fade-in → card slide-up → fade-out |

Padrão por componente: 3 arquivos (`<Nome>.tsx` + `<Nome>.types.ts` + `index.ts`).
**Não existe mais `.styles.ts`** — estilos ficam em `styled()` dentro do `.tsx`.
**SplashAnimated** usa StyleSheet (exceção documentada — renderiza antes do TamaguiProvider).

### Regras de UI (CONGELADO)

- **Inventário oficial**: `docs/ui-kit/ui-inventory.md`
- **NÃO criar** novo componente UI sem aprovação explícita do usuário.
- **NÃO duplicar**: sem `Button2`, `NewButton`, `LoginButton`, etc.
- **NÃO criar UI dentro de features** (`src/features/`) ou telas (`app/`).
- Preferir **extensão incremental** (adicionar variant/prop) sobre criação.
- Telas consomem `src/ui/*` como primeira opção. Primitivos Tamagui apenas para layout.

---

## 5. Fontes

| Fonte | Uso | Pesos | Fonte pkg |
|-------|-----|-------|-----------|
| **Inter** | Body ($body) | 300–700, default 400 | @tamagui/font-inter |
| **Sora** | Headings ($heading) | 300–400, default 300 | @expo-google-fonts/sora |

Regra: headings usam peso 300-400 (light). **Nunca bold para títulos.**

Font scale (fonts.ts):
- fontSize: $1=12, $2=14, $3=16, $4=18, $5=20, $6=24, $7=28, $8=32, $9=36
- lineHeight: $1=16, $2=20, $3=22, $4=24, $5=28, $6=32, $7=36, $8=40, $9=44

---

## 6. Tokens Principais

- **Primary**: `#274160` (Indigo — background das telas, header, botões)
- **screenBackground**: `#F7FAFC` (light) / `#0D1520` (dark)
- **Card bg**: `#FFFFFF` hardcoded (Tamagui $card token instável no RC)
- **Input bg**: `#FAFAFA`
- **Radius**: `$pill`=9999, `$5`=16 (cards), `$3`=8 (inputs, buttons)
- **Space default**: `true` = 16px
- **Input/Button height**: 56px (matching)
- Paleta completa: Indigo (50-900), Slate (50-950), Status (destructive, success, warning)

---

## 7. Temas

| Tema | Background | screenBackground | Text | Primary | Card |
|------|-----------|-----------------|------|---------|------|
| **Light** | #274160 | #F7FAFC | #274160 | #274160 | #FFFFFF |
| **Dark** | placeholder | #0D1520 | placeholder | #274160 | placeholder |

**Dark mode forçado OFF** (`_layout.tsx: const appTheme = 'light'`).
Figma dark não existe — não implementar sem aprovação.

---

## 8. Features (Domínio)

### Auth (✅ Implementada — Backend-Ready)
| Arquivo | Propósito |
|---------|-----------|
| `src/features/auth/types.ts` | `AuthUser`, `AuthSession`, `LoginPayload`, `LoginResponse` |
| `src/features/auth/storage.ts` | SecureStore: save/get/clear session (`auth_session_v1`) |
| `src/features/auth/store.ts` | Zustand: status, session, bootstrap, setSession, clearSession, logout |
| `src/features/auth/httpClient.ts` | HTTP client com auto-refresh de token + race condition protection |
| `src/features/auth/authService.ts` | `login()`, `logout()`, `me()`, `validateSession()`, `forgotPassword()`, `resetPassword()` |
| `src/features/auth/useAuthBootstrap.ts` | Hook que restaura sessão do SecureStore no app mount |
| `src/features/auth/hooks/useLogin.ts` | Hook de login: Zod validation, loading/error, authService.login |
| `src/features/auth/hooks/useForgotPassword.ts` | Hook esqueci senha: Zod validation, loading/error, authService.forgotPassword |
| `src/features/auth/hooks/useResetPassword.ts` | Hook reset senha: Zod validation (min 8 + match), authService.resetPassword |
| `src/config/env.ts` | Valida `EXPO_PUBLIC_API_BASE_URL` do `.env` |
| `src/__debug__/testLogin.ts` | Script de teste manual de login |

### Auth Screens (✅ Implementadas)
| Tela | Rota | Hook | Status |
|------|------|------|--------|
| Login | `/(auth)/login` | `useLogin` | ✅ Backend-ready |
| Esqueci Senha | `/(auth)/forgot-password` | `useForgotPassword` | ✅ Backend-ready |
| Email Enviado | `/(auth)/email-sent` | — (estática + navegação) | ✅ Pronta |
| Redefinir Senha | `/(auth)/reset-password` | `useResetPassword` | ✅ Backend-ready |
| Sucesso | `/(auth)/success` | — (estática + navegação) | ✅ Pronta |

### Splash Animation (✅ Implementada)
| Arquivo | Propósito |
|---------|-----------|
| `src/ui/SplashAnimated/SplashAnimated.tsx` | Animação: logo fade-in → move up → card slide-up → overlay fade-out |
| `app/_layout.tsx` | Integração: mostra SplashAnimated overlay sobre rotas reais |

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
3. ~~Auth screens~~ ✅ (5 telas: login, forgot, email-sent, reset, success)
4. ~~Auth hooks~~ ✅ (useLogin, useForgotPassword, useResetPassword)
5. ~~Splash animation~~ ✅ (react-native-reanimated custom overlay)
6. Criar Zod schemas em `src/shared/` (para validação de inputs de domínio)
7. Implementar primeiro repository com outbox (ex: ClienteRepository)
8. Criar sync engine (`src/data/sync/`)
9. Implementar feature completa (ex: clientes — CRUD + tela)
10. Dark mode (quando Figma estiver pronto)
