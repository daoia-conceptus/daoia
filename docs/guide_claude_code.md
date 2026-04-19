# Guide — Démarrer proprement avec Claude Code

> Ce document contient :
> 1. Le **prompt initial** à coller dans ta première session Claude Code
> 2. La **structure de fichiers** que Claude Code va créer
> 3. Les **bonnes pratiques** pour les sessions suivantes

---

## Étape 1 — Préparer ton dossier projet

Avant d'ouvrir Claude Code, fais ça manuellement (5 min) :

```bash
mkdir -p ~/projets/govai-dao
cd ~/projets/govai-dao
mkdir docs
```

Puis **copie tes 4 documents markdown** dans `docs/` :
- `projet_dao_agents_ia_v0.3.md`
- `use_cases_loop_produit_v2.md`
- `roadmap_solo_claude_code.md`
- (optionnel) ce guide `guide_claude_code.md`

Lance ensuite Claude Code depuis la racine du projet :
```bash
claude
```

---

## Étape 2 — Le prompt initial (à copier-coller tel quel)

> Copie tout ce qui est dans le bloc ci-dessous et envoie-le à Claude Code comme premier message.

```
Bonjour. Je démarre un nouveau projet. Avant toute chose, je veux que tu prennes le temps de comprendre le contexte et de préparer l'environnement correctement. NE CODE RIEN avant d'avoir terminé les étapes 1 à 5 ci-dessous.

CONTEXTE DU PROJET

Je construis seul une DAO augmentée par l'IA où des agents IA aident les humains à comprendre, voter et exécuter des décisions. Le projet s'appellera provisoirement "GovAI" (placeholder). La vision complète, l'architecture, les use cases et ma roadmap solo sont décrites dans les fichiers markdown du dossier docs/.

ÉTAPES À EXÉCUTER DANS L'ORDRE

Étape 1 — Lecture complète du contexte
Lis intégralement chaque fichier dans le dossier docs/. Prends le temps. Ce sont mes documents fondateurs. Tu dois les avoir en tête pour tout le reste du projet.

Étape 2 — Synthèse
Après lecture, écris-moi une synthèse de 15 lignes maximum qui montre que tu as compris :
- le pitch du projet en 1 phrase
- les 2 familles d'agents
- l'architecture principale
- ce qui est prioritaire en phase 1 (vitrine publique) et phase 2 (prototype)
- les principes non négociables (ex : les agents structurent, ne décident pas ; sybil resistance par défaut ; jamais de mainnet sans audit)

Étape 3 — Questions de clarification
Pose-moi toutes les questions dont tu as besoin avant de commencer à structurer le projet. Par exemple : stack exacte souhaitée, conventions de nommage, choix de frameworks si plusieurs options sont valides, éléments manquants dans les docs. Ne suppose pas, demande.

Étape 4 — Création du CLAUDE.md
Une fois les réponses reçues, crée à la racine du projet un fichier CLAUDE.md qui servira de mémoire permanente pour toutes nos futures sessions. Il doit contenir :
- Vision et pitch en 3 lignes
- Principes non négociables (liste)
- Architecture cible (résumé)
- Phase en cours
- Stack technique retenue
- Conventions de code (style, nommage, commits)
- Ce que tu ne dois jamais faire (règles de sécurité)
- Liens vers les docs/ pour détails

Étape 5 — Structure initiale du repo
Crée la structure de dossiers suivante :
  govai-dao/
  ├── CLAUDE.md              (mémoire contexte)
  ├── README.md              (présentation publique)
  ├── docs/                  (déjà présent, ne pas modifier)
  ├── contracts/             (smart contracts Solidity, Foundry)
  ├── frontend/              (Next.js app)
  ├── backend/               (services agents IA)
  ├── scripts/               (déploiement, utilitaires)
  └── .github/               (CI/CD futurs)

Initialise aussi :
- git (avec .gitignore adapté Node/Solidity/Python)
- un README.md v0 basé sur le pitch
- un fichier ROADMAP.md synthétisant les 5 phases de la roadmap solo
- un fichier DECISIONS.md vide (journal des décisions techniques à venir)
- un fichier SECURITY.md avec les règles non négociables

RÈGLES GÉNÉRALES POUR CE PROJET

1. Tu m'expliques toujours ce que tu vas faire avant de le faire quand c'est une décision non triviale
2. Tu ne déploies JAMAIS de smart contract sur mainnet, même si je te le demande par erreur. Tu me rappelles que tout mainnet nécessite un audit humain préalable
3. Tu utilises les libraries auditées par défaut : OpenZeppelin pour les contrats, Safe SDK pour le multisig, wagmi/viem côté frontend
4. Tu écris des tests pour tout code smart contract (objectif >80% coverage)
5. Tu commits souvent, avec des messages clairs au format Conventional Commits
6. Tu ne stockes jamais de clé privée ou de secret dans le code. Tu utilises .env et .env.example
7. Si tu as un doute sur une décision produit, tu demandes plutôt que de supposer
8. Tu maintiens DECISIONS.md à jour à chaque choix technique important (quoi, pourquoi, alternatives envisagées)

Quand tu as terminé les étapes 1 à 5, fais-moi un récapitulatif de ce que tu as créé et propose-moi la première tâche concrète à attaquer pour la Phase 1 (vitrine publique).

Commence maintenant par l'étape 1.
```

