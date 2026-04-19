# DECISIONS.md — Journal des décisions techniques DAOIA

> Une entrée par décision. Format imposé : **date / choix / alternatives considérées / raison**.
>
> Règle : toute décision technique ou produit non triviale doit être consignée ici **au moment où elle est prise**. Si une décision antérieure est remise en cause, on ajoute une nouvelle entrée qui explique le revirement plutôt que d'éditer l'ancienne.

---

## 2026-04-19 — Nom provisoire du projet : DAOIA

- **Choix :** le codename du projet est `DAOIA`. Le ticker token reste `$GOVAI` en placeholder.
- **Alternatives considérées :** `GovAI` (présent dans le guide initial), autres noms non retenus à ce stade.
- **Raison :** le nom initial `GovAI` figurait dans le guide d'amorçage mais n'a pas été retenu comme nom de projet final. `DAOIA` est plus mémorable, plus proche de la thèse (DAO + IA), et libère `GOVAI` comme piste de ticker sans lier le nom de protocole à un ticker qui pourrait changer post-legal opinion.
- **Révision :** le nom définitif et le ticker seront figés avant le whitepaper v0.5 et, au plus tard, avant toute publication marketing publique engageante.

---

## 2026-04-19 — Structure repo : monorepo pnpm

- **Choix :** monorepo unique dans `DAOIA/` avec workspaces pnpm (`frontend/`, `backend/`, `contracts/`, `scripts/`).
- **Alternatives considérées :** repos séparés (un par couche) ; `npm` ou `bun` comme gestionnaire de packages.
- **Raison :** monorepo = une seule CI, une seule source de vérité, partage facile de types TypeScript entre frontend et backend. `pnpm` pour ses workspaces natifs rapides, son usage disque efficient, et son adoption large dans l'écosystème web3 (wagmi, viem, Next.js recommandent pnpm).

---

## 2026-04-19 — Frontend : Next.js 15 App Router + Tailwind v4 + RainbowKit

- **Choix :** frontend en Next.js 15 (App Router), TypeScript strict, Tailwind v4, RainbowKit + wagmi + viem pour la connexion wallet. Déploiement Vercel.
- **Alternatives considérées :** Next.js 14 Pages Router (mentionné dans le guide v0), Tailwind v3, Privy à la place de RainbowKit.
- **Raison :** Next 15 est stable en avril 2026 et l'App Router est le standard pour les nouveaux projets (meilleur streaming, server components). Tailwind v4 apporte un gain perf et DX significatif. RainbowKit reste le standard crypto-natif avec meilleure couverture wallets que Privy à ce stade ; Privy pourra être ajouté plus tard si embedded wallets / social login deviennent critiques.

---

## 2026-04-19 — Smart contracts : Foundry + Solidity 0.8.26+ + OpenZeppelin v5

- **Choix :** stack contrats = Foundry, Solidity 0.8.26+, OpenZeppelin Contracts v5.x, chaîne cible **Base Sepolia uniquement** en v0.
- **Alternatives considérées :** Hardhat à la place de Foundry, OZ v4.x, autres L2 (Optimism, Arbitrum).
- **Raison :** Foundry est plus rapide, a un meilleur fuzzing intégré et un langage de test en Solidity (réduit la friction cognitive). OZ v5 aligne les patterns modernes (custom errors, ownable2step, etc.) et impose Solidity 0.8.20+. Base est le choix aligné sur le document v0.3 (écosystème Coinbase, frais bas, compatibilité EVM totale).

---

## 2026-04-19 — Backend agents : TypeScript/Node

- **Choix :** services agents en TypeScript sur Node.js 20+.
- **Alternatives considérées :** Python (mentionné comme option dans v0.3).
- **Raison :** stack JS unifiée avec le frontend (même langage, mêmes types partageables entre front et back), moindre friction pour un solo founder. Un bascule partielle vers Python pourra être envisagée plus tard si des pipelines ML lourds (fine-tuning, eval en batch) le justifient.

---

## 2026-04-19 — LLM provider Sage v0 : Anthropic API uniquement

