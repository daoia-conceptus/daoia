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
- **Révision (2026-04-19, même jour) :** placeholder **abandonné** avant toute publication. L'org GitHub retenue est `daoia-conceptus`. Voir entrée plus bas du même jour.

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

---

## 2026-04-19 — Authentification GitHub : via `gh` CLI (pas de PAT manuel)

- **Choix :** utiliser la GitHub CLI (`gh`) pour gérer l'authentification git et GitHub. `gh auth setup-git` prend en charge les credentials ; plus besoin de stocker un Personal Access Token dans le keychain ou de maintenir des clés SSH dédiées pour ce repo.
- **Alternatives considérées :**
  - **PAT manuel** stocké dans le keychain macOS — nécessite rotation manuelle, friction élevée, risque plus élevé d'exposition accidentelle.
  - **Clés SSH distinctes par compte** — fonctionnel mais demande une configuration `~/.ssh/config` fine (Host alias, IdentityFile, IdentitiesOnly) et casse le flow `gh repo view`/`gh pr create` par défaut.
- **Raison :** l'utilisateur a deux comptes GitHub (un personnel et `daoia-conceptus` dédié au projet). `gh` bascule entre comptes avec `gh auth switch`, gère la séparation proprement, et évite toute confusion sur lequel pousse vers quel remote. Le compte actif côté `gh` pour ce repo est `daoia-conceptus`. En cas de doute futur, vérifier avec `gh auth status`.

---

## 2026-04-19 — Organisation GitHub : nom réel `daoia-conceptus`

- **Choix :** l'organisation GitHub publique du projet est `daoia-conceptus`. Repo public : `https://github.com/daoia-conceptus/daoia`. Branche par défaut `main`.
- **Alternatives considérées :**
  - Placeholder initial `daoia-protocol` (abandonné, voir entrée plus haut du même jour).
  - **Compte perso** de l'utilisateur — rejeté pour ne pas lier le projet à son identité personnelle dès le premier push.
  - **Créer une nouvelle org plus neutre plus tard** (ex. `daoia-foundation`) si le projet grossit ou quand la Foundation juridique sera constituée.
- **Raison :** l'org `daoia-conceptus` était déjà réservée par l'utilisateur et est immédiatement exploitable. Elle porte la marque du projet sans présumer de la structure juridique finale. Un transfert vers une nouvelle org reste possible sans douleur côté git (le remote peut être déplacé) ; les liens publics (landing, réseaux sociaux) auront plus d'inertie et seront le vrai coût d'un renommage, donc à figer dès qu'une décision long terme est prise.

---

## 2026-04-19 — Politique de signature des commits : garder `Co-Authored-By: Claude` par défaut

- **Choix :** chaque commit créé avec l'aide de Claude Code conserve par défaut la ligne `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>` (ou son équivalent pour la version de modèle utilisée) dans le message de commit.
- **Alternatives considérées :**
  - **Retirer systématiquement la signature** — rejetée pour manque de transparence sur l'usage d'agents IA.
  - **Signer uniquement les commits "majeurs"** — rejetée car la ligne de démarcation "majeur" / "mineur" serait subjective et ouvrirait la porte à des oublis.
  - **Signer `Authored-By` au lieu de `Co-Authored-By`** — rejetée car la responsabilité finale du code et du commit reste humaine (règle SECURITY.md) ; l'IA est co-auteure, pas auteure.
- **Raison :** transparence sur la nature de la collaboration (l'utilisateur pilote, l'IA assiste) ; cohérence avec la philosophie publique du projet (build in public, assumer l'usage d'outils modernes) ; alignement avec une pratique qui se généralise dans l'écosystème open source. L'historique git reste auditable rétroactivement : si un futur contributeur ou investisseur veut une vue "code 100% humain", on peut re-générer un diff filtré, mais on ne retire pas la trace historique par défaut.

---

## 2026-04-19 — Incident git : override local `user.name` / `user.email` à `#`

- **Incident :** le repo local a reçu, hors session Claude Code, un override `user.name = #` et `user.email = #` (vraisemblablement via un copier-coller depuis un message externe où un `#` a été interprété par zsh comme début de commentaire, laissant un `#` isolé comme seule valeur conservée). Résultat : un commit de session (ancien hash `1b1a916` — `docs: update project state after initial GitHub push`) s'est retrouvé signé `# <#>` au lieu de `conceptus <info@conceptus.be>`.
- **Remédiation :**
  - `git config --local --unset user.name` et `git config --local --unset user.email` pour supprimer l'override et laisser la config globale reprendre la main.
  - `git commit --amend --reset-author --no-edit` pour ré-attribuer le commit défectueux. Nouveau hash : `9a8f261`.
  - Aucun `git push` n'a été effectué entre la corruption et la correction → l'historique distant n'a jamais été atteint.