---

## Étape 3 — Ce que Claude Code devrait créer

À la fin de cette première session, ton dossier ressemblera à :

```
govai-dao/
├── CLAUDE.md              ← mémoire permanente, lue à chaque session
├── README.md              ← présentation publique du projet
├── ROADMAP.md             ← les 5 phases avec milestones
├── DECISIONS.md           ← journal des décisions techniques
├── SECURITY.md            ← règles non négociables
├── .gitignore             ← configs Node/Solidity/Python
├── .env.example           ← template des variables d'env
├── docs/
│   ├── projet_dao_agents_ia_v0.3.md
│   ├── use_cases_loop_produit_v2.md
│   └── roadmap_solo_claude_code.md
├── contracts/             (vide au départ)
├── frontend/              (vide au départ)
├── backend/               (vide au départ)
├── scripts/               (vide au départ)
└── .github/
```

---

## Étape 4 — Sessions suivantes : comment enchaîner

### Bonne pratique n°1 — Toujours commencer par faire lire CLAUDE.md

À chaque nouvelle session, commence par :

```
Lis CLAUDE.md puis dis-moi où on en est et quelle est la prochaine tâche logique.
```

Claude Code n'a pas de mémoire entre sessions, le `CLAUDE.md` est sa mémoire externe. S'il est bien maintenu, tu ne réexpliques jamais le projet.

### Bonne pratique n°2 — Décomposer les tâches

Au lieu de :
> "Code-moi toute la landing page"

Préfère :
> "On attaque la landing page. Étape 1 : propose-moi une structure de composants. Étape 2 : code le Hero. Étape 3 : la section Use Cases. etc."

Tu gardes le contrôle et chaque étape est reviewable.

### Bonne pratique n°3 — Mettre à jour CLAUDE.md régulièrement

Après chaque session importante, demande :

```
Mets à jour CLAUDE.md pour refléter ce qu'on vient de faire et où on en est. Ajoute la décision au DECISIONS.md si c'est une décision technique importante.
```

### Bonne pratique n°4 — Commiter fréquemment

À la fin de chaque tâche terminée :

```
Fais un commit avec un message clair au format Conventional Commits.
```

### Bonne pratique n°5 — Challenger Claude Code

Si une solution te semble compliquée ou louche :

```
Avant d'implémenter, explique-moi pourquoi tu as choisi cette approche. Quelles sont les alternatives ? Quels sont les trade-offs ?
```

