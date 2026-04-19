# Security Policy — DAOIA

> This file lists the non-negotiable security rules for DAOIA, and how to report a vulnerability. Everything in this repository is **experimental and pre-audit**; **do not use any part of it with real funds**.

---

## Project status

- No mainnet deployment.
- No audited contracts.
- No token has been issued, sold, or distributed.
- Any address or contract mentioned in this repo is **testnet-only** until explicitly stated otherwise in an official release.

---

## Non-negotiable rules

These rules are enforced on all contributions, including AI-assisted ones.

### Smart contracts

1. **No mainnet deployment without a human external audit.** No exception.
   At minimum two recognized firms (e.g. Trail of Bits, OpenZeppelin, Cantina) must review production contracts before any mainnet deployment.
2. **Audited libraries only** for cryptographic / financial primitives: OpenZeppelin Contracts v5, Safe SDK, wagmi/viem. Custom cryptography is not written in this repository.
3. **Tests are mandatory.** Every smart contract ships with Foundry tests; minimum 80% coverage, plus explicit tests for edge cases (overflow, reentrancy, unauthorized access, replay).
4. **No AI audit substitutes a human audit** for production code.

### Policy Engine (level C — financial / irreversible actions)

Level-C actions obey rules that **cannot be relaxed**:
- Transaction parameters (recipient, amount, calldata, deadline) are frozen at vote time, hashed on-chain at approval.
- Execution is only possible between `T_start` and `T_end` encoded in the vote.
- Recipient address and maximum amount are immutable — never a percentage or a dynamic formula.
- A unique nonce prevents re-execution.
- Mandatory simulation (eth_call / Tenderly) before the actual signature.
- Final hash check: any drift on any parameter aborts and raises an alert.

### AI agents

1. **Agents never recommend a vote.** They summarize, simulate, or argue both sides — they never say "vote for" or "vote against".
2. **No agent can modify its own configuration or permissions.**
3. **No agent can disable the Policy Engine, the Timelock, or the Safe.**
4. **No agent can execute a level-C action without a valid on-chain proposal hash** and a successful pre-execution simulation.

### Secrets & keys

1. No private key, mnemonic, or API key is ever committed. `.env.example` contains placeholders only.
2. `gitleaks` runs as a pre-commit hook on every developer machine.
3. Production signing (when applicable) goes through HSM or MPC, never raw keys in application memory.

### Governance & sybil resistance

1. Human Passport is integrated from the MVP, not added later.
2. Light participation (voting, reading, clicking) is never rewarded in liquid tokens.
3. A community kill-switch can freeze agents or the whole system via an emergency vote in under 2 hours.

---

## Scope of this security policy

This policy covers:
- Smart contracts in `contracts/`.
- Frontend code in `frontend/`.
- Backend and agent services in `backend/`.
- Deployment scripts in `scripts/`.
- CI/CD configuration in `.github/`.

Out of scope (for now):
- The documents in `docs/` (strategic / product docs).
- Third-party infrastructure we do not operate.

---

## Reporting a vulnerability

Until a dedicated disclosure channel (e.g. an Immunefi program) is set up in Phase 3:

1. **Do not open a public GitHub issue** for a security problem.
2. Contact the maintainer privately. A dedicated security contact will be published in this file before Phase 2 testnet opens.
3. Please give us a reasonable window (typically 30 days) to acknowledge and address the issue before any public disclosure.

We will credit responsible disclosure in the changelog, and will define a formal bug bounty structure once the project has a testnet public release.

---

## AI-assisted development disclosure

Parts of this repository are developed with the help of AI coding assistants (primarily Claude Code). All AI-generated code is reviewed line by line by a human contributor before commit, and human accountability is not transferred to the AI. Any concern about AI-introduced vulnerabilities should be reported through the same channel as any other security issue.

---

## Version

This security policy is versioned alongside the repository. The rules above apply to every branch until a new version explicitly supersedes them.

Last review: 2026-04-19.