- **Alternative considérée :** ne rien documenter et corriger en silence. **Rejetée :** la traçabilité d'un mini-incident vaut plus que l'ego, c'est formateur pour un solo-founder, et c'est cohérent avec l'exigence d'audit que le projet applique à ses propres agents IA (cf. SECURITY.md). Si on exige des logs d'action de nos agents, on se les applique à soi-même.
- **Prévention :** en cas de doute sur l'identité avant un commit sensible, lancer `git config --local --list | grep user` et `git config user.email`. Règle générale : la config `user.*` vit en **global**, pas en local, sauf besoin explicite de séparation multi-identités par repo.

---

## 2026-04-19 — Landing v1 : page `/principles` dédiée (double rôle constitutionnel)

- **Choix :** la landing v1 livre une **page dédiée `/principles`** (pas une simple ancre `/#principles`). Elle contient la version publique, sobre, des principes non négociables du projet.
- **Alternatives considérées :**
  - **Ancre `/#principles` seule** — plus léger à coder mais ne force pas à rédiger un contenu public propre.
  - **Fichier `PRINCIPLES.md` à la racine** — visible pour les devs sur GitHub mais invisible pour un visiteur de la landing.
- **Raison :** la page sert un double rôle — (a) trust signal pour un dev crypto qui atterrit sur la landing et veut voir ce que le projet s'interdit avant de cliquer ailleurs ; (b) elle remplit simultanément l'item Phase 0 restant "rédiger la page principes constitutionnels". Un seul effort, deux cases cochées. Versions interne (`CLAUDE.md`) et publique (`/principles`) peuvent diverger sur la forme mais jamais sur le fond.

---

## 2026-04-19 — Landing v1 : dark-only, light mode + toggle reportés en v2

- **Choix :** la landing v1 livre **un seul thème visuel, dark**. Pas de bouton de bascule thème dans le header. Light mode et toggle UI sont des items v2.
- **Alternatives considérées :**
  - **Dark + light + toggle dès la v1** — coût d'implémentation non négligeable (double audit de contraste WCAG, logique `localStorage`, gestion du flash de chargement, respect de `prefers-color-scheme` avec SSR Next.js, double mapping des tokens).
  - **Respect passif de `prefers-color-scheme` sans toggle** — rejeté car ajoute la complexité sans gagner en contrôle utilisateur.
- **Raison :** la cible v1 (dev crypto early-stage) est très majoritairement dark-par-défaut. Économie de temps et de bugs significative, coût produit quasi nul. Architecture préservée : tokens couleur tous sémantiques (`bg-canvas`, `fg-primary`, etc.), jamais d'hex en dur dans les composants — ajouter le light mode en v2 sera trivial. Palette light figée dans `docs/landing_wireframe_v1.md` pour référence future.

---

## 2026-04-19 — Analytics v1 : Vercel Analytics

- **Choix :** la landing v1 intègre **Vercel Analytics** (package `@vercel/analytics`) dès le premier déploiement Vercel.
- **Alternatives considérées :**
  - **Zéro analytics** — envisagé initialement pour la sobriété absolue, rejeté parce qu'on se prive même des métriques vitales (visites, sources, taux de rebond) qui sont utiles pour itérer la landing en Phase 1.
  - **Plausible self-hosted** — RGPD clean, data auto-hébergée, mais surcoût infra (un VPS) et de temps pour un projet solo. Option pertinente pour Phase 3+ quand on voudra posséder la donnée.
  - **GA4 / Mixpanel** — trackers tiers intrusifs, incompatibles avec la philosophie RGPD/privacy du projet.
- **Raison :** Vercel Analytics est gratuit dans la limite du tier hobby, zéro-config si le déploiement est déjà sur Vercel, RGPD-friendly (pas de cookies, pas de PII, pas de bannière obligatoire), et suffisant pour les métriques d'une landing Phase 1. Le jour où la closed alpha démarre (Phase 3), ré-évaluer : basculer vers Plausible self-hosted si on veut posséder la donnée, ou étendre Vercel Analytics selon les besoins produit.

---

## 2026-04-19 — Landing v1 : `noindex` tant que les handles Discord/X ne sont pas réservés