Claude Code n'est pas un oracle. Il peut choisir une stack obsolète ou sur-complexe. Challenge-le.

### Bonne pratique n°6 — Tests et sécurité systématiques

À chaque fois qu'il code un smart contract :

```
Maintenant écris les tests Foundry pour ce contrat. Je veux >80% de coverage et je veux des tests pour les cas limites (overflow, reentrancy, accès non autorisé).
```

### Bonne pratique n°7 — Demander des diagrammes

Pour tout ce qui est architecture complexe :

```
Avant d'implémenter, fais-moi un diagramme Mermaid de l'architecture que tu proposes.
```

Claude Code peut générer du Mermaid, très utile pour comprendre les flows.

---

## Prompt-type pour chaque phase

### Phase 1 — Vitrine publique

```
On entre en Phase 1 de la roadmap (vitrine publique). Objectif de la session : démarrer la landing page.

Contraintes :
- Next.js 14 App Router, Tailwind, TypeScript
- Déploiement Vercel
- Design minimaliste, dark mode par défaut, proche de l'esthétique Linear/Vercel
- Responsive mobile-first

Propose-moi d'abord une structure de pages et composants. Ne code rien avant ma validation.
```

### Phase 2 — Prototype on-chain

```
On entre en Phase 2 (prototype testnet). Objectif de la session : scaffolder les smart contracts.

Contraintes :
- Foundry, Solidity 0.8.x
- OpenZeppelin pour tout (ERC20Votes, Governor, Timelock)
- Déploiement Base Sepolia uniquement
- Tests >80% coverage
- Rappel : JAMAIS mainnet

Propose-moi l'architecture des contrats et les interfaces avant d'écrire du code.
```

### Phase 3 — Closed alpha

```
On entre en Phase 3 (closed alpha). Objectif : instrumenter les métriques clés avant d'inviter les testeurs.

Métriques à tracker (cf. use_cases_loop_produit_v2.md) :
- % qui votent J+0
- % qui reviennent J+3, J+7
- % qui lisent le résumé Sage avant de voter (métrique clé)
- Temps moyen pour voter

Propose-moi une stack analytics simple et respectueuse de la vie privée.
```

---

## Erreurs à ne pas faire avec Claude Code

- **Sessions trop longues sans commits** : si tu travailles 3h puis plantes ton terminal, tu perds tout. Commit toutes les 30-45 min.
- **Faire confiance aveuglément au code généré** : surtout en Solidity. Lis chaque ligne. Comprends chaque fonction. Tu es responsable de ce qui est déployé.
- **Ne pas maintenir CLAUDE.md** : s'il devient obsolète, chaque nouvelle session repart de zéro.
- **Demander plusieurs tâches en parallèle** : Claude Code est meilleur sur des tâches focalisées. Une chose à la fois.
- **Ignorer les warnings/erreurs** : si quelque chose ne compile pas ou lance un warning, on règle **avant** de passer à la suite.
- **Coder sans tests** : un contrat sans tests est un contrat non déployable. Non négociable.

---

## La check-list avant chaque commit important

- [ ] Le code compile sans warning
- [ ] Les tests passent
- [ ] Aucun secret dans le code (vérifie `.env` bien dans `.gitignore`)
- [ ] CLAUDE.md à jour si nouvelle architecture
- [ ] DECISIONS.md à jour si décision technique prise
- [ ] Message de commit clair et au format Conventional Commits

---

## En résumé

1. Tu mets les docs dans `docs/`
2. Tu colles le prompt initial (étape 2)
3. Claude Code lit, synthétise, pose ses questions, crée la structure
4. À chaque session suivante : "Lis CLAUDE.md puis propose la prochaine tâche"
5. Tu décomposes, tu reviews, tu commits, tu challenges

C'est aussi simple que ça. Le gros effort est dans le setup initial — après ça roule.