- **Choix :** en v0, l'agent Sage appelle exclusivement l'API Anthropic (Claude).
- **Alternatives considérées :** multi-provider dès le départ (OpenAI + Anthropic + modèles open), self-hosting.
- **Raison :** un seul provider simplifie drastiquement le code, les tests, et les métriques en phase 2. Multi-provider sera ajouté quand la thèse sera validée (phase 3+), avec une couche d'abstraction propre, pas bricolée. Le document v0.3 mentionne Claude, GPT-4 et modèles open comme options — en v0 on retient Claude.

---

## 2026-04-19 — Licence : MIT

- **Choix :** licence MIT pour tout le code du monorepo.
- **Alternatives considérées :** Apache 2.0, AGPL-3.0, dual-licensing immédiat (MIT + commercial).
- **Raison :** MIT maximise l'adoption et la composabilité, standard dans l'écosystème web3. AGPL protège mieux contre les forks commerciaux mais freine l'adoption et complexifie la vie des intégrateurs. Un dual-license pourra être envisagé plus tard selon la stratégie business (par exemple licence commerciale pour les clients enterprise du Policy Engine) — mention explicite dans le README.

---

## 2026-04-19 — Organisation GitHub : placeholder `daoia-protocol`

- **Choix :** utiliser `daoia-protocol` comme nom d'organisation GitHub placeholder dans les URLs et configs jusqu'à réservation effective.
- **Alternatives considérées :** compte perso du founder, nom alternatif.
- **Raison :** handle non encore réservé au 2026-04-19. Les URLs seront à remplacer au moment de la réservation effective avant le premier push public. Tant que le remote n'est pas configuré, ce placeholder ne bloque rien.

---

## 2026-04-19 — Conventions : commits en anglais, docs internes en français

- **Choix :**
  - Commits au format Conventional Commits en **anglais**.
  - Code et identifiants en anglais.
  - Documentation publique (`README.md`, landing, whitepaper public, `SECURITY.md`) en **anglais**, versions françaises plus tard.
  - Documentation interne (`CLAUDE.md`, `DECISIONS.md`, `ROADMAP.md`, plans internes) en **français**.
- **Alternatives considérées :** tout en français (marché FR only), tout en anglais (perte de nuance interne).
- **Raison :** viser une audience internationale dès le départ pour le public-facing (prérequis pour toute ambition DAO / levée internationale), mais garder le français en langue de travail interne pour fluidité et rapidité de raisonnement du founder.

---

## 2026-04-19 — Qualité code : ESLint + Prettier config Next.js par défaut

- **Choix :** ESLint + Prettier avec la configuration générée par `create-next-app`, sans preset externe.
- **Alternatives considérées :** preset Airbnb, preset Standard, config fully custom.
- **Raison :** config Next.js par défaut est maintenue par l'équipe Next.js, couvre >90% des cas utiles, et évite la friction d'un preset qui ne se met plus à jour. Les règles spécifiques (éventuellement solhint pour Solidity) seront ajoutées à mesure que les besoins apparaissent.

---

## 2026-04-19 — Secrets : gitleaks en pre-commit dès le setup

- **Choix :** `gitleaks` configuré via husky en pre-commit dès le scaffold initial ; `.env.example` contient uniquement des placeholders.
- **Alternatives considérées :** gitleaks en CI uniquement, installation différée, pas de scanning automatique.
- **Raison :** un secret leaké une fois est un secret leaké pour toujours (historique git public). Activer le scanning dès le premier commit est moins cher que de nettoyer l'historique plus tard. Husky permet un hook simple, maintenu, et standard dans l'écosystème JS.

---

## 2026-04-19 — Placeholders `.env.example`

- **Choix :** `.env.example` contient les clés suivantes, toutes avec placeholders non sensibles :
  - `ANTHROPIC_API_KEY`
  - `BASE_SEPOLIA_RPC_URL`
  - `DEPLOYER_PRIVATE_KEY` (testnet uniquement — explicitement marqué)
  - `ETHERSCAN_API_KEY`
  - `BASESCAN_API_KEY`
  - `COUNCIL_SAFE_ADDRESS`
- **Alternatives considérées :** ajouter dès maintenant d'autres clés (Discord bot, Vercel, etc.).
- **Raison :** ne mettre que les secrets strictement nécessaires aux phases 1-2 ; ajouter les autres au fur et à mesure. `BASESCAN_API_KEY` est séparé d'`ETHERSCAN_API_KEY` parce que Basescan a son propre espace API, même si la clé peut parfois être partagée.
