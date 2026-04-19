# CLAUDE.md — Mémoire permanente du projet DAOIA

> Ce fichier est lu à chaque nouvelle session Claude Code. Il est la source de vérité de **l'état du projet, des conventions et des règles non négociables**.
>
> Langue de ce document : français (langue de travail interne). Le code et les docs publiques sont en anglais.

---

## État courant du projet

- **Dernière mise à jour :** 2026-04-19 22:02 CEST — pause en fin de session après étape 2.
- **Phase en cours :** Phase 1 — Vitrine publique (landing v1 en cours de construction).
- **Commit courant (HEAD local) :** `9819053` — `feat(frontend): self-host Geist Sans and Geist Mono via geist package`.
- **Commits locaux non pushés :** 3 — `b61ee9e` (hook husky), `8b159a1` (scaffold Next.js 16), `9819053` (Geist). À pousser en début de prochaine session.
- **Repo public :** https://github.com/daoia-conceptus/daoia
- **Prochaine étape prévue :** **Landing — étape 3 : tokens de design** (`globals.css` avec bloc `@theme` Tailwind v4 couvrant les 10 couleurs sémantiques, l'échelle typo, et la règle `@media (prefers-reduced-motion: reduce)`). Reprise du plan 6 étapes inchangé.
- **Progression de la landing v1 (6 étapes) :**
  - ✅ Étape 1 — scaffold Next.js 16 + TS + Tailwind v4 + App Router (`8b159a1`)
  - ✅ Étape 2 — self-host Geist Sans + Mono via package `geist` (`9819053`)
  - ⏳ Étape 3 — tokens de design
  - ⏳ Étape 4 — root layout (metadata, noindex, Vercel Analytics)
  - ⏳ Étape 5 — SiteHeader, SiteFooter, stub `/principles`
  - ⏳ Étape 6 — Hero + homepage + mise à jour `CLAUDE.md` + `DECISIONS.md`
- **Nom provisoire du projet :** DAOIA
- **Ticker token (placeholder) :** `$GOVAI` — à reconfirmer avant TGE après legal opinion.
- **Items Phase 0 encore à faire (en parallèle Phase 1, ne pas les oublier) :**
  1. Créer un Safe multisig projet sur Base Sepolia (wallet dédié DAOIA).
  2. Rédiger la page "principes constitutionnels non négociables" (version courte publiable, basée sur la section "Principes non négociables" de ce document).
  - *Handles publics **tous réservés ✅** : GitHub `daoia-conceptus`, domaine `daoia.io`, Discord `discord.gg/KmEs2QVk`, X `@daoiaprotocol`. Voir section "Identité & comptes".*
  - *Toolchain locale **installée ✅** : Node 24.14.1, pnpm 9.15.0, Foundry `forge 1.5.1-stable`, gitleaks 8.30.1.*
- **Dette de traçabilité à liquider en étape 6 (DECISIONS.md) :** révision Next.js 15 → 16, choix SVG brand inlinés en composants React, hook pre-commit PATH-augmenté pour shells non-login.

> **Règle :** cette section est mise à jour à chaque fin de session importante. Si tu reviens sur ce projet et que la date est vieille de plus de 7 jours, re-demande à l'utilisateur où on en est avant de supposer.

---

## Identité & comptes

### Canaux publics (réservés, 2026-04-19)

- **Domaine :** [daoia.io](https://daoia.io) — réservé sur Hostinger, pas encore déployé. Pointera vers la landing Next.js (Vercel) quand elle sera prête.
- **Discord :** [https://discord.gg/KmEs2QVk](https://discord.gg/KmEs2QVk) — invite permanent. CTA primaire de la landing.
- **X :** [@daoiaprotocol](https://x.com/daoiaprotocol) — handle officiel du projet.
- **GitHub :** [daoia-conceptus/daoia](https://github.com/daoia-conceptus/daoia) — repo public, branche par défaut `main`.

### Git & GitHub (infra de travail)

- **Git author (local) :** `conceptus <info@conceptus.be>` — configuré en global.
- **Organisation GitHub :** `daoia-conceptus` (placeholder `daoia-protocol` initialement prévu, abandonné avant tout push — voir `DECISIONS.md`).
- **Authentification Git/GitHub :** via **GitHub CLI** (`gh`). `gh auth setup-git` gère les credentials, donc **pas de PAT ni de SSH key** à maintenir manuellement pour ce repo. Le compte `gh` actif pour DAOIA est `daoia-conceptus` (l'utilisateur a aussi un compte GitHub personnel — ne pas confondre).
- **Remote :** `origin` pointe sur `https://github.com/daoia-conceptus/daoia.git`. `main` suit `origin/main`.
- **Push :** **jamais automatique** côté Claude Code. Toujours laisser l'utilisateur faire le `git push` lui-même, sauf demande explicite dans la session.

---

## Vision & pitch (3 lignes)

DAOIA est une **DAO augmentée par l'IA** où des agents aident les humains à **comprendre, voter et exécuter** les décisions collectives.
Le vrai produit n'est pas "des agents qui exécutent" — c'est **une gouvernance enfin assez simple et rapide pour que des gens normaux participent**.
Les agents structurent le débat et fournissent le contexte, ils ne disent jamais quoi voter.

---

## Principes non négociables

1. **Les agents structurent, ils ne décident pas.** Aucun agent ne dit "vote pour" ou "vote contre". Ils fournissent contexte, données, arguments — la décision reste 100% humaine.
2. **Sybil resistance dès le MVP.** Human Passport est la brique principale, intégrée dès le premier release. World ID reste expérimental.
3. **Jamais de mainnet sans audit humain.** Tout déploiement de smart contract sur une chaîne avec de la valeur réelle nécessite au minimum un audit par une firme externe reconnue (Trail of Bits, OpenZeppelin, Cantina). Pas d'exception, même si l'utilisateur le demande par erreur.
4. **Niveau C du Policy Engine = paramètres figés.** Pour toute action financière ou irréversible : paramètres déterministes, hash on-chain, fenêtre temporelle bornée, bénéficiaire et montant immuables, simulation obligatoire avant signature, vérification finale du hash.
5. **Pas de token liquide pour les actions légères.** Voter, lire, cliquer ne paient jamais en tokens liquides — sinon sybil farming garanti. Seuls badges (NFT non-transférables), réputation chiffrée et accès progressif récompensent la participation légère.
6. **Aucun secret dans le code.** Clés privées, API keys, mnémoniques → toujours via `.env` (jamais commit) ; `.env.example` ne contient que des placeholders non sensibles.
7. **Tests systématiques.** Tout smart contract a ses tests Foundry avec >80% de coverage avant commit. Un contrat sans tests n'est pas un contrat déployable.
8. **Build in public.** Tout le code est sur GitHub public dès le départ. Pas de code en silence pendant 6 mois.
9. **Kill switch communautaire.** L'architecture doit permettre de freezer un agent ou l'ensemble du système via un vote d'urgence en moins de 2h.
10. **Ne jamais improviser la sécurité crypto.** Libraries auditées par défaut : OpenZeppelin pour les contrats, Safe SDK pour le multisig, `wagmi`/`viem` côté frontend.

---

## Architecture cible (résumé 4 couches)

1. **Frontend dApp** — Next.js 15 (App Router) + TypeScript + Tailwind v4 + RainbowKit/wagmi/viem. Déploiement Vercel.
2. **On-chain (Base)** — Token `$GOVAI` ERC-20Votes, Governor + Timelock (OpenZeppelin v5), Safe multisig + Zodiac, `AgentRegistry`, `ActionExecutor` avec whitelist.
3. **Policy Engine & orchestration (off-chain)** — moteur de règles (OPA ou Cedar), task queue, event listener, audit log signé + hashé + ancré on-chain quotidiennement, interface human-in-the-loop pour approbations niveau B.
4. **Agents IA (workers isolés)** — LLM (Claude via Anthropic API en v0), RAG sur contexte DAO, sandbox Docker sans accès aux clés de prod, outils whitelistés.

> Détail complet : [`docs/projet_dao_agents_ia_v0.3.md`](docs/projet_dao_agents_ia_v0.3.md), sections 1 et 2.

### Les deux familles d'agents

- **Agents de gouvernance** (pour l'utilisateur individuel) : Sage, Simulator, Advocate, Notifier, Delegate Assistant.
- **Agents d'exécution** (pour la communauté) : Marketing, Dev Ops, Treasury, Moderation, Research.

### Trois niveaux d'exécution (Policy Engine)

- **A — Autonome** : actions non financières et non engageantes (ex : résumé, rapport). Exécution directe après contrôle.
- **B — Semi-autonome** : actions engageantes mais réversibles (ex : post au nom de la DAO, PR publique). Approbation humaine obligatoire.
- **C — Sous mandat strict** : actions financières ou irréversibles. Séquence pré-décidée, hashée on-chain, simulée, bornée dans le temps.

---

## Stack technique retenue (v0)

| Couche | Choix | Version |
|---|---|---|
| Monorepo | pnpm workspaces | pnpm 9+ |
| Frontend | Next.js App Router + TypeScript | 15.x |
| CSS | Tailwind | v4 |
| Wallet connect | RainbowKit + wagmi + viem | dernières stables |
| Smart contracts | Foundry + OpenZeppelin Contracts | Solidity 0.8.26+, OZ v5.x |
| Chaîne cible | Base Sepolia (testnet uniquement) | — |
| Backend agents | Node.js + TypeScript | Node 20+ |
| LLM provider (Sage v0) | Anthropic API (Claude) | mono-provider, multi plus tard |
| Qualité code | ESLint + Prettier (config Next.js par défaut) | — |
| Sécurité secrets | gitleaks en pre-commit (via husky) | — |
| Déploiement frontend | Vercel | — |

> Toute modification de la stack doit être tracée dans [`DECISIONS.md`](DECISIONS.md).

---

## Conventions de code

- **Langue du code et identifiants :** anglais (noms de variables, fonctions, commentaires de code).
- **Langue des docs publiques** (`README.md`, landing, whitepaper public) : anglais (français prévu plus tard).
- **Langue des docs internes** (`CLAUDE.md`, `DECISIONS.md`, notes, plans internes) : français.
- **Commits :** format [Conventional Commits](https://www.conventionalcommits.org/) en **anglais**. Exemples : `feat(frontend): add landing hero`, `chore(repo): initial scaffold`, `docs(roadmap): detail phase 2 milestones`.
- **Branches :** `main` protégée. Travail sur `feat/...`, `fix/...`, `chore/...`, `docs/...`.
- **Style :** ESLint + Prettier, config Next.js par défaut, pas de preset externe.
- **Smart contracts :** style Solidity de référence d'OpenZeppelin (natspec, events pour chaque action state-changing, custom errors plutôt que `require` string).
- **Tests :** Foundry pour les contrats (objectif >80% coverage). Tests unitaires frontend et backend dès qu'il y a de la logique non triviale.

---

## Ce que tu ne dois JAMAIS faire

1. **Déployer un contrat sur un mainnet**, même sur demande. Rappelle qu'un audit humain est obligatoire.
2. **Commit un secret** (clé privée, mnémonique, API key, token). Toujours via `.env`. `.env.example` = placeholders seulement.
3. **Faire un agent qui recommande un vote** ("vote pour", "vote contre", "je recommande"). Les agents fournissent, ne tranchent pas.
4. **Récompenser en token liquide une action légère** (vote simple, clic, lecture). Jamais.
5. **Improviser la crypto** (clés, signatures, multisig, randomness). Toujours via libs auditées.
6. **Désactiver, contourner ou simplifier** le Policy Engine, le Timelock, le Safe, ou la sybil resistance, même pour simplifier un dev.
7. **Coder sans tests** pour les smart contracts.
8. **Prendre une décision produit ou technique importante sans demander** à l'utilisateur et sans la consigner dans `DECISIONS.md`.
9. **Faire confiance à un audit IA** comme substitut à un audit humain externe sur des contrats qui géreront un jour de la valeur réelle.
10. **Ouvrir un PR ou pousser sur un remote** sans confirmation explicite de l'utilisateur.

---

## Sources documentaires (docs/)

Source de vérité pour toute question de vision, architecture, roadmap :

- [`docs/projet_dao_agents_ia_v0.3.md`](docs/projet_dao_agents_ia_v0.3.md) — document stratégique (architecture, Policy Engine, tokenomics, légal).
- [`docs/use_cases_loop_produit_v2.md`](docs/use_cases_loop_produit_v2.md) — use cases narrés, loop produit, métriques, anti-patterns.
- [`docs/roadmap_solo_claude_code.md`](docs/roadmap_solo_claude_code.md) — roadmap solo détaillée, phases 0 à 4, usage Claude Code.
- [`docs/guide_claude_code.md`](docs/guide_claude_code.md) — guide méthodologique pour cette collaboration.

> **Règle :** si une question touche à la vision, l'architecture, ou la roadmap — relis les `docs/` concernés avant de répondre ou d'implémenter. Ne paraphrase pas de mémoire, cite la source.

---

## Workflow par défaut pour chaque session

1. Lire ce `CLAUDE.md` en entier.
2. Relire la section "État courant du projet" ci-dessus et la comparer à `git log --oneline -20` pour détecter un écart.
3. Demander confirmation sur la prochaine tâche avant d'attaquer.
4. Décomposer la tâche en étapes et valider la structure avant de coder.
5. Commit fréquent (toutes les 30-45 min ou à chaque étape terminée) en Conventional Commits.
6. Mettre à jour `CLAUDE.md` (section "État courant") et `DECISIONS.md` (si décision technique) en fin de session.