- **Choix :** la landing v1 est déployée en production avec `<meta name="robots" content="noindex, nofollow" />` **tant que les handles publics Discord et X ne sont pas réservés et liés dans le header**. Le meta est retiré manuellement lors du lancement public explicite.
- **Alternatives considérées :**
  - **Landing indexée dès le premier déploiement** — rejeté car un visiteur qui atterrirait via Google sur une page avec des CTAs "Join Discord" menant vers `#` (placeholder) aurait une expérience cassée, et le SEO démarre avec des signaux négatifs.
  - **Ne déployer en public qu'après réservation des handles** — rejeté car on veut pouvoir partager une URL interne (preview Vercel, ou prod-noindex) à quelques early testeurs tout de suite pour avoir leur feedback sans attendre la réservation Discord/X.
- **Raison :** découple le déploiement technique (qui peut avancer) de la diffusion publique (qui dépend d'assets externes). Le meta `noindex` est retiré en une ligne de diff quand les handles sont prêts. Réminder : vérifier également que le `sitemap.xml` n'est pas exposé et que `robots.txt` contient `Disallow: /` tant que le flag est actif.

---

## 2026-04-19 — Landing v1 : wordmark CSS, logo designer différé 2-3 mois

- **Choix :** la landing v1 utilise **un wordmark "DAOIA" en CSS pur** (typographie Geist Sans, weight ajusté). Pas de logomark (icône) en v1. Une commande à un designer est prévue dans **2-3 mois**, une fois que le nom du projet aura été stress-testé par l'usage et les retours.
- **Alternatives considérées :**
  - **Commander un logo complet maintenant** — rejeté : coût immédiat (500-2000€ pour un travail correct) alors que le nom `DAOIA` est encore provisoire et que la marque pourrait bouger avant TGE ; risque de payer deux fois.
  - **Logo IA-généré (Midjourney / Ideogram)** — rejeté : qualité moyenne pour une marque de projet sérieux, pas de garantie d'unicité, pas de cession de droits claire.
  - **Logomark minimaliste auto-fabriqué en Figma** — envisageable mais chronophage sans garantie de qualité pour un non-designer.
- **Raison :** un wordmark typographique est gratuit, cohérent avec le style "dev tool first" (cf. Linear / Vercel), et se remplace en un commit le jour où un vrai logo est prêt. Mieux vaut pas-de-logo qu'un mauvais logo — surtout tant que le nom n'est pas définitif.

---

## 2026-04-19 — Assets publics réservés

- **Choix :** les quatre canaux publics du projet sont désormais verrouillés :
  - **Domaine :** `daoia.io` — réservé sur **Hostinger**, pas encore déployé.
  - **Discord :** serveur officiel créé, invite permanent `https://discord.gg/KmEs2QVk`.
  - **X :** handle `@daoiaprotocol` — `https://x.com/daoiaprotocol`.
  - **GitHub :** `daoia-conceptus/daoia` (déjà réservé précédemment, rappelé ici pour consolidation).
- **Alternatives considérées :**
  - **TLD `.xyz`** — option moins premium, moins crédible pour un projet institutionnel / "vu par un avocat" ; écartée.
  - **TLD `.ai`** — sensiblement plus cher, et réducteur thématiquement (colle l'identité projet à "IA" alors que la thèse est "gouvernance augmentée par l'IA", pas "projet IA pur") ; écartée.
  - **Stratégie multi-TLD défensif** (`.io` + `.xyz` + `.ai` + `.com`) — écartée en v1 pour éviter la charge récurrente et parce qu'aucun squat urgent n'est à craindre à ce stade. Pourra être revisitée post-legal opinion / pré-TGE.
- **Raison :** verrouiller l'identité publique avant toute diffusion (landing, post X, annonce Discord) pour empêcher le squattage de marque sur les plateformes les plus exposées. Coût marginal limité, bénéfice asymétrique (un handle X ou un domaine cédé après visibilité coûte 10× ce qu'il coûte en préventif).
- **Notes :**
  - Transfert potentiel **Hostinger → Cloudflare** pour la gestion DNS (meilleure API, meilleurs records CDN, intégration Vercel plus fluide) **reporté** — non bloquant tant que la landing n'est pas live ; à re-évaluer au moment du déploiement réel sur `daoia.io`.
  - La décision antérieure "Landing v1 : `noindex` tant que les handles Discord/X ne sont pas réservés" (même date) voit sa condition technique levée ; le `noindex` reste toutefois maintenu jusqu'au lancement public explicite puisque la landing n'est pas encore déployée.
  - Tous ces liens sont également consignés dans `CLAUDE.md` (section "Identité & comptes") et exposés dans `README.md` (section "Community").
