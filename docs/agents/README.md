# Agents — Gestão Índigo

> Sistema de agentes para desenvolvimento do projeto.
> Cada agente tem escopo definido, regras claras e formato de output padronizado.

---

## Índice

| # | Agente | Arquivo | Quando Usar |
|---|--------|---------|-------------|
| 01 | **Core Architecture Rules** | [01-core-architecture.agent.md](01-core-architecture.agent.md) | Validar se proposta respeita arquitetura. "Onde colocar isso?" |
| 02 | **Feature Spec** | [02-feature-spec.agent.md](02-feature-spec.agent.md) | Decompor feature em artefatos técnicos antes de codar |
| 03 | **UI Kit Builder** | [03-ui-kit-builder.agent.md](03-ui-kit-builder.agent.md) | Criar/ajustar componentes em `src/ui/` |
| 04 | **Screen Builder** | [04-screen-builder.agent.md](04-screen-builder.agent.md) | Construir telas no Expo Router (`app/`) |
| 05 | **Hook Orchestrator** | [05-hook-orchestrator.agent.md](05-hook-orchestrator.agent.md) | Construir hooks em `src/features/**/hooks/` |
| 06 | **Architecture & PR Reviewer** | [06-architecture-pr-reviewer.agent.md](06-architecture-pr-reviewer.agent.md) | Revisar código antes de merge |

---

## Pipeline: como desenvolver uma feature

A ordem recomendada para implementar qualquer feature nova:

```
   ┌─────────────────────────────────────────────────────────┐
   │                                                         │
   │  1. SPEC          "O que preciso construir?"            │
   │     Agent 02      Input: pedido em linguagem natural    │
   │                   Output: spec completa (telas, hooks,  │
   │                           schemas, outbox, done)        │
   │                                                         │
   ├─────────────────────────────────────────────────────────┤
   │                                                         │
   │  2. VALIDATE      "A spec respeita a arquitetura?"      │
   │     Agent 01      Input: spec gerada                    │
   │                   Output: aprovado / violações           │
   │                                                         │
   ├─────────────────────────────────────────────────────────┤
   │                                                         │
   │  3. BUILD (paralelo — ordem entre 3a/3b/3c é livre)     │
   │                                                         │
   │  3a. UI COMPONENTS                                      │
   │      Agent 03     Input: lista de componentes da spec   │
   │                   Output: arquivos em src/ui/            │
   │                                                         │
   │  3b. HOOKS                                              │
   │      Agent 05     Input: entidades e ações da spec      │
   │                   Output: hooks em src/features/         │
   │                                                         │
   │  3c. SCREENS                                            │
   │      Agent 04     Input: rotas, hooks e componentes     │
   │                   Output: telas em app/                  │
   │                                                         │
   ├─────────────────────────────────────────────────────────┤
   │                                                         │
   │  4. REVIEW        "O código segue as regras?"           │
   │     Agent 06      Input: arquivos gerados               │
   │                   Output: aprovado / violações           │
   │                                                         │
   └─────────────────────────────────────────────────────────┘
```

---

## Passo a passo detalhado

### Etapa 1 — Feature Spec (Agent 02)
**Input:** descrição da feature em linguagem natural
```
"Quero cadastro de clientes com busca por nome"
```
**Output:** documento de spec com: schemas Zod, tabelas SQL, outbox events, hooks, telas, componentes UI, estados, critérios de done.

**Salvar como:** arquivo de spec no projeto ou manter como referência na conversa.

---

### Etapa 2 — Validação Arquitetural (Agent 01)
**Input:** a spec completa gerada na etapa 1
**O que verificar:**
- Paths estão corretos?
- Fluxo UI → Hook → Repository → SQLite respeitado?
- Nenhuma camada pulada?
- Tudo funciona offline?

**Output:** aprovação ou lista de ajustes na spec.

---

### Etapa 3a — Componentes UI (Agent 03)
**Input:** lista de componentes da spec (ex: `ClienteCard`, `SearchBar`)
**Output:** 4 arquivos por componente em `src/ui/<Nome>/`
- `.types.ts`, `.styles.ts`, `.tsx`, `index.ts`

---

### Etapa 3b — Hooks (Agent 05)
**Input:** entidade + ações da spec (ex: `Cliente` com CRUD + search)
**Pré-requisito:** schema Zod e repository devem existir (ou serem criados junto)
**Output:** hook em `src/features/<mod>/hooks/` + barrel export

---

### Etapa 3c — Telas (Agent 04)
**Input:** rota + qual hook consumir + quais componentes UI usar
**Pré-requisito:** hooks e componentes devem existir
**Output:** tela completa em `app/` com estados cobertos

---

### Etapa 4 — Review (Agent 06)
**Input:** todos os arquivos gerados nas etapas 3a/3b/3c
**Output:** review com violações (se houver) ou aprovação

---

## Regra de ouro

> **Nenhum agente pode violar a arquitetura definida no
> [copilot-instructions.md](../../.github/copilot-instructions.md).**
>
> Se houver conflito entre uma solicitação e as regras,
> as regras vencem. Sempre.

---

## Diagrama de dependências entre agentes

```
Pedido do usuário
       │
       ▼
  ┌─────────┐
  │ Agent 02 │  Feature Spec
  │  (spec)  │
  └────┬─────┘
       │ spec
       ▼
  ┌─────────┐
  │ Agent 01 │  Core Architecture (validação)
  │ (valida) │
  └────┬─────┘
       │ spec aprovada
       ▼
  ┌────┴────┐──────────┐
  │         │          │
  ▼         ▼          ▼
Agent 03  Agent 05  Agent 04
(UI)      (Hooks)   (Telas)
  │         │          │
  └────┬────┘──────────┘
       │ código gerado
       ▼
  ┌─────────┐
  │ Agent 06 │  PR Reviewer
  │ (review) │
  └─────────┘
       │
       ▼
    ✅ Merge
```
