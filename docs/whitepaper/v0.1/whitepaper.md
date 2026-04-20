---
title: DAOIA Whitepaper
version: 0.1
status: draft
date: 2026-04-20
---

# DAOIA Whitepaper

**Version 0.1 — Draft — 2026-04-20**

> This is a working draft. Four sections are fully written (Abstract, Problem, Principles, Target market). Eight sections are placeholders to be expanded in v0.2. All changes tracked via public commits on [github.com/daoia-conceptus/daoia](https://github.com/daoia-conceptus/daoia).

---

## Table of contents

1. [Abstract](#1-abstract)
2. [Problem](#2-problem)
3. [Principles](#3-principles)
4. [Architecture overview](#4-architecture-overview)
5. [Agent families](#5-agent-families)
6. [Policy engine](#6-policy-engine)
7. [Governance flow](#7-governance-flow)
8. [Safety & guardrails](#8-safety--guardrails)
9. [Target market (phase 1-2)](#9-target-market-phase-1-2)
10. [Roadmap](#10-roadmap)
11. [Open questions](#11-open-questions)
12. [References & acknowledgments](#12-references--acknowledgments)

---

## 1. Abstract

**DAOIA is a governance layer for DAOs.** It uses AI agents to help members read proposals, simulate decisions, and execute what's been voted — but never to vote on their behalf.

The target: generalist DAOs — communities, grants, cooperatives, culture-focused collectives — where participation is limited not by indifference, but by the cognitive cost of informed voting.

The agents are organized in two families: **Governance agents** help members understand what's being decided; **Execution agents** carry out what the DAO has voted on. No agent has autonomous decision-making authority. Every action is logged on-chain.

DAOIA is currently in Phase 0 (setup). A testnet prototype is in development. This document is version 0.1 and will evolve with public commits as the project matures.

The bet underlying the project: decentralization is about *who decides*, not *who reads*. By automating the reading, the summarization, the simulation, and the execution — while keeping the decision strictly human — DAOIA aims to restore what made decentralized governance valuable in the first place: diverse, informed collective judgment.

---

## 2. Problem

### 2.1. Governance participation is broken in most DAOs

In most DAOs, fewer than 15% of members vote on any given proposal. Across generalist DAOs, median participation rates typically sit between 5% and 15%. Leading DAOs like Aave and MakerDAO reach above 22% on critical governance votes, but this is the exception, not the rule.

This is not a problem of engagement or motivation. It is a problem of cost.

### 2.2. The hidden cost of informed voting

Reading a governance proposal seriously means:
- Understanding the technical or financial mechanics
- Weighing the trade-offs for the community
- Identifying who benefits and who loses
- Checking precedents and consistency with past decisions

For a single proposal, this can take 30 minutes to 3 hours, depending on complexity. For a delegate facing 10–20 active proposals at any time, informed voting becomes a second job.

### 2.3. The compensation: delegation to experts

The current dominant pattern is delegation. Members assign their voting power to a small number of trusted delegates, who do the reading and decide. In theory, this scales governance. In practice, it reproduces the problem of centralized authority: the DAO has a ruling class (the delegates) and a passive majority (the token holders).

The DAO remains procedurally decentralized. Its governance, in substance, is not.

### 2.4. The failure of autonomous AI agents

A parallel movement argues AI agents can close the gap by taking decisions themselves — voting, allocating, acting. This is the opposite bet from DAOIA's. If the agent decides, the agent is the principal, and the human is a passenger. The DAO has recentralized authority in its infrastructure.

DAOIA rejects this path.

### 2.5. The unexplored path: agents that help humans decide, but never decide

The bet DAOIA is built on: humans are not too slow to vote — they are too overloaded to vote *informed*. If the cognitive cost of participation can be reduced (by agents doing the reading, simulating, watching, executing), participation becomes tractable. And the decision stays human, where it structurally must remain if the DAO is to be decentralized.

This is the gap DAOIA aims to fill.

---

## 3. Principles

DAOIA is built on seven publicly committed principles, detailed in [daoia.io/principles](https://daoia.io/principles):

**These principles are not positioning statements. They are operational constraints that shape every design decision in DAOIA.** When agent capabilities are scoped, when policies are written, when architecture trade-offs are made — these principles are the filter. A design that violates them is rejected, not debated.

1. **The vote stays human.** Agents read, summarize, simulate, execute — but never vote. No matter how confident the model, the decision is made by a human.

2. **Agents answer to the DAO.** No autonomous authority over governance. Low-impact actions under voted policy; high-impact always requires a vote. An agent that exceeds its policy is stopped, not apologized for.

3. **Trade-offs are not hidden.** Every proposal surfaces costs, risks, and affected parties. The absence of a trade-off in a summary is treated as a bug, not a feature.

4. **Transparency by default.** Bugs, failures, limitations, and financial details are public as soon as disclosure doesn't expose users. Responsible disclosure policy: private notification → 90-day patch window → public post-mortem.

5. **Economic power is not governance power.** Quadratic voting, holder caps, and sybil resistance from day one. Long-term goal: separating token ownership from voting rights through mechanisms like soulbound governance tokens or contribution-based voting.

6. **Neutral on content, not on ethics.** DAOIA does not push, filter, or favor proposals based on their political content. Exception: proposals funding human rights violations or broadly illegal activities are flagged as out of scope.

7. **The project must survive the founder.** Multi-sig keys distributed to core contributors from the earliest feasible stage. Governance transfers progressively to the DAO itself. If the founder steps away, the project keeps running.

These principles are hard to change. Any amendment requires a DAO vote once the DAO is live. Until then, changes are made in public commits on [github.com/daoia-conceptus/daoia](https://github.com/daoia-conceptus/daoia).

---

## 4. Architecture overview

*To be expanded in v0.2. Overview of the four-layer architecture (Agent Runtime, Policy Engine, On-Chain Contracts, Interface Layer), and how the agents, policies, and votes interact.*

---

## 5. Agent families

*To be expanded in v0.2. Detailed specification of each of the 10 agents (Sage, Simulator, Advocate, Notifier, Delegate Assistant, Marketing, DevOps, Treasury, Moderation, Research) including capabilities, limits, and failure modes.*

---

## 6. Policy engine

*To be expanded in v0.2. How policies are authored, voted on by the DAO, stored on-chain, and enforced at agent execution time. Policy versioning and rollback.*

---

## 7. Governance flow

*To be expanded in v0.2. End-to-end technical walkthrough of a proposal, from submission through Sage summarization, Simulator impact modeling, Advocate context building, member voting, and Treasury/Marketing execution.*

---

## 8. Safety & guardrails

*To be expanded in v0.2. Detailed treatment of the audit log layer, responsible disclosure process (90-day window), human override mechanisms, and agent rate limits. References Section 3 (Principles) and Section 6 (Policy Engine).*

---

## 9. Target market (phase 1-2)

### 9.1. Primary target: generalist DAOs

DAOIA's phase 1 and 2 deployment prioritizes **generalist DAOs** — communities, culture collectives, grant programs, and digital cooperatives. These organizations are characterized by:
- Proposals that are narrative and human-centered (budget allocations, partnerships, community events, identity decisions)
- Low technical complexity per proposal (no smart contract upgrades, no MEV risk, no protocol-level parameters)
- Participation rates typically between 4% and 15%, with high member disengagement despite genuine interest
- Open communities accessible via Discord, Farcaster, or Telegram, where observing and contacting members is possible without protocol-level introductions

Examples include Friends With Benefits, Bankless DAO, Cabin, Seed Club, PartyDAO, Moloch-style grants DAOs, and the long tail of generalist DAOs forming on Aragon, Tally, Snapshot, and Station.

### 9.2. Why generalist DAOs first

For a solo founder without an established network in DeFi protocols, targeting generalist DAOs offers four structural advantages:

1. **Accessible terrain.** Generalist DAOs are open by design. Joining their Discord, lurking, and eventually proposing a test is possible without introductions or gatekeeping.

2. **Technical simplicity of Sage v0.** Summarizing a narrative proposal in plain language is an order of magnitude less demanding than understanding a Solidity contract upgrade with risk implications. Sage v0 becomes shippable in 3-4 months rather than 8-12.

3. **Validated pain point.** Participation rates in generalist DAOs are publicly documented and measurable. The impact of a tool that doubles informed participation is direct and observable.

4. **Open product space.** Snapshot and Tally handle voting. No serious tool handles *comprehension* of proposals — the surfacing of trade-offs, the simulation of impact, the summarization. The competitive landscape is open.

### 9.3. Target market (phase 3+): technical DAOs via accumulated references

Technical DAOs (DeFi protocols, infrastructure) are a phase 3+ target. The strategy is analogous to Stripe (starting with independent developers, eventually serving Amazon), Notion (starting with freelancers, eventually Microsoft), and Linear (starting with early-stage startups, eventually Spotify and Vercel): start where traction is accessible, then move upmarket with proof.

The implicit metric: within 12 months of the testnet launch, having at least 2-3 generalist DAOs actively using DAOIA will be considered sufficient validation to begin approaching technical protocols with concrete references.

For the full rationale and alternatives considered, see [DECISIONS.md](https://github.com/daoia-conceptus/daoia/blob/main/DECISIONS.md) entry `2026-04-20 — Cible prioritaire phase 1-2 : DAOs généralistes`.

---

## 10. Roadmap

*To be expanded in v0.2. Detailed scope and indicative timeline for Phase 0 (setup, current), Phase 1 (testnet prototype), Phase 2 (closed alpha with generalist DAOs), Phase 3 (open beta), and Phase 4 (mainnet and tokenomics activation).*

---

## 11. Open questions

*To be expanded in v0.2. The hypotheses DAOIA is testing but has not yet validated: can agents summarize without losing important information? Is 90-day disclosure window the right balance? How do we measure whether DAOIA actually improves informed participation? And others.*

---

## 12. References & acknowledgments

*To be expanded in v0.2. Sources for participation data, inspirations from governance theory (Ostrom, Buterin, Meyer), and acknowledgments to contributors.*
