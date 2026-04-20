# ROADMAP — DAOIA (solo founder)

> Synthèse opérationnelle en 5 phases. Source détaillée : [`docs/roadmap_solo_claude_code.md`](docs/roadmap_solo_claude_code.md).
>
> **Principe directeur :** on ne peut pas construire la DAO complète seul. L'objectif des 3-4 premiers mois est d'arriver à un état où l'on peut attirer un cofondateur, des early users, et préparer une première levée. Ce fichier est un résumé — à chaque début de phase, relire la section correspondante du document source pour le détail.

---

## État actuel

- **Date :** 2026-04-20
- **Phase en cours :** Phase 1 **COMPLÉTÉE** sur le sous-livrable "landing page" (jalon de sortie atteint). Les items annexes de Phase 1 (whitepaper v0.5, animation Discord, posting X, newsletter) continuent en parallèle. **Phase 2 ouverte** — prototype on-chain testnet.
- **Progression Phase 0 :** structure repo, conventions, handles publics tous réservés, Foundry installé, gitleaks installé, toolchain complète. Reste : Safe multisig Base Sepolia (devient dépendance Phase 2), page `/principles` constitutionnelle réelle (stub déjà en place).
- **Commit courant :** commits locaux en attente de `git push` — voir `git log --oneline -12` pour le détail des 10 commits livrés pendant la session 2026-04-19/2026-04-20.

---

## Phase 0 — Setup & cadrage (S1-S2)

**Objectif :** environnement de travail propre, présence publique minimale réservée, vision verrouillée.

- [x] Setup repo DAOIA en monorepo pnpm (contracts/frontend/backend/scripts).
- [x] `CLAUDE.md`, `DECISIONS.md`, `SECURITY.md`, `README.md`, `ROADMAP.md`.
- [x] `.gitignore`, `.env.example`, gitleaks en pre-commit.
- [ ] Réserver les actifs publics restants : domaine, X handle, Discord. GitHub org **✅ réservée : `daoia-conceptus`**, repo public `daoia-conceptus/daoia` en ligne.
- [ ] Wallet dédié projet (Safe multisig même solo) sur Base Sepolia.
- [ ] Installer Foundry localement, vérifier toolchain (node 20+, pnpm 9+).
- [ ] Page "principes constitutionnels" non négociables verrouillée.

**Jalon de sortie :** dépôt public initialisé, tooling installé, handles réservés.

---

## Phase 1 — Vitrine publique & présence (S3-S5)

**Objectif :** quelque chose à montrer dès qu'on demande "c'est quoi ton projet ?", premier signal de sérieux.

> ✅ **PHASE 1 — sous-livrable "landing page" COMPLÉTÉE (2026-04-20).**
> Jalon de sortie atteint sur la partie produit : landing v1 déployable, chrome + Hero + stub `/principles` + tokens design + SEO + Vercel Analytics. Les items annexes (whitepaper, animation Discord, posting X, newsletter) continuent en parallèle et ne bloquent pas l'ouverture de Phase 2. Détail du livrable dans `DECISIONS.md` (entrée `2026-04-20 — Landing v1 : Hero-only`) et dans `docs/landing_wireframe_v1.md`.

- [x] Landing page `frontend/` en **Next.js 16.2.4** + Tailwind v4, **prête à déployer sur Vercel** (domaine `daoia.io` réservé, déploiement à l'initiative de l'utilisateur). Stack : Geist Sans/Mono self-host, design tokens dark-only, SiteHeader sticky avec backdrop-blur, SiteFooter, stub `/principles`, Hero (pitch + CTAs Discord/GitHub), SEO + `noindex` + Vercel Analytics. 6 étapes livrées en 10 commits (voir `git log`).
- [ ] Whitepaper v0.5 en anglais (basé sur `docs/projet_dao_agents_ia_v0.3.md`) en page web + PDF téléchargeable. *(En parallèle de Phase 2.)*
- [ ] Discord structuré (annonces, général, tech, propositions, agents-feedback) avec bot auto-rôle simple. *(Serveur créé, invite permanente active — structure des channels à étoffer.)*
- [ ] X actif : 2-3 posts/semaine, fil de réflexion build in public. *(Handle `@daoiaprotocol` réservé, posting à démarrer.)*
- [ ] Newsletter (1 post/mois). *(À configurer quand le whitepaper v0.5 sera prêt.)*
- [ ] **Landing — 5 sections additionnelles différées** (`ProblemStatement`, `AgentFamilies`, `HowItWorks`, `GuardrailsShort`, `CallToAction`) : opportuniste, non bloquant, à écrire à mesure que le whitepaper prend forme. Emplacements tracés dans `frontend/app/page.tsx`.

**Jalon de sortie atteint :** une URL déployable à `daoia.io` avec chrome + Hero + stub principles, analytics en place, SEO propre, testnet-aware. Les 50-200 followers X / 30-100 membres Discord restent des objectifs de croissance parallèle à Phase 2.

---

## Phase 2 — Prototype on-chain testnet (S6-S10)

> ⏭ **PHASE 2 — PROCHAINE** (ouverture à partir du 2026-04-20, une fois les commits Phase 1 poussés).

**Objectif :** MVP fonctionnel sur Base Sepolia qui démontre le flow Sarah (découvrir, lire un résumé Sage, voter).

