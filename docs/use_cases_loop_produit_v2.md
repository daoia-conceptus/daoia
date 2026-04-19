# Use Cases & Loop Produit — DAO d'Agents IA (v2)

> **Document complémentaire au cadrage stratégique v0.3.** Objectif : sortir de l'abstraction et montrer concrètement ce que la DAO **fait au quotidien**, comment l'utilisateur vit l'expérience, et pourquoi il revient.

> **Notes v2 :** suppression des récompenses en tokens pour le vote (sybil farming), onboarding en 2 temps avec opt-in pour les signaux on-chain, Sarah plus réaliste, Human Passport comme défaut PoP, framework de métriques en 3 seuils, ajout de la métrique clé "valeur ajoutée IA".

---

## 1. Le pivot narratif

L'erreur classique des projets "DAO + IA" est de présenter l'IA uniquement comme **exécutant** des décisions communautaires. Ça résout un vrai problème (la lenteur d'exécution des DAO), mais ça n'aide pas le problème **#1 des DAO** : *personne ne participe*.

Le bon framing est plus large :

> **Une DAO augmentée par l'IA**, où les agents t'aident à **comprendre, voter, et exécuter**.

Ton vrai produit n'est pas "des agents qui exécutent". Ton vrai produit est **une gouvernance enfin assez simple et assez rapide pour que des gens normaux participent**.

C'est **la phrase à mettre partout** : pitch, whitepaper, deck, landing page.

---

## 2. Deux familles d'agents

| Famille | Rôle | Pour qui ? |
|---|---|---|
| **Agents de gouvernance** | Aident à comprendre, voter, déléguer | L'utilisateur individuel |
| **Agents d'exécution** | Réalisent les actions votées | La communauté collectivement |

### Agents de gouvernance (différenciation principale)

- **Sage** — résume une proposition en 3 lignes adaptées à ton niveau
- **Simulator** — simule l'impact financier/produit (ex : "si on dépense 50k pour ça, voici l'effet sur le treasury")
- **Advocate** — présente les meilleurs arguments **pour ET contre**, sans recommandation de vote
- **Notifier** — t'alerte sur les votes qui matchent tes préférences explicites
- **Delegate Assistant** — t'aide à choisir un délégué humain qui vote dans ton sens

> **Principe directeur :** les agents de gouvernance **structurent** le débat, ils ne l'orientent pas. Aucun agent ne dit "vote pour" ou "vote contre". Ils fournissent contexte, données, arguments — la décision reste 100% humaine.

### Agents d'exécution (cœur du projet)

- **Marketing** — campagnes, contenu, social
- **Dev Ops** — PRs, déploiements, intégrations
- **Treasury** — transactions pré-validées (niveau C strict, cf. v0.3)
- **Moderation** — Discord/forum 24/7 selon règles votées
- **Research** — rapports d'analyse, due diligence

---

## 3. Sybil resistance — prérequis, pas patch

Toute la mécanique d'incitation et de gouvernance repose sur une chose : **distinguer un humain réel d'un farmer multi-wallet**. Sans ça, le système est gameable et les statistiques deviennent du bruit.

| Solution | Statut dans le projet |
|---|---|
| **Human Passport** (ex-Gitcoin Passport) | Brique principale, intégrée dès le MVP |
| **Réputation on-chain** (historique d'activité, ancienneté wallet) | Signal complémentaire |
| **Réputation interne** (votes passés, propositions réussies) | Construite progressivement |
| **World ID** | Option expérimentale uniquement, pas pilier |

C'est un prérequis architectural, pas un patch ajouté plus tard.

---

## 4. Use cases narrés (point de vue utilisateur)

### Use case 1 — Sarah découvre la DAO en 2 sessions

**Session 1 (jeudi soir, 90 sec)**
- Sarah, 28 ans, dev front-end, voit un post sur X qui parle du projet. Elle clique.
- Landing page : "Une DAO où l'IA t'aide à voter ET exécute pour toi". Bouton *Connect Wallet*.
- Connectée. Onboarding **étape 1** : "Quels sujets t'intéressent ?" → checkboxes (DeFi, infra, social, art, sécurité). Sarah coche DeFi et infra.
- Onboarding **étape 2** (optionnel) : "Veux-tu qu'on personnalise ton fil avec ton historique on-chain ? On ne stocke rien, c'est local." Sarah dit oui.
- L'app affiche 3 propositions actives correspondant à ses centres d'intérêt, résumées par l'agent **Sage** en 3 lignes chacune.
- Une attire son œil mais elle est fatiguée. Elle ferme l'app sans voter.

**Session 2 (dimanche matin, 3 min)**
- Notification : "La prop *Partenariat Uniswap v4* clôt dans 24h. 71% pour pour l'instant. Tu veux la voir ?"
- Sarah clique. Sage lui rappelle le résumé. Simulator affiche : "Coût 80k $GOVAI, ROI estimé +8% à T+12 selon hypothèses." Advocate présente 2 arguments pour, 2 contre.
- Sarah vote *Pour* en 90 secondes. Confirmation : "Tu peux suivre l'exécution si la prop passe."
- Pas de récompense en token. Mais elle débloque le **badge "First Voter"** et son score de réputation passe de 0 à 5.

**Pourquoi elle revient :** parce qu'elle a un **stake émotionnel** dans le résultat de SA prop. La notification est légitime (elle a voté), pas spammée. Pas de farming possible : pas de récompense liquide.

---

### Use case 2 — Marc propose une idée, les agents l'exécutent

Marc, contributeur actif depuis 2 mois, voit un manque : la DAO n'a pas de présence sur Farcaster.

- Il rédige une proposition : *"Lancer un compte Farcaster officiel + 1 cast/jour résumant l'activité de la DAO."*
- Il stake 500 $GOVAI (anti-spam, récupérables si la prop n'est pas spam).
- L'agent **Sage** reformule sa proposition pour qu'elle soit claire et structurée. Marc valide.
- Le vote dure 5 jours. Quorum atteint, 78% pour.
- **Action de niveau B (semi-autonome)** : l'agent **Marketing** crée le compte, prépare 7 casts pré-rédigés, attend approbation du council communautaire.
- 24h plus tard, council approuve. L'agent publie le premier cast.
- Pendant 30 jours, l'agent publie quotidiennement, répond aux mentions selon des règles votées.
- Tableau de bord public : engagement, croissance, coût.
- Marc récupère son stake. Il gagne le badge **"Successful Proposer"** et son score de réputation augmente significativement, ce qui débloque l'accès à des proposals plus engageantes (par exemple, propositions multi-milestones).

**Ce qui est puissant :** entre l'idée et l'exécution, il s'est passé **6 jours**. Dans une DAO classique, ça aurait pris 3 mois.

---

### Use case 3 — La DAO finance un développeur externe

Lina, dev backend, repère le projet et veut contribuer. Elle propose une feature précise : *"Ajouter un module d'analytics on-chain pour tracker l'utilisation des agents."*

- Elle soumet sa proposition avec : devis (3 000 $GOVAI), milestones (3 livraisons sur 6 semaines), portfolio.
- L'agent **Research** vérifie son GitHub, score sa réputation on-chain (Human Passport, contributions historiques).
- L'agent **Sage** résume la prop : "Dev senior crédible, devis dans la moyenne du marché, livrable utile pour la trésorerie."
- Vote passe à 71%.
- **Action de niveau C (mandat strict)** : escrow on-chain créé avec paramètres exacts votés (montant figé, milestones figés, deadline figée, adresse Lina figée, hash on-chain).
- Lina livre milestone 1. L'agent **Dev Ops** vérifie : tests passent, PR mergée, déploiement OK.
- Le Policy Engine valide → 1000 $GOVAI libérés à Lina via le Safe.
- Idem pour milestones 2 et 3.

**Ce qui est puissant :** Lina est payée **automatiquement** quand elle livre, sans courir derrière qui que ce soit. La DAO obtient une feature sans embaucher. Le tout est auditable on-chain.

---

### Use case 4 — Décision stratégique structurée par l'IA

Le council propose : *"Faut-il étendre la DAO sur Solana en plus de Base ?"* Décision lourde, controversée.

- L'agent **Research** produit en 48h un rapport de 15 pages : coûts, opportunités, risques, benchmarks. **Le rapport présente les faits, pas une recommandation.**
- L'agent **Simulator** modélise 3 scénarios (extension complète, partielle, statu quo) avec impacts treasury et adoption sur 12 mois. **Toutes les hypothèses sont explicites et challengeables par la communauté.**
- L'agent **Advocate** publie deux posts opposés, défendant chaque camp avec les meilleurs arguments humains exprimés sur Discord. **Pas d'opinion IA, juste de la mise en forme structurée des positions humaines.**
- Un débat communautaire structuré s'organise pendant 7 jours sur Discord, modéré par l'agent **Moderation** (anti-spam, anti-harcèlement, pas de modération de fond).
- L'agent **Sage** publie quotidiennement un résumé du débat pour les votants pressés.
- Vote final : 5 jours, 18% de participation (élevé pour ce type de décision).
- Décision : extension partielle (proof-of-concept de 6 mois sur Solana).

**Ce qui est puissant :** dans une DAO classique, ce type de décision serait soit prise par 5 personnes du Discord, soit jamais tranchée. Ici, **l'IA fournit le contexte qui permet à des centaines de personnes de voter intelligemment** — sans jamais leur dire quoi voter.

---

### Use case 5 — Un agent dérive, la communauté reprend la main

L'agent **Marketing** publie un cast qui contient une formulation maladroite et un peu agressive envers un projet concurrent. Bad buzz commence.

- 3 utilisateurs flag le contenu via un bouton *Report Agent Action* dans l'app.
- Le seuil de 3 reports déclenche un **freeze automatique** de l'agent Marketing (cooldown 24h).
- Une proposition d'urgence est soumise : *"Doit-on désactiver durablement l'agent Marketing v2.3 et rollback à v2.2 ?"*
- Vote accéléré (24h, quorum réduit).
- Vote passe : agent désactivé, version précédente réactivée, post supprimé, communiqué communautaire publié.
- Post-mortem produit par l'agent **Sage** : "Voici ce qui s'est passé, voici la règle qui a manqué dans le Policy Engine, voici la correction proposée."
- Nouvelle proposition pour patcher la règle.

**Ce qui est puissant :** le système n'est pas magique, **il est récupérable**. C'est exactement ça qui rassure investisseurs et juristes.

---

## 5. Loop produit (le cœur)

```
┌────────────────────────────────────────────────────────────┐
│  ÉTAPE 1 — DÉCOUVERTE                                       │
│  User arrive via X, Discord, contenu, ami                   │
│  → landing page claire, pitch en 1 phrase                   │
└────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────┐
│  ÉTAPE 2 — ONBOARDING EN 2 TEMPS (60-90 sec)                │
│  ① Préférences déclaratives (centres d'intérêt cochés)      │
│  ② Personnalisation optionnelle via signaux wallet (opt-in) │
│  → fil personnalisé, pas de récompense liquide              │
└────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────┐
│  ÉTAPE 3 — PREMIÈRE EXPLORATION (variable)                  │
│  Lecture des résumés Sage, exploration sans pression        │
│  → l'utilisateur peut partir sans voter, c'est OK           │
└────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────┐
│  ÉTAPE 4 — RAPPEL CONTEXTUEL (J+1 à J+3)                    │
│  Notif sur les votes qui clôturent + qui matchent intérêts  │
│  → friction d'ouverture minimale, retour naturel            │
└────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────┐
│  ÉTAPE 5 — PREMIER VOTE                                     │
│  Sage résume + Simulator évalue + Advocate argumente        │
│  → user vote en 60-90 sec, badge First Voter, rep score 5   │
└────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────┐
│  ÉTAPE 6 — RETENTION (J+3 à J+14)                           │
│  Notif : "Ta prop a passé, l'agent agit, voici l'avancée"   │
│  → user revient pour voir l'exécution en direct             │
└────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────┐
│  ÉTAPE 7 — IMPLICATION (semaine 2-4)                        │
│  User propose lui-même, devient délégué, ou contributeur    │
│  → identité on-chain construite (rep score, badges)         │
│  → accès progressif débloqué (proposals plus engageantes)   │
└────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────┐
│  ÉTAPE 8 — VALEUR ÉMOTIONNELLE & VIRALITÉ                   │
│  User voit son impact concret, parle du projet à d'autres   │
│  → boucle de référence (référer = quête de réputation)      │
└────────────────────────────────────────────────────────────┘
```

### Mécaniques d'incitation (sans token bonus liquide)

> **Principe :** ne jamais payer une action légère en tokens liquides. Le token paie le travail réel et la réputation, pas le clic.

- **Badges on-chain** (NFT non-transférables) : First Voter, Successful Proposer, Active Delegate, Crisis Responder, etc.
- **Réputation chiffrée** : score qui s'accumule via votes participés, propositions réussies, délégations bien évaluées
- **Accès progressif** : plus le score est haut, plus tu peux soumettre de propositions à fort impact (anti-spam adaptatif), participer à des votes confidentiels, accéder à du tooling avancé
- **Récompenses différées et conditionnelles** : à 6 et 12 mois, distribution de tokens vers les utilisateurs ayant prouvé une participation soutenue ET non-sybile (validée Human Passport + scoring comportemental)
- **Contributions validées** : payer le travail réel (dev, design, recherche), pas le vote

---

## 6. Métriques de succès — framework 3 seuils

> **Position assumée :** les cibles ambitieuses sont la raison d'être du projet. Si on accepte d'avance les targets médianes des DAO actuelles (5-10% de participation), on n'a pas de thèse différenciée. Mais on doit savoir reconnaître les seuils intermédiaires.

### Métriques de gouvernance

| Métrique | Échec | Signal mitigé | Cible produit | Excellence |
|---|---|---|---|---|
| Participation aux votes | <10% | 10-20% | 25% | >40% |
| Temps moyen pour voter une prop | >5 min | 2-5 min | <90 sec | <60 sec |
| Activation (1er vote / nouveaux connectés à J+30) | <15% | 15-30% | 50% | >70% |
| Retention J+7 | <10% | 10-25% | 35% | >50% |
| Retention J+14 | <5% | 5-15% | 25% | >40% |

### Métriques d'exécution

| Métrique | Échec | Signal mitigé | Cible produit | Excellence |
|---|---|---|---|---|
| % propositions exécutées en <7 jours | <40% | 40-60% | >70% | >85% |
| Coût moyen d'exécution par prop | >100 $GOVAI | 50-100 | <50 | <20 |
| Incidents Policy Engine majeurs | >2/an | 1-2 | 0 | 0 |

### Métriques de confiance (qualitatives, sondées trimestriellement)

| Métrique | Cible produit |
|---|---|
| % users qui jugent les résumés Sage fiables | >75% |
| % users qui comprennent pourquoi un agent a agi | >80% |
| NPS communauté | >40 |

### LA métrique clé (à instrumenter en priorité)

**% de votes réalisés après lecture d'un résumé IA vs sans aide IA.**

C'est la métrique qui dira si les agents de gouvernance créent vraiment de la valeur. Si elle est > 60%, tu as un produit. Si elle est < 30%, soit les résumés sont mauvais, soit les utilisateurs n'en ont pas besoin et la thèse est à revoir.

À mesurer dès la phase testnet, sur chaque proposition.

---

## 7. Anti-patterns à éviter

- **Sur-tokenisation des actions légères** : voter, lire, cliquer ne doivent jamais payer en tokens liquides. Sinon = sybil farming garanti.
- **Profilage agressif au premier écran** : la lecture de l'historique on-chain doit être en opt-in, pas par défaut.
- **Trop de propositions actives** : limite à 10-15 propositions actives simultanées. Au-delà, l'agent Sage filtre par pertinence pour chaque user.
- **Recommandations IA orientées** : aucun agent ne doit dire "vote pour". Risque de manipulation perçue + risque réglementaire.
- **Notifications spam** : préférences fines obligatoires. Une notif par jour max par défaut.
- **Agents qui parlent au nom de la DAO sans approbation** : tout contenu publié au nom officiel = niveau B minimum (approbation humaine).
- **Sybil resistance traitée comme un patch** : doit être intégrée dès le MVP, pas ajoutée plus tard.
- **Métriques vanity** : nombre de wallets connectés ≠ utilisateurs actifs ≠ humains uniques. Toujours filtrer via Human Passport.

---

## 8. Ce qu'il faut tester en priorité (testnet)

1. **Use case 1 (Sarah)** — est-ce que des inconnus reviennent en J+3 après une première session sans vote ?
2. **Use case 2 (Marc)** — est-ce que la rapidité d'exécution génère de l'enthousiasme et des propositions de qualité ?
3. **Métrique clé** — est-ce que les votes assistés par IA dépassent 60% du total ?
4. **Onboarding 2 temps** — quel taux d'opt-in à l'étape 2 (signaux wallet) ?
5. **Loop retention** — taux de retour J+3, J+7, J+14
6. **Sybil resistance** — combien de wallets doublons détectés malgré Human Passport ?

Si ces 6 tests passent au testnet, **le projet a une chance**. S'ils échouent, peu importe la qualité du Policy Engine ou du whitepaper.

---

## En résumé

- Le projet n'est plus "DAO + IA exécutant" mais **DAO augmentée par l'IA**, où les agents structurent le débat sans l'orienter
- 5 use cases concrets et racontables, du onboarding réaliste à la gestion de crise
- Loop produit en 8 étapes, avec récompenses **par badge et réputation, jamais par token liquide pour les actions légères**
- Sybil resistance comme prérequis architectural (Human Passport)
- Métriques en 3 seuils (échec / mitigé / cible / excellence) — cible ambitieuse car c'est la thèse du projet
- Métrique clé à instrumenter : **% de votes assistés par IA**
- Anti-patterns identifiés pour ne pas reproduire les erreurs des DAO existantes

**Prochain livrable utile** : pitch deck investisseur (10 slides) qui s'appuie sur ce framing + le doc stratégique v0.3.

---

## Changelog v1 → v2

- **Récompenses de vote** : suppression des tokens bonus pour vote/proposition (sybil farming), remplacés par badges, réputation, accès progressif, récompenses différées conditionnelles
- **Onboarding** : passage en 2 temps (préférences déclaratives → signaux wallet en opt-in)
- **Sarah** : parcours en 2 sessions (ne vote pas forcément en première visite, revient via notification)
- **Use case 4 (Solana)** : précision que l'IA structure le débat, ne l'oriente pas (pas de recommandation, juste mise en forme des positions humaines)
- **Sybil resistance** : section dédiée, Human Passport comme défaut, World ID en option expérimentale
- **Métriques** : framework 3 seuils (échec / mitigé / cible / excellence) au lieu d'une cible unique
- **Métrique clé ajoutée** : % de votes réalisés après lecture d'un résumé IA vs sans
- **Anti-patterns** : ajout de "sybil resistance comme prérequis" et "métriques vanity"
