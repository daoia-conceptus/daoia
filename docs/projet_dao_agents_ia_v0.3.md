# Projet DAO d'Agents IA — Document stratégique v0.3

> **Pitch :** Une DAO opérationnelle où des agents IA exécutent la volonté collective des détenteurs du token de gouvernance. Architecture gouvernable, auditable, et prête pour la transition post-quantique en phase 2.

> **Notes v0.3 :** Cette version durcit le niveau C du Policy Engine, neutralise la formulation tokenomics/légal pour permettre une revue juridique sereine, et constitue la base prête à servir de fondation au whitepaper v0.5.

---

## Sommaire

1. [Architecture détaillée](#1-architecture-détaillée)
2. [Policy Engine — pièce maîtresse](#2-policy-engine--pièce-maîtresse)
3. [Roadmap MVP → testnet → mainnet](#3-roadmap-mvp--testnet--mainnet)
4. [Tokenomics v0.3](#4-tokenomics-v03)
5. [Cadre légal & structure juridique](#5-cadre-légal--structure-juridique)
6. [Verdict & prochaines étapes](#6-verdict--prochaines-étapes)

---

## 1. Architecture détaillée

### Vue d'ensemble (4 couches)

```
┌─────────────────────────────────────────────────────────────┐
│  COUCHE 1 — INTERFACE UTILISATEUR (Frontend dApp)           │
│  Next.js + RainbowKit/Privy + Wagmi                          │
│  • Soumission idées  • Vote  • Dashboard agents  • Trésorerie│
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│  COUCHE 2 — ON-CHAIN (Base, L2 Ethereum)                     │
│  • $GOVAI Token (ERC-20Votes)                                │
│  • Governor (OpenZeppelin Governor + Timelock)               │
│  • Treasury (Safe multisig + Zodiac modules)                 │
│  • AgentRegistry (registre simple v1, NFT en v1.5)           │
│  • ActionExecutor (whitelist d'appels pré-autorisés)         │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│  COUCHE 3 — POLICY ENGINE & ORCHESTRATION (off-chain)        │
│  • Policy Engine (cf. section 2 — pièce maîtresse)           │
│  • Task Queue (Redis/Temporal)                               │
│  • Event Listener (votes acceptés → déclenche agents)        │
│  • Audit Log (signé + horodaté + hash on-chain)              │
│  • Human-in-the-loop interface (approbations niveau B)       │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│  COUCHE 4 — AGENTS IA (workers isolés)                       │
│  • LLM (Claude, GPT-4, modèles open via Together)            │
│  • Frameworks : Eliza, LangGraph ou stack custom             │
│  • RAG sur contexte DAO (propositions, votes, historique)    │
│  • Sandbox d'exécution (Docker isolé, pas d'accès clés prod) │
│  • Outils whitelistés : GitHub, X/Twitter, Discord, RPC read │
└─────────────────────────────────────────────────────────────┘
```

### Composants on-chain — précisions

**Token de gouvernance — `$GOVAI` (placeholder)**
- Standard ERC-20Votes (snapshot de balance par bloc, support délégation native)
- Déployé sur Base, bridge possible vers Ethereum mainnet plus tard
- Minting réservé au Treasury via vote (cap inflation 5%/an max, voté en v2)

**Governor**
- OpenZeppelin Governor + Timelock Controller (délai 48h après vote OK)
- **Quorum initial : 4% de la total supply au snapshot** (`GovernorVotesQuorumFraction` standard). Une logique custom basée sur supply circulante ou tokens délégués pourra être étudiée en v2.
- **Proposal threshold : à fixer après simulation de distribution** sur 3 scénarios (forte concentration whales, distribution équilibrée, faible participation). Estimation initiale 0,1% de la supply, à valider sur testnet.
- Vote 1 token = 1 voix en MVP. Vote quadratique avec preuve d'humanité (Gitcoin Passport, Worldcoin) à l'étude pour v2.

**Treasury**
- Safe multisig 5/9 au démarrage (équipe + community council élu)
- Zodiac Reality Module : exécution conditionnelle après vote validé
- Plafonds programmés : un agent ne peut jamais déclencher plus que les limites définies par le Policy Engine sans nouveau vote

**AgentRegistry (v1 simplifié, NFT en v1.5)**
- Registre on-chain simple en MVP : mapping `agentId → {permissions, version, promptHash, status, owner}`
- Évolution v1.5 vers NFT : permet ownership transférable, marketplace d'agents, et meilleure traçabilité narrative
- Possibilité de "désactiver" un agent par vote en cas de dérive

### Anti-concentration du voting power

Approche multi-couches plutôt qu'un cap dur facilement contournable :

- **Distribution structurelle** : pas d'allocation > 5% à un seul investisseur en seed, vesting long pour l'équipe (4 ans)
- **Délégation incitée** : programme de récompenses pour les délégués actifs avec < X tokens, pour favoriser une diversité de représentants
- **Proof-of-personhood** (en v2) : pondération du vote par identité humaine vérifiée via Gitcoin Passport ou Worldcoin
- **Vote quadratique** (en v2) : sqrt(tokens) au lieu de tokens, dilue mécaniquement les whales
- **Transparence** : dashboard public des concentrations de voting power, alertes au-delà de seuils

---

## 2. Policy Engine — pièce maîtresse

> C'est la pièce qui décide si oui ou non un agent IA peut effectuer une action. Tout le reste de la sécurité du système en dépend. **À traiter comme du code critique de niveau bancaire.**

### Trois niveaux d'exécution des agents

| Niveau | Type d'action | Mécanisme | Exemples |
|---|---|---|---|
| **A — Autonome** | Non financière, non engageante | Exécution directe après contrôle Policy Engine | Publier un résumé, faire de la recherche, répondre à un support, générer un rapport |
| **B — Semi-autonome** | Engageante mais réversible | Approbation humaine (council ou modérateur) avant exécution | Publier au nom de la DAO sur X, ouvrir une PR sur le repo public, contacter un partenaire |
| **C — Sous mandat strict** | Financière ou irréversible | Exécution mécanique d'une séquence pré-décidée (cf. règles de durcissement ci-dessous) | Verser un grant à une adresse votée, exécuter un buyback dans une fenêtre votée, signer un contrat dont les termes sont on-chain |

**Aucun agent ne peut JAMAIS** :
- Déplacer librement des fonds du treasury
- Modifier sa propre configuration ou ses permissions
- Désactiver le Policy Engine, le Timelock ou le Safe
- Exécuter une action de niveau C sans hash de proposition validée

### Durcissement du niveau C (règles non négociables)

Pour toute action de niveau C, **l'agent ne décide pas, il déclenche une séquence déjà décidée**. Cela impose :

- **Paramètres déterministes** : tous les paramètres de la transaction (destinataire, montant, calldata, deadline) sont fixés au moment du vote, pas calculés à l'exécution
- **Hash on-chain** : le tuple complet des paramètres est hashé et stocké on-chain dès l'approbation du vote
- **Fenêtre temporelle bornée** : exécution possible uniquement entre `T_start` et `T_end` définis dans le vote
- **Bénéficiaire figé** : l'adresse de destination est immuable, l'agent ne peut pas la modifier ni la résoudre dynamiquement
- **Montant max figé** : valeur maximale immuable, jamais un pourcentage ou une formule dynamique
- **Nonce unique** : chaque action C est accompagnée d'un nonce qui empêche la ré-exécution
- **Simulation obligatoire** : la transaction est simulée (eth_call ou Tenderly) juste avant l'envoi, et n'est exécutée que si la simulation réussit avec un état attendu
- **Vérification finale** : avant signature, le Policy Engine recalcule le hash de tous les paramètres et le compare au hash on-chain. **Toute dérive d'un seul paramètre = abort + alerte + log**

### Architecture du Policy Engine

```
Action proposée par un agent
            │
            ▼
┌───────────────────────────┐
│ 1. Vérification syntaxe   │  → format de l'action conforme ?
└───────────────────────────┘
            │
            ▼
┌───────────────────────────┐
│ 2. Niveau d'autorisation  │  → A, B ou C ? Permissions agent suffisantes ?
└───────────────────────────┘
            │
            ▼
┌───────────────────────────┐
│ 3. Plafonds & quotas      │  → montant, fréquence, destinataires whitelistés ?
└───────────────────────────┘
            │
            ▼
┌───────────────────────────┐
│ 4. Cohérence avec mandat  │  → action dérive du vote source ? (matching sémantique + paramètres)
└───────────────────────────┘
            │
            ▼
┌───────────────────────────┐
│ 5. Anti-replay & nonce    │  → action déjà exécutée ? nonce valide ?
└───────────────────────────┘
            │
            ▼
┌───────────────────────────┐
│ 6. (niveau C) Hash check  │  → hash des paramètres = hash on-chain ?
│    + simulation           │  → simulation réussie ?
└───────────────────────────┘
            │
            ▼
   ✅ APPROUVÉ        ❌ REJETÉ + alerte + log on-chain
            │
            ▼
   Exécution (A direct, B après approbation, C via Safe)
            │
            ▼
   Hash du résultat ancré on-chain pour audit
```

### Implémentation recommandée

- **Moteur de règles** : Open Policy Agent (OPA) ou Cedar (AWS, plus récent). Règles déclaratives, versionnées, auditables.
- **Tests adversariaux** : red team interne + bug bounty dédié au contournement du Policy Engine
- **Kill switch** : un vote d'urgence (quorum réduit, délai accéléré) peut désactiver tous les agents en moins de 2h
- **Logs immuables** : chaque décision (approbation et rejet) est loggée, hashée et ancrée on-chain quotidiennement (via Merkle root pour économiser le gas)

### Surface d'attaque à anticiper

| Vecteur | Mitigation |
|---|---|
| Prompt injection via input utilisateur | Sanitization + LLM secondaire de classification + isolation contexte |
| Manipulation des sources RAG | Sources signées + scoring de confiance + diversification |
| Hallucination paramètres transaction | Vérification stricte côté Policy Engine, l'agent ne peut pas "inventer" une adresse |
| Collusion entre agents | Limites par groupe d'agents, pas seulement individuelles |
| Exfiltration de clés | Aucune clé prod dans le sandbox de l'agent, signatures via HSM ou MPC |

---

## 3. Roadmap MVP → testnet → mainnet

### Vue d'ensemble — 12 à 18 mois pour un lancement propre

> **Réalisme :** 12 mois est ambitieux. Une cible 12-18 mois est plus honnête. Le danger n'est pas de prendre 3 mois de plus, c'est de lancer un token avant que la boucle produit soit convaincante.

| Phase | Durée | Livrable | Équipe |
|---|---|---|---|
| **0 — Foundation** | M1–M2 | Specs, équipe, structure légale | 2-3 |
| **1 — Build alpha** | M3–M6 | MVP testnet privé | 4-6 |
| **2 — Testnet public** | M7–M10 | Beta ouverte + agents v1 | 6-8 |
| **3 — Audit & prep** | M11–M14 | Audits + tokenomics finalisée | 8-10 |
| **4 — TGE & Mainnet** | M15–M18 | Lancement token + DAO live | 10+ |
| **5 — Post-quantique** | Y2+ | Wallet PQ-safe ou appchain | 12+ |

### Détail par phase

**Phase 0 — Foundation (M1–M2)**
- Constituer l'équipe core (smart contract dev, AI engineer, fullstack, ops, legal)
- Choisir la juridiction et créer la structure (cf. section 5)
- Whitepaper v0.5 (technique + tokenomics + vision)
- Setup outils : GitHub org, Notion, Discord, monitoring
- Premier round de levée si nécessaire (pre-seed F&F ou angels crypto)

**Phase 1 — Build alpha (M3–M6)**
- Smart contracts v1 déployés sur Base Sepolia
- Frontend MVP : login wallet, soumission propositions, vote
- Policy Engine v1 avec règles minimales et 3 niveaux A/B/C en place
- 1 agent IA fonctionnel (use case simple : résumé hebdo des propositions)
- Tests internes avec ~20 personnes

**Phase 2 — Testnet public (M7–M10)**
- Ouverture beta publique sur Base Sepolia
- 3-5 agents IA avec capacités étendues (modération, recherche, outreach)
- Programme bug bounty (Immunefi)
- 500-2000 testeurs actifs, faux tokens distribués pour simuler la gouvernance
- **Simulation de la distribution** : ajuste le proposal threshold et le quorum sur données réelles
- Itération basée sur feedback (UX, gouvernance, comportement agents)

**Phase 3 — Audit & prep (M11–M14)**
- **Audit smart contracts** par minimum 2 firmes (Trail of Bits, OpenZeppelin, Cantina). Budget 80-200k USD
- **Audit Policy Engine + IA red team** (Robust Intelligence, Lakera ou équivalent)
- Tokenomics finalisée + due diligence légale (cf. section 5)
- Préparation listing : market makers, exchanges (Coinbase, Kraken si éligible)
- Documentation publique complète, FAQ, vidéos

**Phase 4 — TGE & Mainnet (M15–M18)**
- Déploiement contrats sur Base mainnet
- TGE avec distribution selon plan (cf. section 4)
- Listing DEX (Uniswap, Aerodrome sur Base) puis CEX progressivement
- Première proposition officielle (souvent : ratifier la constitution et le budget Y1)
- Activation des agents IA en production avec contraintes maximales

**Phase 5 — Post-quantique (Year 2+)**
- Trois options à évaluer selon traction et signaux marché :
  - **A.** Intégrer wallet/account abstraction PQ-safe (co-signature ECDSA + Dilithium via ERC-4337)
  - **B.** Sidechain ou appchain dédiée (OP Stack avec module PQ custom, ou migration Algorand)
  - **C.** Partenariat avec une chaîne PQ existante (Algorand, QRL) pour bridge

---

## 4. Tokenomics v0.3

> **Note de cadrage :** la formulation ci-dessous est volontairement neutralisée juridiquement. Les mécanismes économiques décrits sont des **options de design produit**, dont le maintien dans la version finale dépendra d'une legal opinion spécifique sur la qualification du token, du staking et des flux de valeur.

### Paramètres généraux

| Élément | Valeur |
|---|---|
| Nom (placeholder) | `$GOVAI` |
| Supply totale | 1 000 000 000 (1 milliard) |
| Standard | ERC-20Votes (Base) |
| Inflation | 0% au lancement, mintable par vote uniquement (cap 5%/an max) |
| Decimals | 18 |

### Distribution

| Allocation | % | Tokens | Vesting |
|---|---|---|---|
| Community Treasury (DAO) | 40% | 400M | Débloqué linéairement sur 4 ans, géré par vote |
| Équipe & contributeurs core | 15% | 150M | Cliff 12 mois, vesting linéaire 36 mois |
| Investisseurs (seed + private) | 15% | 150M | Cliff 12 mois, vesting linéaire 24 mois |
| Liquidité initiale (DEX) | 10% | 100M | Locked 24 mois minimum |
| Ecosystem grants & partnerships | 10% | 100M | Débloqué selon besoins, vote requis |
| Airdrop early users / testnet | 5% | 50M | 25% TGE, 75% sur 12 mois |
| Public sale (LBP ou IDO) | 5% | 50M | 100% liquide au TGE |

### Utilité du token (fonctions principales)

1. **Gouvernance** — voter sur les propositions, déléguer son pouvoir de vote
2. **Anti-spam** — staker un montant minimum pour soumettre une proposition (récupérable si non-spam)
3. **Paiement de services agents** — les utilisateurs payent en `$GOVAI` pour faire exécuter des tâches par les agents (compute, génération de contenu, recherche)
4. **Participation active à la gouvernance** — des mécanismes de récompense pour les stakers actifs (vote, délégation) sont à l'étude. Leur design final dépendra de l'analyse juridique pré-TGE.

### Mécanismes économiques envisagés (options de design)

Les mécanismes suivants sont envisageables du point de vue produit. Des précédents de marché existent, mais ils ne valent pas validation réglementaire pour ce projet. Leur maintien, leur design exact, et leur formulation finale dépendront d'une legal opinion spécifique.

- **Burn partiel des frais** : une fraction des frais perçus par les agents pourrait être brûlée
- **Buyback discrétionnaire par vote** : le treasury pourrait, sur vote de la DAO, racheter du `$GOVAI` sur le marché secondaire. Aucun buyback automatique ou garanti — toujours soumis à gouvernance.
- **Distribution conditionnée à la participation active** : tout flux de valeur vers les holders nécessiterait une participation active (staking + vote + délégation), pas un détention passive

L'**objectif de design** est d'éviter un profil assimilable à un instrument financier au sens MiFID, sous réserve d'analyse juridique spécifique.

> **À faire pré-TGE :** revue juridique dédiée des mécanismes économiques par avocat crypto-spécialisé, opinion juridique écrite (legal opinion) à présenter aux exchanges et investisseurs.

### Anti-whale et fairness

- Cap à 5% de l'allocation seed pour un seul investisseur
- Vesting structurel de 24-48 mois pour les gros holders initiaux
- Programme d'incitation à la délégation vers les petits délégués actifs
- Vote quadratique + proof-of-personhood en v2 (cf. section 1)

---

## 5. Cadre légal & structure juridique

> ⚠️ Synthèse stratégique, pas un avis juridique. Tu auras besoin d'un avocat spécialisé crypto (idéalement français + suisse/maltais selon structure choisie). Compte 30-80k EUR de frais légaux pour faire les choses correctement dès le départ.

### MiCA — l'essentiel pour ton projet

MiCA est en application complète depuis le 30 décembre 2024 dans l'UE. Trois catégories de tokens :

- **ART** (Asset-Referenced Token) — adossé à plusieurs actifs → non applicable
- **EMT** (E-Money Token) — adossé à une monnaie fiat → non applicable
- **Autres crypto-assets** (utility, governance) — **catégorie probable de `$GOVAI`**

Obligations principales pour la catégorie "autres" :
- **Whitepaper conforme MiCA** (Annexe I, format imposé) à publier et **notifier à l'autorité compétente** (AMF en France) avec un préavis avant publication
- ESMA tient un registre central des whitepapers MiCA notifiés. **Important** : les whitepapers listés ne sont pas approuvés par l'autorité, la responsabilité du contenu reste chez l'émetteur.
- Pas d'agrément CASP requis pour l'émission elle-même, mais obligatoire pour fournir des services de custody, exchange, etc.
- Marketing communications : loyales, claires, non trompeuses, identifiables comme commerciales
- Régime de responsabilité civile pour informations erronées

### Risque "security/instrument financier" — à éviter

Au-delà de MiCA, un token de gouvernance peut être requalifié en instrument financier (régime MiFID, beaucoup plus lourd) si :
- Promesse de rendement passive sans contrepartie active
- Forte centralisation de l'équipe sur les décisions économiques
- Marketing axé sur la spéculation et les gains

**Mitigations structurelles** (à implémenter dans le design, pas seulement dans la com) :
- Utility et gouvernance comme cas d'usage principaux et démontrables
- Décentralisation progressive crédible avec roadmap publique de transfert de pouvoir au DAO
- Aucun "buyback garanti", uniquement "buyback si voté par la DAO"
- Conditions de distribution liées à une participation active
- Note : les disclaimers seuls ("ce token n'est pas un investissement") n'offrent aucune protection juridique réelle. C'est la **structure** qui protège, pas la formule.

### Structure juridique recommandée

```
┌──────────────────────────────────────┐
│  FOUNDATION / ASSOCIATION             │
│  (Suisse, Liechtenstein ou Cayman)    │
│  → Détient le protocole, le token,    │
│    publie le whitepaper, gère le DAO  │
└──────────────────────────────────────┘
                  │
                  │ contrat de service
                  ▼
┌──────────────────────────────────────┐
│  LABS / OPERATING ENTITY              │
│  (France SAS, Estonia OÜ, Portugal)   │
│  → Emploie l'équipe, développe        │
│    le code, fournit le support        │
└──────────────────────────────────────┘
```

**Choix de juridiction Foundation :**

| Juridiction | Avantages | Inconvénients |
|---|---|---|
| **Suisse (Zoug)** | Cadre clair, FINMA mature, forte crédibilité | Coûteux (50-100k CHF setup) |
| **Liechtenstein** | TVTG (loi blockchain dédiée), agile, dans EEA | Moins reconnu |
| **Iles Caïmans** | Foundation Company flexible, neutre fiscalement | Image "offshore", durcissement réglementaire |
| **Émirats (ADGM/VARA)** | Cadre crypto récent et favorable | Loin culturellement |

Pour un projet européen avec ambition mondiale → **Suisse ou Liechtenstein** sont les plus solides.

### Restrictions à prévoir dès le départ

- **Géoblocage** : exclure US (sauf accredited investors avec Reg D), Chine, pays sous sanctions OFAC
- **KYC/AML à calibrer avec le cabinet conseil** selon la structure exacte de la sale, la juridiction, les contreparties et les seuils applicables
- **Conditions générales** robustes, signées via wallet à la première interaction
- **Documentation des risques** publiée et accessible

### Checklist légale minimale avant TGE

- [ ] Structure juridique constituée et opérationnelle
- [ ] Whitepaper MiCA-compliant validé par avocat
- [ ] Notification AMF (ou équivalent national) effectuée selon procédure et préavis
- [ ] Legal opinion écrite sur la qualification du token et des mécanismes économiques
- [ ] Audit smart contracts complété et publié
- [ ] CGU / Terms of Service accessibles et acceptables on-chain
- [ ] Politique KYC/AML calibrée avec le cabinet conseil
- [ ] Restrictions géographiques implémentées dans le frontend et le contrat de sale
- [ ] Documentation des risques publiée

---

## 6. Verdict & prochaines étapes

### Ce qui rend ton projet défendable

1. **Boucle produit claire** : DAO + agents IA n'est pas qu'un narratif, ça résout un problème réel (lenteur d'exécution des DAO traditionnelles)
2. **Architecture sécurisée par design** : Policy Engine + niveaux A/B/C + Safe + Timelock = défense en profondeur
3. **Différenciation post-quantique** : narratif fort, sans bloquer l'exécution de phase 1
4. **Tokenomics volontairement modulable** : structure prête à s'adapter à la legal opinion sans dynamiter le modèle économique

### Ce qui peut tuer le projet

1. **Une seule action agent qui draine le treasury** → c'est pour ça que le Policy Engine doit être ton obsession
2. **Un mauvais cadrage légal** → MiCA + qualification token, à valider avant tout marketing public
3. **Un TGE prématuré** → si la boucle produit n'est pas convaincante, le token tombe, la DAO meurt
4. **Une équipe sans expertise crypto profonde** → la sécurité ne s'improvise pas

### Prochaines étapes (par priorité)

À ce stade, **le document de cadrage est mature**. Les prochains livrables doivent être de nature différente, pas une v0.4 du même document :

1. **Specs techniques détaillées du Policy Engine** (le plus critique techniquement)
2. **Whitepaper v0.5** (utilisant ce document comme base, formaté MiCA-compliant)
3. **Modèle financier prévisionnel** (runway, coûts dev, valorisation cible)
4. **Pitch deck investisseurs** (10-15 slides pour pré-seed)
5. **Plan growth communauté** (Discord/X, 6 mois pré-lancement minimum)
6. **Premier contact avocat crypto** (ne pas attendre)

---

## Changelog v0.2 → v0.3

- **Policy Engine niveau C** : durcissement complet (paramètres déterministes, hashés, simulés, fenêtre temporelle, bénéficiaire et montant figés, nonce unique, vérification finale avant signature)
- **Policy Engine** : ajout d'une étape 6 dans le flow pour le hash check + simulation niveau C
- **Tokenomics** : suppression des références aux précédents marché comme argument juridique, reformulation des mécanismes économiques comme "options de design" sous réserve de legal opinion
- **Tokenomics** : "hors du champ des instruments financiers" remplacé par "objectif de design ... sous réserve d'analyse juridique"
- **Légal** : suppression du seuil 1000 EUR, remplacé par "à calibrer avec le cabinet conseil"
- **Légal** : ajout de la précision ESMA (whitepapers listés ≠ approuvés par l'autorité)
- **Prochaines étapes** : explicitement marquées comme livrables différents, pas une v0.4 du même doc
