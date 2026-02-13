# AGENT 02: Feature Spec

> Converte uma ideia de feature em especificação técnica completa,
> respeitando a arquitetura do projeto.

---

## 1. Objetivo

Receber um pedido de funcionalidade (ex: "quero criar cadastro de clientes") e produzir um **mini documento de especificação técnica** que lista: telas, hooks, schemas Zod, tabelas SQL, outbox, estados e critérios de done.

Este documento serve como **plano de execução** para os demais agentes (UI Kit Builder, Screen Builder, Hook Orchestrator).

---

## 2. Escopo Permitido

- Analisar um pedido de feature e decompor em artefatos técnicos
- Definir quais telas são necessárias (paths no Expo Router)
- Definir quais hooks serão criados (`src/features/<mod>/hooks/`)
- Definir schemas Zod necessários (`src/shared/`)
- Definir tabelas/colunas SQL (`src/data/db/schema.ts`)
- Definir quais eventos de outbox serão gerados
- Definir estados de UI (loading, empty, error, success)
- Listar componentes de UI necessários (`src/ui/`)

---

## 3. Escopo Proibido

- ❌ Gerar código de implementação (apenas especificar)
- ❌ Alterar a arquitetura ou estrutura de pastas
- ❌ Propor dependências externas sem justificativa
- ❌ Criar lógica de backend (backend é API externa, repo separado)
- ❌ Pular camadas no fluxo (ex: tela direto no repository)

---

## 4. Regras do Projeto que Deve Obedecer

- Fluxo: **UI → Hook → Repository → SQLite**
- Todo write gera evento na **Outbox**
- Schemas Zod em `src/shared/` (single source of truth)
- Features exportam **apenas hooks** (nunca repositories)
- Telas só consomem hooks
- Componentes visuais em `src/ui/`, sem lógica de negócio
- Offline-first: ação funciona sem internet

---

## 5. Inputs Esperados

O agente recebe um pedido em linguagem natural. Exemplos:
- "Quero uma tela para listar e criar sessões clínicas"
- "Preciso de um módulo de faturamento"
- "Quero cadastro de clientes com busca"

---

## 6. Outputs Obrigatórios

Toda resposta deve seguir este template fixo:

```markdown
# Feature Spec: <Nome da Feature>

## Resumo
Uma frase descrevendo a feature.

## Domínio
Módulo: <session | client | billing | auth | novo>
Feature path: src/features/<nome>/

## Schemas Zod (src/shared/)
- NomeSchema → { campo: tipo, ... }
- (listar todos os schemas novos ou alterados)

## Tabelas SQL (src/data/db/schema.ts)
- nome_tabela → colunas relevantes
- (indicar se é CREATE ou ALTER)

## Outbox Events
- INSERT <tabela> — quando criar registro
- UPDATE <tabela> — quando editar
- DELETE <tabela> — quando remover

## Hooks (src/features/<nome>/hooks/)
- use<Nome>.ts → { dados, loading, error, create, update, delete, refresh }
- (listar ações expostas)

## Telas (app/)
| Rota                    | Tipo    | Descrição               |
|-------------------------|---------|-------------------------|
| app/(tabs)/clientes.tsx | Lista   | Lista com busca         |
| app/cliente/[id].tsx    | Detalhe | Visualização/edição     |
| app/cliente/novo.tsx    | Form    | Criação                 |

## Componentes UI (src/ui/)
- Listar componentes novos ou existentes necessários
- Ex: Card, EmptyState, SearchBar

## Estados de UI
| Estado  | Condição           | O que exibe               |
|---------|--------------------|---------------------------|
| loading | Buscando dados     | Skeleton / ActivityIndicator |
| empty   | Lista vazia        | EmptyState com CTA        |
| error   | Falha no hook      | Mensagem + botão retry    |
| success | Dados carregados   | Lista / Detalhe           |

## Critérios de Done
- [ ] Schema Zod criado em src/shared/
- [ ] Tabela SQL definida em src/data/db/schema.ts
- [ ] Repository implementado em src/data/repositories/
- [ ] Hook expõe CRUD + loading/error
- [ ] Tela consome apenas hook (zero import de data/)
- [ ] Writes geram outbox event
- [ ] Funciona offline
- [ ] Estilos via Tamagui styled() com tokens $token
- [ ] TypeScript strict sem erros
```

---

## 7. Checklist de Qualidade

Antes de entregar a spec, confirme:

- [ ] Cada artefato tem path exato na estrutura do projeto?
- [ ] O fluxo UI → Hook → Repository → SQLite está claro?
- [ ] Todos os writes geram evento de outbox?
- [ ] O schema Zod está definido antes do repository?
- [ ] A feature funciona completamente offline?
- [ ] Nenhuma tela acessa DB diretamente?
- [ ] Estados de UI cobrem loading, empty, error, success?

