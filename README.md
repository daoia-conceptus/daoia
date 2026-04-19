# DAOIA

> **AI-augmented DAO where agents help humans understand, vote, and execute.**

DAOIA is an experimental governance stack for DAOs where AI agents **structure the debate without driving it**: they summarize proposals, simulate financial impact, and lay out the best arguments on both sides — but never recommend a vote. Once the community has voted, a separate family of execution agents carries out the decision under a strict on-chain policy engine.

The goal is not "agents that execute". The goal is **governance simple and fast enough that normal people actually participate**.

> Project codename: `DAOIA` (provisional). Token ticker: `$GOVAI` (placeholder, subject to legal review before any TGE).
>
> Source: [github.com/daoia-conceptus/daoia](https://github.com/daoia-conceptus/daoia)

---

## Status

| | |
|---|---|
| Phase | 1 — Public showcase (in progress) |
| Network | None yet (Base Sepolia when contracts land) |
| Production | Not deployed. Not audited. Do not use with real funds. |
| License | [MIT](LICENSE) |

This is a solo-founder project in its earliest setup stage. Code is being built in public. A dual-license setup may be considered later depending on business strategy.

---

## What's in this repo

```
DAOIA/
├── CLAUDE.md           # Permanent project memory (internal, FR)
├── README.md           # This file
├── ROADMAP.md          # Five phases, solo-founder plan
├── DECISIONS.md        # Technical decision log
├── SECURITY.md         # Non-negotiable security rules & disclosure policy
├── docs/               # Strategic & product documents (source of truth)
│   ├── projet_dao_agents_ia_v0.3.md
│   ├── use_cases_loop_produit_v2.md
│   ├── roadmap_solo_claude_code.md
│   └── guide_claude_code.md
├── contracts/          # Solidity smart contracts (Foundry) — WIP
├── frontend/           # Next.js 15 dApp — WIP
├── backend/            # Agent services (TypeScript/Node) — WIP
├── scripts/            # Deployment & utility scripts — WIP
└── .github/            # CI/CD (later)
```

## Architecture — four layers

1. **Frontend dApp** — Next.js 15 App Router + TypeScript + Tailwind v4 + RainbowKit.
2. **On-chain (Base)** — `$GOVAI` ERC-20Votes, OpenZeppelin Governor + Timelock, Safe multisig, `AgentRegistry`, `ActionExecutor`.
3. **Policy Engine (off-chain)** — three-level execution model (A autonomous / B human-approved / C strict mandate with on-chain parameter hash). The non-negotiable safety layer of the system.
4. **AI agents** — sandboxed workers calling an LLM (Anthropic Claude in v0), with RAG on DAO context and a whitelist of tools.

Two families of agents:
- **Governance agents** (Sage, Simulator, Advocate, Notifier, Delegate Assistant) — help the individual user understand and vote.
- **Execution agents** (Marketing, Dev Ops, Treasury, Moderation, Research) — act on behalf of the community under policy constraints.

A French-language strategic spec lives in [`docs/projet_dao_agents_ia_v0.3.md`](docs/projet_dao_agents_ia_v0.3.md); an English whitepaper (v0.5) is planned in Phase 1.

---

## Non-negotiable rules

- AI agents **never recommend a vote**. They provide context, not direction.
- Sybil resistance (Human Passport) is a day-one requirement, not a patch.
- **No mainnet deployment without a human audit.** Period.
- Light participation (voting, reading, clicking) is **never** rewarded in liquid tokens. Reputation, badges, and progressive access only.
- Level-C actions (financial / irreversible) run on frozen parameters with an on-chain hash and a mandatory pre-execution simulation.

See [SECURITY.md](SECURITY.md) for the full list and disclosure policy.

---

## Getting started

The repo is currently in scaffolding. Once the first workspaces land (`frontend/`, `contracts/`, `backend/`), install instructions will appear here. The stack will use **pnpm workspaces** to coordinate them.

Required tooling (local dev):
- Node.js 20+
- pnpm 9+
- [Foundry](https://getfoundry.sh/) for smart contracts
- A `.env` file based on [`.env.example`](.env.example) — never commit `.env`.

---

## Contributing

Contributions are welcome once the first prototype ships. For now, the best way to follow along is to watch the repo and read the documents in [`docs/`](docs/).

Security disclosures: see [SECURITY.md](SECURITY.md).

---

## License

[MIT](LICENSE) © 2026 DAOIA contributors. A dual-license may be considered at a later stage depending on project strategy; contributors should expect the MIT license to apply to their contributions unless explicitly stated otherwise.
