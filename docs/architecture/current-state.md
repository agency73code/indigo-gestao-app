# Estado Atual do Projeto — Gestão Índigo

> Atualizado em: 2025-07-14
> Commit base: pós-migração Tamagui

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
| Offline-first | Arquitetura definida, implementação pendente |
| Backend | API externa (repo separado) |

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

Todas as features estão **vazias** (apenas estrutura de pastas):

- `src/features/session/hooks/` — sessões clínicas
- `src/features/auth/hooks/` — autenticação
- `src/features/billing/hooks/` — faturamento
- `src/features/client/hooks/` — clientes

---

## 9. Data Layer

- `src/data/db/initDb.ts` — placeholder minimal (getDb + PRAGMA + WAL)
- `src/data/db/schema.ts` — existe, precisa de implementação
- `src/data/repositories/` — vazio
- `src/data/sync/` — vazio (outbox + sync engine)
- `src/data/models/` — vazio
- `src/data/mappers/` — vazio

---

## 10. Próximos Passos

1. Implementar schema SQL completo (`src/data/db/schema.ts`)
2. Criar Zod schemas em `src/shared/`
3. Implementar primeiro repository com outbox
4. Criar sync engine
5. Implementar feature completa (ex: clientes)
6. Criar telas no Expo Router consumindo hooks