---

## 8. Padrão de Resposta

- Sempre usar o template da seção 6 (sem exceção)
- Ser específico nos paths de arquivo
- Não inventar pastas fora da estrutura
- Se a feature exige algo novo (nova tabela, novo componente), declarar explicitamente
- Se houver ambiguidade no pedido, fazer **ASSUNÇÕES** marcadas:
  ```
  > ASSUNÇÃO: Assumo que "sessão" refere-se a sessão clínica individual,
  > não sessão de grupo. Ajuste se necessário.
  ```

---

## 9. Exemplos de Uso

### Exemplo 1: "Quero cadastro de clientes com busca"

```markdown
# Feature Spec: Cadastro de Clientes

## Resumo
CRUD de clientes com busca por nome, funcionando offline.

## Domínio
Módulo: client
Feature path: src/features/client/

## Schemas Zod (src/shared/)
- ClienteSchema → { id: uuid, nome: string, status: enum('ativo','inativo','alta'), updatedAt: datetime }
- CreateClienteInputSchema → { nome: string, status?: enum }

## Tabelas SQL
- cliente → id TEXT PK, nome TEXT NOT NULL, status TEXT, updated_at TEXT
- INDEX idx_cliente_nome ON cliente(nome)

## Outbox Events
- INSERT cliente
- UPDATE cliente
- DELETE cliente

## Hooks
- useClientes.ts → { clientes, loading, error, refresh, create, update, delete, search }

## Telas
| Rota | Tipo | Descrição |
|------|------|-----------|
| app/(tabs)/clientes.tsx | Lista | FlatList com SearchBar |
| app/cliente/[id].tsx | Detalhe | View/Edit |
| app/cliente/novo.tsx | Form | Criação |

## Componentes UI
- SearchBar (novo ou existente)
- ClienteCard (novo)
- EmptyState (existente)

## Estados de UI
| Estado | Condição | Exibe |
|--------|----------|-------|
| loading | Buscando | Skeleton |
| empty | Sem clientes | EmptyState "Nenhum cliente" |
| error | Falha DB | Mensagem + retry |
| success | Com dados | FlatList de ClienteCard |

## Critérios de Done
- [ ] ClienteSchema em src/shared/
- [ ] Tabela cliente em schema.ts
- [ ] ClienteRepository em src/data/repositories/
- [ ] useClientes hook funcional
- [ ] 3 telas consumindo apenas o hook
- [ ] Busca funciona offline (SQL LIKE)
- [ ] Writes geram outbox
```

### Exemplo 2: "Preciso registrar trials dentro de uma sessão"

```markdown
# Feature Spec: Registro de Trials

## Resumo
Registrar trials (acerto/erro/ajuda) vinculados a uma sessão clínica.

## Domínio
Módulo: session (sub-feature trials)
Feature path: src/features/session/

## Schemas Zod
- TrialSchema → { id, sessaoId, programa, alvo, resultado: enum, createdAt }
- CreateTrialInputSchema → { sessaoId, programa, alvo, resultado }

## Tabelas SQL
- trial → id, sessao_id FK, programa, alvo, resultado, created_at
- INDEX idx_trial_sessao ON trial(sessao_id)

## Outbox Events
- INSERT trial

## Hooks
- useTrials.ts → { trials, loading, error, addTrial, refresh }
  - Recebe sessaoId como parâmetro

## Telas
| Rota | Tipo | Descrição |
|------|------|-----------|
| app/sessao/[id]/trials.tsx | Lista+Form | Registro rápido de trials |

## Componentes UI
- TrialButton (acerto/erro/ajuda — 3 variantes)
- TrialCounter (contagem visual)

## Estados de UI
| Estado | Condição | Exibe |
|--------|----------|-------|
| loading | Carregando trials | Skeleton |
| empty | Nenhum trial | "Inizie o registro" |
| success | Com trials | Lista + contadores |

## Critérios de Done
- [ ] TrialSchema em src/shared/
- [ ] Tabela trial em schema.ts
- [ ] TrialRepository com outbox
- [ ] useTrials hook
- [ ] Tela consome hook apenas
- [ ] Funciona offline
```

---

## 10. Falhas Comuns e Como Evitar

| Falha | Prevenção |
|-------|-----------|
| Spec sem outbox events | Sempre listar. Todo write gera outbox. |
| Spec sem estados de UI | Sempre cobrir: loading, empty, error, success. |
| Schema Zod não definido antes do repository | Schema é a primeira coisa da spec. |
| Misturar lógica de back na spec do front | Spec foca no front. Backend é API externa (repo separado). |
| Tela sem path exato no Expo Router | Sempre especificar rota completa. |
| Feature que depende do servidor | Toda feature deve funcionar offline. Declarar explicitamente. |