**Cible produit (confirmée) :** DAOs généralistes — communautés, culture, grants, coopératives. Sage v0 est tuné pour les propositions narratives (allocations budgétaires, partenariats, événements), pas pour les configurations smart contracts ou les upgrades de protocoles. Les early-testeurs seront recrutés depuis ce segment en priorité. Voir `DECISIONS.md` entrée `2026-04-20 — Cible prioritaire phase 1-2 : DAOs généralistes`.

- [ ] **Smart contracts v0 sur Base Sepolia :**
  - Token `$GOVAI` ERC-20Votes (OpenZeppelin v5).
  - Governor + Timelock (templates OZ).
  - `AgentRegistry` simple (mapping `agentId → permissions/version/promptHash/status`).
  - Safe multisig simple (pas de Treasury complexe à ce stade).
- [ ] **Frontend dApp :** Connect wallet (RainbowKit), liste des propositions, soumission texte simple, vote Pour/Contre, statut d'exécution.
- [ ] **Agent Sage v0 :** backend Node/TS qui écoute les nouvelles propositions, appelle l'Anthropic API, stocke et affiche un résumé 3 lignes à côté de la proposition.
- [ ] **Pas de Policy Engine sophistiqué** encore — règles hardcodées minimales.
- [ ] Tests Foundry >80% coverage sur chaque contrat.
- [ ] Documentation publique (GitHub) : lancer en local, tester, contribuer.
- [ ] Scripts de déploiement Base Sepolia (zéro mainnet).
- [ ] Bannière "experimental, do not use with real funds" visible dans l'UI.

**Jalon de sortie :** démo vidéo 3 min, prototype testnet accessible, 5-10 personnes l'ont testé.

---

## Phase 3 — Closed alpha & itération (S11-S14)

**Objectif :** faire utiliser le prototype par 20-50 vraies personnes, récolter de vrais signaux, affiner la thèse.

- [ ] Sélectionner 20-50 testeurs (moitié crypto-natifs, moitié non-crypto curieux).
- [ ] Onboarding 1-on-1 (15 min call, observation en silence) pour les 10 premiers.
- [ ] **Instrumenter les métriques clés :**
  - % qui votent au moins une fois.
  - Retention J+3, J+7, J+14.
  - % de votes réalisés après lecture d'un résumé IA (**LA métrique clé — objectif >60%**).
  - Temps moyen pour voter.
- [ ] Channel Discord dédié alpha, feedback continu.
- [ ] Release hebdomadaire basée sur les retours.
- [ ] Journal public (X/newsletter) de ce qu'on apprend.

**Jalon de sortie :** réponse honnête à "est-ce que les gens utilisent vraiment l'IA pour voter ?" ; 3-5 témoignages utilisables.

---

## Phase 4 — Inflexion : sortir du solo (M4-M5)

**Objectif :** à partir d'ici Claude Code ne suffit plus. Activer 4 leviers humains.

- [ ] **Cofondateur tech** (dev senior crypto) — ETHGlobal, Devconnect, Farcaster, Discord Solidity. Compter 2-4 mois.
- [ ] **Avocat crypto** — legal opinion sur la tokenomics + structure juridique (Foundation + Labs). Cabinets : Aramis Law, Kramer Levin, ORWL (FR) ; MME, Walder Wyss (CH). Budget 5-15k€.
- [ ] **Premier financement pre-seed** (250k-1M€) — angels crypto FR, micro-funds (Kima, Greenfield, Hashed Emergent), accelerators (Outlier Ventures, Alliance DAO).
- [ ] **Communauté auto-animée** — à partir de 500-1000 membres Discord engagés, nommer mods bénévoles et ambassadors.

**Jalon de sortie :** au moins un levier déclenché concrètement (meeting avocat signé, ou cofondateur en discussion sérieuse, ou 3 angels intéressés).

---

## Au-delà de la roadmap solo

Les phases suivantes sont décrites dans [`docs/projet_dao_agents_ia_v0.3.md`](docs/projet_dao_agents_ia_v0.3.md#3-roadmap-mvp--testnet--mainnet) et ne doivent pas être lancées sans cofondateur, audit humain, et legal opinion :

- **Phase 2 publique / testnet public** (M7-M10) — beta ouverte, programme bug bounty, 500-2000 testeurs actifs.
- **Phase 3 Audit & prep** (M11-M14) — 2 firmes d'audit smart contracts, audit Policy Engine + IA red team, finalisation tokenomics.
- **Phase 4 TGE & Mainnet** (M15-M18) — jamais sans cases audit + legal opinion + tokenomics validée.
- **Phase 5 Post-quantique** (Y2+) — wallet PQ-safe, sidechain dédiée ou partenariat chaîne PQ.

---

## La question-boussole (à se poser chaque semaine)

> **"Si demain je voulais convaincre un cofondateur tech de me rejoindre, qu'est-ce que je pourrais lui montrer de plus que la semaine dernière ?"**

Si la réponse est "rien" — la semaine est perdue.

---

## Anti-patterns à éviter (rappel)

- Coder en silence pendant 6 mois sans rien montrer.
- Lancer un token avant d'avoir un produit.
- Annoncer des dates publiques sur la roadmap (communiquer sur milestones atteints, pas futurs).
- Vouloir tout faire parfaitement — ship un truc moche qui marche, itère.
- Sous-estimer la part communauté/relation (50% du job est non-technique).
- Faire confiance à un audit IA pour des smart contracts mainnet.
- Recopier du code sans le comprendre, surtout côté smart contracts.
