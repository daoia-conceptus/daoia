# Démarrer le projet solo avec Claude Code — Roadmap concrète

> **Hypothèse de départ :** tu es seul, tu as un budget limité, tu travailles peut-être à temps partiel sur le projet, et tu as Claude Code (+ Claude.ai pour la stratégie). Objectif : arriver en 3-4 mois à un état où tu peux **attirer un cofondateur, des early users, et préparer une première levée**.

---

## Principe directeur

Tu ne peux pas construire la DAO complète seul. **N'essaie pas.** Tu peux construire :
1. Une **vision crédible et publique** (vitrine + whitepaper + communauté embryonnaire)
2. Un **prototype interactif sur testnet** qui montre le flow Sarah en vrai
3. Une **base technique propre** (contrats, frontend, agent Sage) qui prouve que tu sais exécuter

C'est ça qui te débloque la suite (cofondateur, financement, équipe).

---

## Phase 0 — Setup & cadrage (semaines 1-2)

### Objectifs
- Environnement de travail propre
- Présence publique minimale réservée
- Vision verrouillée

### Actions concrètes

- **Setup dev** : Mac/Linux, Node 20+, Foundry (smart contracts), Git, VS Code avec extensions Solidity
- **Installer Claude Code** et apprendre les bonnes pratiques (slash commands, fichiers `CLAUDE.md` pour le contexte projet, workflow git)
- **Réserver les actifs publics** : nom de domaine, X handle, Discord, GitHub org. Choisis un nom provisoire si nécessaire — tu pourras pivoter, mais protège les handles
- **Wallet dédié projet** : Safe multisig (même solo, c'est une bonne pratique dès le départ)
- **Verrouille la vision** : relis tes 2 docs (cadrage v0.3 + use cases v2), fais-toi une page "principes constitutionnels" non négociables (les agents structurent, ne décident pas ; sybil resistance par défaut ; etc.)

### Ce que Claude Code fait pour toi
- Génère le `CLAUDE.md` avec contexte projet
- Setup les configs (ESLint, Prettier, hardhat/foundry config)
- Initialise les repos avec README, LICENSE, structure de dossiers

### Ce que Claude Code NE fait PAS
- Choisir le nom (c'est ta marque)
- Réserver les handles à ta place
- Définir tes principes (c'est ta vision)

---

## Phase 1 — Vitrine publique & présence (semaines 3-5)

### Objectifs
- Quelque chose à montrer dès qu'on demande "c'est quoi ton projet ?"
- Premier signal de sérieux

### Actions concrètes

- **Landing page** (Next.js + Tailwind, déployée sur Vercel)
  - 1 phrase de pitch
  - Les 2 familles d'agents
  - 2-3 use cases narrés (Marc, Lina)
  - CTA : Discord / waitlist email / X follow
- **Whitepaper léger v0.5** (basé sur ton doc v0.3) en page web + PDF téléchargeable
- **Discord setup** : channels structurés (annonces, général, tech, propositions, agents-feedback)
- **X actif** : 2-3 posts par semaine, fil de réflexion sur le projet, build in public
- **Newsletter** (Substack ou similaire) : 1 post/mois sur l'avancée

### Ce que Claude Code fait pour toi
- Génère tout le code de la landing page (composants React, animations, responsive)
- Convertit ton markdown stratégique en pages web élégantes
- Setup le déploiement Vercel + domaine custom
- Génère le PDF du whitepaper depuis le markdown
- Code des bots Discord simples (auto-rôle, FAQ)

### Ce que Claude Code NE fait PAS
- Écrire les posts X (ta voix, ton angle)
- Animer le Discord (relation humaine)
- Décider du design / branding final

### Jalon de sortie de phase
- Une URL que tu peux envoyer à n'importe qui
- 50-200 followers X, 30-100 membres Discord (organique, pas acheté)

---

## Phase 2 — Prototype on-chain (semaines 6-10)

### Objectifs
- Un MVP **fonctionnel sur testnet** qui montre le flow Sarah
- Smart contracts simples mais propres
- Un agent Sage qui marche pour de vrai

### Actions concrètes

- **Smart contracts v0** sur Base Sepolia :
  - Token `$GOVAI` ERC-20Votes (OpenZeppelin)
  - Governor + Timelock (templates OZ)
  - AgentRegistry simple (mapping)
  - PAS de Treasury complexe à ce stade — Safe simple suffit
- **Frontend dApp** :
  - Connect wallet (RainbowKit)
  - Liste des propositions
  - Soumettre une proposition (texte simple)
  - Voter Pour/Contre
  - Voir le statut d'exécution
- **Agent Sage v0** :
  - Backend Node/Python qui écoute les nouvelles propositions
  - Appel à l'API Claude pour générer un résumé en 3 lignes
  - Affichage dans l'UI à côté de la proposition
- **Pas de Policy Engine sophistiqué encore.** Juste des règles hardcodées : "le résumé est généré par IA, l'affichage est automatique, point."
- **Documentation publique** sur GitHub : comment lancer en local, comment tester

### Ce que Claude Code fait pour toi
- Scaffold complet des contrats Solidity à partir des templates OZ
- Tests Foundry pour chaque contrat (target : >80% coverage)
- Frontend complet (Next.js + wagmi + composants)
- Backend agent (file watcher, API integration)
- Scripts de déploiement testnet
- Documentation technique

### Ce que Claude Code NE fait PAS
- Auditer les smart contracts (pour mainnet, audit humain obligatoire)
- Designer l'UX (Claude code fait du fonctionnel, pas du beau)
- Décider des paramètres économiques (quorum, threshold, etc.)

### ⚠️ Garde-fous critiques
- **Tout est sur testnet, ZÉRO mainnet à ce stade**
- **Aucun token réel distribué**, juste des testnet tokens
- **Tous les contrats sont marqués "experimental, do not use with real funds"**
- Tu commits TOUT sur GitHub public dès le début (signal de sérieux, build in public)

### Jalon de sortie de phase
- Démo enregistrée (vidéo 3 min) : "Voilà Sarah qui se connecte, voit une prop, lit le résumé Sage, vote"
- Lien vers le prototype testnet accessible
- 5-10 personnes l'ont testé et donné du feedback

---

## Phase 3 — Closed alpha & itération (semaines 11-14)

### Objectifs
- Faire utiliser le prototype par 20-50 vraies personnes
- Récolter des **vrais signaux** (pas juste des compliments)
- Affiner la thèse avec des données

### Actions concrètes

- **Sélectionner 20-50 testeurs** : moitié crypto-natifs, moitié non-crypto curieux
- **Onboarding 1-on-1** pour les 10 premiers (call de 15 min, tu observes en silence)
- **Instrument les métriques clés** :
  - % qui votent au moins 1 fois
  - % qui reviennent J+3, J+7
  - % qui lisent le résumé Sage avant de voter (LA métrique clé)
  - Temps moyen pour voter
- **Channel Discord dédié alpha** pour feedback continu
- **Itération hebdomadaire** : 1 release par semaine basée sur les retours
- **Documente publiquement** ce que tu apprends (X, newsletter)

### Ce que Claude Code fait pour toi
- Setup des outils d'analytics (PostHog, Mixpanel ou homemade)
- Génère les rapports de métriques chaque semaine
- Code rapidement les fix et features demandés par les alpha testeurs
- Génère les changelogs

### Ce que Claude Code NE fait PAS
- Conduire les calls 1-on-1
- Lire entre les lignes des feedbacks utilisateurs
- Prendre les décisions produit (qu'est-ce qu'on garde, qu'est-ce qu'on jette)

### Jalon de sortie de phase
- Tu as une **réponse honnête** à : "est-ce que les gens utilisent vraiment l'IA pour voter ?" (la métrique clé)
- Tu as 3-5 témoignages utilisables
- Tu sais ce qui marche et ce qui ne marche pas dans ta thèse

---

## Phase 4 — Inflexion : sortir du solo (mois 4-5)

À partir d'ici, **Claude Code ne suffit plus**. Tu dois activer 4 leviers humains.

### Levier 1 — Trouver un cofondateur tech
- Tu as une démo, des metrics, une vision. C'est maintenant que tu peux séduire un dev senior crypto
- Lieux : ETHGlobal hackathons, Devconnect, Farcaster, espaces Solidity sur Discord, anciens de projets connus
- Pas de cofondateur en 2 semaines : compte 2-4 mois pour le bon match

### Levier 2 — Avocat crypto
- Pour la legal opinion sur la tokenomics
- Pour la structure juridique (Foundation + Labs)
- Cabinets en France : Aramis Law, Kramer Levin, ORWL Avocats. En Suisse : MME, Walder Wyss
- Premier RDV gratuit en général, compte 5-15k€ pour la legal opinion complète

### Levier 3 — Premier financement (pre-seed)
- Avec démo + alpha + cofondateur + legal opinion → tu peux pitcher
- Tickets visés : 250k-1M€ pre-seed
- Cibles : angels crypto français (Cyril Paglino, Stanislas Polu, etc.), micro-funds (Kima, Greenfield, Hashed Emergent), accelerators (Outlier Ventures, Alliance DAO)

### Levier 4 — Communauté qui s'auto-anime
- À partir de 500-1000 membres Discord engagés, tu peux nommer des **mods bénévoles** et **ambassadors**
- Programme de contributors : badges, accès, plus tard tokens
- C'est la base de ta future DAO

---

## Anti-patterns du solo founder

1. **Coder en silence pendant 6 mois sans rien montrer** → personne ne te connaît, tu n'as aucun feedback, tu construis dans le vide
2. **Lancer un token avant d'avoir un produit** → mort instantanée du projet (et risques légaux)
3. **Annoncer des dates publiques sur la roadmap** → tu vas les rater, c'est sûr. Communique sur les milestones atteints, pas les futurs
4. **Vouloir tout faire parfaitement** → l'ennemi du bien. Ship un truc moche qui marche, itère
5. **Sous-estimer la part communauté/relation** → 50% du job est non-technique
6. **Faire confiance à un audit IA pour les smart contracts mainnet** → audit humain obligatoire avant tout déploiement avec de l'argent réel
7. **Recopier sans comprendre** → tu DOIS comprendre chaque ligne de code que Claude Code génère, surtout côté smart contracts. Tu seras tenu pour responsable.

---

## Comment utiliser Claude Code intelligemment

- **Donne-lui beaucoup de contexte** : un fichier `CLAUDE.md` à la racine du projet avec ton archi, tes principes, tes contraintes
- **Travaille en petits chunks** : ne demande pas "code-moi toute la dApp", demande "code-moi le composant ProposalCard avec ces props"
- **Toujours review** : Claude Code fait du code qui marche, pas toujours du code optimal. Lis tout, comprends tout
- **Tests en parallèle** : à chaque feature, demande aussi les tests. Un projet avec 0% coverage est un signal négatif
- **Commits fréquents** : pas besoin d'attendre la perfection, commit chaque étape. Claude Code peut t'aider à écrire les commit messages
- **Profite de sa polyvalence** : il fait Solidity, React, Python, scripts, docs, configs CI/CD. Capitalise dessus

### Limites à connaître
- Pour les smart contracts qui géreront un jour de la valeur réelle : **toujours faire auditer humainement avant mainnet**, et faire revoir par un dev Solidity senior dès que tu peux
- Pour la sécurité crypto (clés privées, signatures, multisig) : ne jamais improviser, utiliser des libs auditées (OpenZeppelin, Safe SDK)
- Pour la conformité légale : Claude Code n'a pas de barre d'avocat

---

## Récapitulatif visuel

```
SEMAINE   PHASE             LIVRABLE PRINCIPAL                  CLAUDE CODE
──────────────────────────────────────────────────────────────────────────
1-2       Setup             Environnement + handles publics      ★★ (configs)
3-5       Vitrine           Landing + whitepaper + Discord       ★★★★ (frontend)
6-10      Prototype         dApp testnet + agent Sage v0         ★★★★★ (cœur dev)
11-14     Closed alpha      Métriques réelles + itération        ★★★ (analytics)
15+       Inflexion         Cofondateur, avocat, financement     ★ (rien à coder)
```

---

## La vraie question à te poser chaque semaine

> **"Si demain je voulais convaincre un cofondateur tech de me rejoindre, qu'est-ce que je pourrais lui montrer de plus que la semaine dernière ?"**

C'est ta boussole. Si la réponse est "rien", tu as perdu une semaine.

Si tu réponds "j'ai 100 followers de plus" ou "j'ai amélioré la doc" → c'est faible.
Si tu réponds "le prototype tourne maintenant et 5 personnes l'ont testé" → c'est solide.
Si tu réponds "j'ai signé un meeting avec un avocat et j'ai 3 angels intéressés" → c'est excellent.
