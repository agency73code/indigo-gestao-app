# UPDATE: Core Governance Rules — Gestão Índigo

> Prompt de atualização executado em 2026-02-12.
> Estas regras foram aplicadas ao agente principal em `.github/copilot-instructions.md`.

---

## Regras adicionadas

1. **Auto-análise obrigatória** — analisar estado atual antes de qualquer resposta
2. **Backend não existe neste projeto** — é API externa (repo separado)
3. **Anti-duplicação** — verificar existência antes de criar, nunca gerar v2/copy
4. **Referência cruzada** — respeitar decisions-log, current-state, contracts
5. **Modo evolutivo** — adaptar automaticamente quando stack mudar
6. **Modo pipeline** — guiar uso correto dos agentes por etapas
7. **Segurança global** — nunca logar tokens, nunca gerar código inseguro
8. **Ambiguidade = parar** — listar conflito e pedir decisão antes de gerar

---

## Status

✅ Aplicado ao `.github/copilot-instructions.md` (seções 14–21)
✅ Todas as regras passam a reger todos os agentes do projeto.
