# Landing wireframe v1 — DAOIA

> **Livrable de pré-code.** Structure, composants, tonalité, stack visuelle. Aucun code à ce stade — ce document doit permettre de lancer `pnpm create next-app` dans `frontend/` sans friction.
>
> **Visiteur cible principal :** dev crypto early-stage, curieux, qui vient de X/Discord ou d'un lien envoyé par un pair. Pas d'investisseur dans cette v1.
>
> **CTA principal unique :** rejoindre le Discord. Secondaires : star le repo GitHub, follow sur X.
>
> **Ton :** sobre, précis, un peu technique. Référence de cadrage : *Linear > Apple, Vercel > Shopify*.

---

## 1. Arborescence des pages

### Must-have (v1)

| Route | Purpose | Remarques |
|---|---|---|
| `/` | Homepage : pitch + problème + solution + flow + principes + CTA | Seule route qui doit être parfaite pour la v1. Le reste sert cette route. |
| `/principles` | Page dédiée aux principes non négociables (version publique, sobre, 1 écran scrollable) | Sert de point d'ancrage pour le lien dans le header, la homepage, et toute mention future des "garde-fous". Réécriture publique de la section "Principes non négociables" de `CLAUDE.md`. Double bénéfice : coche aussi l'item "vision constitutionnelle" du backlog Phase 0. |
| `/404` | Page d'erreur par défaut (Next.js) | Customisation minimale : logo, 1 phrase, lien retour home. Pas d'effort design. |

### Nice-to-have (v1 si temps)

| Route | Purpose | Raison pour laquelle c'est nice-to-have |
|---|---|---|
| `/agents` | Page dédiée aux deux familles d'agents avec détail par agent (Sage, Simulator, etc.) | Si la section "Solution" de la homepage doit rester courte, une page d'approfondissement a du sens pour les devs techniques. Peut parfaitement vivre comme ancre `/#agents` en v1 et devenir page autonome plus tard. |

### Exclus de la v1 (avec justification)

| Route | Pourquoi pas maintenant |
|---|---|
| `/whitepaper` | Le whitepaper v0.5 EN est un livrable Phase 1 mais indépendant de la landing. Lien sortant vers un PDF quand il existe, page dédiée plus tard. Rien ne casse la landing si le lien n'est pas encore là. |
| `/roadmap` | Anti-pattern documenté : "ne pas annoncer de dates publiques sur la roadmap" (`roadmap_solo_claude_code.md`). On communique sur les milestones atteints, pas futurs. |
| `/blog`, `/news` | Prématuré. Une newsletter Substack (CTA footer) suffit jusqu'à 6-10 posts. |
| `/docs`, `/api` | Rien à documenter publiquement tant que le prototype testnet n'est pas accessible. Reviendra en Phase 2. |
| `/privacy`, `/terms`, `/cookies` | Pas de collecte de données en v1 (pas de waitlist email, pas d'analytics non-anonymes). Deviennent obligatoires dès qu'on ajoute Plausible, Resend, ou un formulaire. |
| `/app`, `/dashboard`, `/login` | Ce sont des routes de dApp — Phase 2. La landing ne doit pas prétendre à un produit qui n'existe pas. |
| `/careers`, `/press`, `/brand` | Prématuré. L'équipe = 1 personne. |

---

## 2. Découpage de la homepage en composants

Ordre d'apparition = ordre narratif recommandé : **Hook → Problème → Solution → Preuve → Principes → CTA**. 8 composants au total (6 de contenu + header + footer).

> **Conventions.** PascalCase pour les noms. Types en TypeScript-like. Les props sont volontairement minces en v1 (contenu co-localisé, pas de CMS) ; elles sont nommées pour qu'une future i18n ou extraction en JSON soit simple.

---

### Composant 1 — `SiteHeader`

- **Ordre :** 0 (sticky, toujours visible).
- **Intention narrative :** signaler que le projet est sérieux et navigable en 3 secondes. Ne doit jamais voler l'attention du hero. Le toggle thème prouve qu'on respecte le visiteur (dark par défaut mais pas dogmatique).
- **Props :**
  ```ts
  interface SiteHeaderProps {
    navItems: Array<{ label: string; href: string; external?: boolean }>;
    ctaLabel: string;          // ex: "Join Discord"
    ctaHref: string;           // invite Discord
  }
  ```
- **Contenu textuel (draft EN) :**
  - Logo wordmark à gauche : `DAOIA`.
  - Nav à droite (ordre) : `Principles`, `GitHub` (external), `Discord` (external, style primary button).
  - *(Pas de theme toggle en v1 — dark-only, cf. Section 5 et Décisions.)*
- **Comportement :**
  - Sticky avec fond légèrement flouté (`backdrop-blur`) au scroll — pas au chargement.
  - Collapse sur mobile : hamburger → menu plein écran.
  - Architecture CSS prête pour le futur light mode (tokens sémantiques), mais une seule variante visuelle livrée en v1. Voir Section 5.

---

### Composant 2 — `Hero`

- **Ordre :** 1.
- **Intention narrative :** en 10 secondes, un dev crypto doit comprendre (a) ce que le projet fait, (b) que c'est différent d'une énième DAO "agents exécutent", (c) qu'il y a une raison de rester. Pas de hype.
- **Props :**
  ```ts
  interface HeroProps {
    headline: string;
    subhead: string;
    primaryCta: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    disclaimer: string;        // "Experimental. Testnet only. Not an investment."
  }
  ```
- **Contenu textuel (draft EN) :**
  - **Headline (H1) :** `Governance where AI helps — and never votes for you.`
  - **Subhead :** `DAOIA is a governance stack where AI summarises proposals and carries out voted actions under a strict on-chain policy. The decision stays yours.`
  - *Fallback de secours si la version retenue semble trop radicale en test :* `Agents that help humans understand, vote, and execute.`
  - **Primary CTA :** `Join the Discord →`
  - **Secondary CTA :** `Read the code on GitHub`
  - **Disclaimer (micro, sous les CTAs) :** `Experimental. Testnet only. Not an investment.`
- **Notes de composition :**
  - Pas d'illustration. Fond uni (ou un gradient très subtil qui ne distrait pas).
  - Typographie large sur desktop (H1 ~56-72px), lisible sur mobile (H1 ~36-40px).
  - Aucun compteur, aucun badge, aucun "backed by" inexistant.

---

### Composant 3 — `ProblemStatement`

- **Ordre :** 2.
- **Intention narrative :** nommer le vrai problème (participation, pas exécution) avec des faits, pas des opinions. Créer un hochement de tête chez le dev crypto qui a déjà voté 2 fois dans sa vie et abandonné.
- **Props :**
  ```ts
  interface ProblemStatementProps {
    headline: string;
    lead: string;              // 1 paragraphe
    facts: Array<{ label: string; detail?: string }>;
  }
  ```
- **Contenu textuel (draft EN) :**
  - **Headline :** `Participation is the real bottleneck.`
  - **Lead :** `Most DAO proposals are read by a handful of full-time delegates. Everyone else opts out — not from apathy, but from load. Three screens of forum, two Snapshot pages, and a sixty-line Solidity diff is too much weekly homework for anyone doing this on the side.`
  - **Facts (3 lignes punchy) :**
    1. `A typical vote — under 10% of eligible holders participate.`
    2. `A typical proposal — over 2,000 words, a handful of real readers.`
    3. `A typical outcome — decisions that look collective but aren't.`
- **Composition :** 3 colonnes sur desktop, stack sur mobile. Chiffres en plus gros que le label, plus petit que le H1.

---

### Composant 4 — `AgentFamilies`

- **Ordre :** 3.
- **Intention narrative :** montrer que la solution a une forme claire (deux familles, rôles distincts) et surtout que l'IA **ne vote jamais**. C'est le différentiel éthique et légal du projet — il doit sauter aux yeux.
- **Props :**
  ```ts
  interface AgentFamiliesProps {
    headline: string;
    lead: string;
    families: Array<{
      slug: "governance" | "execution";
      title: string;
      tagline: string;
      agents: Array<{ name: string; role: string }>;
      constraint: string;      // la ligne "ce qu'ils ne font jamais"
    }>;
  }
  ```
- **Contenu textuel (draft EN) :**
  - **Headline :** `Two families of agents. Neither of them votes.`
  - **Lead :** `Governance agents help individuals make sense of what's on the ballot. Execution agents act only on what the community has already decided — under a policy engine that treats every financial action as an immutable mandate.`
  - **Famille 1 — Governance (for the reader) :**
    - Tagline : `They summarise, they model, they argue both sides.`
    - Agents visibles par défaut (2 phare) :
      - `Sage` — `Three-line summaries, tuned to your level.`
      - `Advocate` — `The best arguments for and against. No recommendation.`
    - Discloseur : `+ 3 more` → révèle/ancre vers la liste complète (Simulator, Notifier, Delegate Assistant).
    - Constraint : `They never tell you how to vote.`
  - **Famille 2 — Execution (for the community) :**
    - Tagline : `They act on what the vote decided — nothing more.`
    - Agents visibles par défaut (2 phare) :
      - `Treasury` — `Executes frozen, hashed, pre-voted transactions only.`
      - `Dev Ops` — `PRs, deployments, integrations.`
    - Discloseur : `+ 3 more` → révèle/ancre vers la liste complète (Marketing, Moderation, Research).
    - Constraint : `No financial action without a frozen on-chain mandate.`
- **Composition :** 2 cartes côte à côte sur desktop, stack sur mobile. La ligne `constraint` doit être visuellement distincte (bordure, tag, ou petit label "Hard rule"). Le `+ 3 more` est un toggle in-place (disclosure client-side) pour éviter d'ajouter une page ; si l'interaction devient cramée, on bascule en ancre vers un bloc détaillé plus bas.

> **Catalogue complet pour référence interne (non visible par défaut en v1) :**
>
> *Governance :* Sage · Simulator · Advocate · Notifier · Delegate Assistant
> *Execution :* Marketing · Dev Ops · Treasury · Moderation · Research
>
> Ces 10 agents constitueront soit la liste étendue du discloseur, soit — si le texte pousse — une page `/agents` dédiée (différée après v1, cf. Décisions).

---

### Composant 5 — `HowItWorks`

- **Ordre :** 4.
- **Intention narrative :** prouver que le flow complet (idée → vote → exécution) est rapide, concret, auditable. Basé sur le use case Marc (6 jours) de `use_cases_loop_produit_v2.md`. Doit être scannable — on ne lit pas un mode d'emploi en landing.
- **Props :**
  ```ts
  interface HowItWorksProps {
    headline: string;
    lead: string;
    steps: Array<{ number: number; title: string; detail: string }>;
    callout?: string;          // "6 days, end-to-end"
  }
  ```
- **Contenu textuel (draft EN) :**
  - **Headline :** `From idea to execution in days, not months.`
  - **Lead :** `Imagine a proposal to run a Farcaster account, written on a Monday. With agents handling the plumbing, it could ship its first post by the following weekend. Here's the flow.`
  - **Steps :**
    1. **Propose.** `A member writes a proposal and stakes a small anti-spam amount. Sage rewrites it for clarity; the author signs off.`
    2. **Decide.** `Five-day vote. Sage summarises, Simulator models the treasury impact, Advocate lays out both sides. The vote is still the human's.`
    3. **Execute.** `If it passes, execution agents act. Anything financial runs under a frozen, hashed, pre-simulated mandate — no room for drift.`
    4. **Audit.** `Every action, every token spent, every outcome on a public dashboard. The timeline is the proof.`
  - **Callout :** `Six days, end-to-end — what the flow is built for.`
- **Composition :** timeline verticale sur mobile (empilée), horizontale ou en 2×2 sur desktop. Les numéros grands, les détails sobres.

---

### Composant 6 — `GuardrailsShort`

- **Ordre :** 5.
- **Intention narrative :** marquer un signal de sérieux. Un dev crypto qui a vu le jargon "decentralized AI" mille fois doit voir ici quelque chose de différent : des limites explicites que le projet s'impose. Trust signal.
- **Props :**
  ```ts
  interface GuardrailsShortProps {
    headline: string;
    rules: Array<{ rule: string; why?: string }>;
    moreLink: { label: string; href: string };
  }
  ```
- **Contenu textuel (draft EN) :**
  - **Headline :** `Non-negotiables.`
  - **Rules (5 lignes, une phrase chacune) :**
    1. `Agents never recommend a vote.`
    2. `Sybil resistance is a day-one requirement, not a patch.`
    3. `No mainnet deployment without a human audit.`
    4. `Passive holding is never rewarded with liquid tokens.`
    5. `Every financial action is a frozen, hashed, simulated mandate.`
  - **More link :** `Read the full constitution →` (vers `/principles`).
- **Composition :** liste sobre, pas de cartes. Chaque règle préfixée d'un signe discret (`—`, `·`, ou un numéro muté). Pas d'icônes mignonnes.

---

### Composant 7 — `CallToAction`

- **Ordre :** 6.
- **Intention narrative :** convertir l'intérêt en action légère, pas engageante. Discord d'abord parce que c'est le lieu où un dev peut poser une question idiote sans friction. GitHub et X sont des signaux de soutien faibles mais utiles.
- **Props :**
  ```ts
  interface CallToActionProps {
    headline: string;
    lead: string;
    primary: { label: string; href: string };
    secondary: Array<{ label: string; href: string; external: true }>;
  }
  ```
- **Contenu textuel (draft EN) :**
  - **Headline :** `This is early. Builders welcome.`
  - **Lead :** `The dApp is still being wired up, and everything ships on testnet first. If you want to shape the architecture — or just tell us why we're wrong — the place to hang is Discord.`
  - **Primary CTA :** `Join the Discord →`
  - **Secondary :**
    - `Star the repo on GitHub`
    - `Follow on X`
- **Composition :** section pleine largeur, contraste un peu plus fort que le reste (surface légèrement plus claire en dark mode). Bouton primary bien isolé.

---

### Composant 8 — `SiteFooter`

- **Ordre :** 7 (fin de page).
- **Intention narrative :** clôturer avec un rappel statutaire (expérimental, testnet, pas un investissement) et les liens utiles. Rien de décoratif.
- **Props :**
  ```ts
  interface SiteFooterProps {
    tagline: string;
    links: Array<{ label: string; href: string; external?: boolean }>;
    disclaimer: string;
    year: number;
    license: { label: string; href: string };
  }
  ```
- **Contenu textuel (draft EN) :**
  - **Tagline :** `An AI-augmented DAO, built in public.`
  - **Links :** `Principles` · `GitHub` · `Discord` · `X`
  - **Disclaimer :** `Experimental. Testnet only. Not an investment.`
  - **Copyright :** `© 2026 DAOIA contributors · MIT license`
  - (Éventuellement, très petit) `English only for now.`

---

## 3. Assets externes nécessaires

> Légende des catégories :
> - **(a)** bloquant pour démarrer le code
> - **(b)** remplaçable par un placeholder
> - **(c)** à faire plus tard (avant première diffusion publique élargie)

| Asset | Usage | Cat. | Format / dimensions | Source / plan |
|---|---|---|---|---|
| Wordmark "DAOIA" | Logo header + footer | **(b)** | SVG ou texte CSS. Pour v1, un simple wordmark en font stack (Geist) suffit. | Typé en CSS ; custom SVG si temps. Pas de logomark (icône) en v1. |
| Favicon | Onglet navigateur, résultats de recherche | **(b)** | `favicon.ico` 32×32, `icon.svg` (Next.js métadata API), `apple-icon.png` 180×180 | SVG simple avec initiale "D" ou carré plein. Remplaçable une fois la marque figée. |
| OG image (share card) | X/Discord/Farcaster preview quand on partage l'URL | **(b)** | 1200×630 PNG | Génération dynamique via `@vercel/og` au fur et à mesure du build ; version statique "DAOIA — AI-augmented DAO" en fallback. Avant toute diffusion X, vérifier le rendu. |
| Police Sans — **Geist Sans (variable)** | Corps de texte et titres | **(b)** | Variable font, self-host via `next/font/google` ou `@next/font/local` | Free, par Vercel. Alt 1 : **Inter** (très sûre). Alt 2 : **IBM Plex Sans** si on veut une touche plus "institutionnelle". |
| Police Mono — **Geist Mono** | Adresses, hash, snippets, nombres `tabular-nums` | **(b)** | Variable font, self-host | Free. Alt : **JetBrains Mono** ou **IBM Plex Mono**. |
| Discord invite URL | CTA primaire + header + footer | **(b)** | URL stable (non expirante) | **Réservé ✅** — invite permanent : `https://discord.gg/KmEs2QVk`. À câbler dans le header, le Hero, le CTA block et le footer. |
| GitHub repo URL | CTA secondaire + header | **(b)** | URL stable | **Réservé ✅** — `https://github.com/daoia-conceptus/daoia`. |
| X handle URL | CTA secondaire + footer | **(b)** | URL stable | **Réservé ✅** — `https://x.com/daoiaprotocol`. |
| Domaine `daoia.io` | Destination finale de la landing Next.js | **(c)** | Domaine racine | **Réservé ✅** sur Hostinger. À pointer sur le déploiement Vercel quand la landing sera prête. Transfert éventuel Hostinger → Cloudflare reporté (non-bloquant). |
| Screenshots dApp | Section HowItWorks (éventuel visuel) | **(c)** | PNG 16:9 ou 3:4 | Produits en Phase 2 quand le prototype tourne. En v1 : pas de visuel, on vit avec du texte. |
| Illustrations | Aucune en v1 | — | — | Le style Linear/Vercel assume l'absence d'illustrations. Pas de SVG décoratif, pas d'emoji gratuit. |
| Noise / gradient background | Fond subtil hero (optionnel) | **(c)** | SVG/CSS | Facultatif. Effet gradient CSS natif suffit — pas besoin d'image. |
| **Vercel Analytics** (intégration, pas un asset au sens strict) | Mesure du trafic, des pages vues, de l'audience | **(b)** | Package npm `@vercel/analytics` + activation dans la dashboard Vercel | **Retenu pour la v1.** Zéro config si le déploiement est sur Vercel, RGPD-friendly (pas de cookies, pas de PII), suffisant pour les métriques vitales de phase 1 (visites, taux de rebond, sources de trafic). Plausible self-hosted reste une option pour Phase 3+ si on veut posséder la donnée. |

**Conclusion :** tous les assets externes requis pour la landing sont désormais disponibles. Handles publics (Discord, X, GitHub) et domaine (`daoia.io`) réservés ✅. Le `noindex` reste actif jusqu'au lancement public explicite (la landing n'est pas encore déployée), mais plus aucune dépendance externe ne bloque ni le code ni la diffusion.

---

## 4. Voice & tone

### Principes (5 règles actionnables)

#### 1. Précision > fioriture

Si on peut remplacer un mot par un fait, on le fait.

- ✅ `A typical vote: under 10% of eligible holders participate.`
- ❌ `Participation in DAOs is notoriously low.`

#### 2. Montrer, pas déclarer

Le projet ne se décrit pas, il se démontre. Pas d'adjectifs auto-laudatifs.

- ✅ `Six days, end-to-end — a scenario we're building for.`
- ❌ `DAOIA offers an unprecedented speed of execution.`

#### 3. Respecter le temps du lecteur

Un paragraphe de 3 lignes vaut mieux qu'un de 6. Une phrase active vaut mieux qu'une phrase passive.

- ✅ `Sage summarises. Simulator models. Advocate argues both sides. The vote is still the human's.`
- ❌ `Proposals are summarised by Sage, while impact modelling is handled by Simulator, and the pros and cons are generally presented by Advocate, ensuring that the final decision remains with the voter.`

#### 4. Nommer les limites

On dit ce qui ne marche pas encore, sans dates, sans "soon", sans excuses.

- ✅ `The dApp is still being wired up, and everything ships on testnet first.`
- ❌ `Mainnet launch coming soon.` ou `Revolutionary tech available in Q3.`

#### 5. Ne jamais inciter au vote (cohérence éditoriale avec les agents)

Les agents ne recommandent pas — notre copy non plus. Pas de "vote with us", "join the revolution", "be part of the change".

- ✅ `Join the Discord — the place to hang if you want to shape the architecture.`
- ❌ `Join the movement. Shape the future of governance.`

---

### Références d'écriture dont on s'inspire

| Projet | Ce qu'on leur pique |
|---|---|
| **Linear** (linear.app) | La précision froide. Les headlines qui font un constat, pas une promesse. L'absence de jargon inutile. |
| **Vercel** (vercel.com) | L'élégance technique. Le fait que le produit parle aux devs sans condescendance. Typographie et hiérarchie. |
| **Ethereum Foundation** (ethereum.org) | La sobriété institutionnelle — rappel qu'on peut être crypto-natif sans hype. |
| **Paradigm** (paradigm.xyz, optionnel) | La densité intellectuelle : on assume qu'une landing peut apprendre quelque chose au lecteur, pas seulement lui vendre. |

---

### Interdits (rappel, à copier dans la stylesheet éditoriale interne)

| Interdit | Pourquoi |
|---|---|
| `revolutionary`, `disruptive`, `paradigm shift`, `next-gen`, `game-changer`, `web3-native` | Vidés de sens par l'usage crypto. Signal amateur. |
| Toute mention de `token price`, `yield`, `returns`, `gains`, `upside`, `airdrop` (en copy marketing) | Risque réglementaire + anti-pattern éthique du projet. |
| `Soon`, `Coming soon`, `Q3 2026`, dates publiques sur la roadmap | Anti-pattern documenté (`roadmap_solo_claude_code.md`). On communique sur les milestones atteints, pas les futurs. |
| `Join the movement`, `Be part of the future`, `Shape the destiny of X` | Langage d'incitation qui pousse à l'action émotionnelle — incompatible avec le principe "agents ne recommandent pas". |
| `Backed by`, `Trusted by`, logos d'investisseurs fantômes | On n'a pas d'investisseurs. On n'en invente pas. |
| Emoji décoratifs dans le corps de texte (🚀, 💎, ⚡, 🔥) | Style amateur crypto. Exception : emojis utilitaires dans les messages Discord/X, pas sur la landing. |

---

## 5. Stack visuelle minimale

### Palette — dark mode par défaut

> **Parti pris :** monochrome chaud + un seul accent ton "ambre" utilisé avec parcimonie, plutôt que le bleu/violet par défaut de 90% des projets crypto. L'accent sert aux états signal (hover, focus, highlight rare), pas aux gros aplats.

| Token | Hex | Nom / intention | Usage |
|---|---|---|---|
| `bg-canvas` | `#0A0A0B` | Near-black warm | Fond global, sections principales |
| `bg-surface` | `#121214` | Surface élevée | Cartes, CTA block, modales |
| `bg-surface-hi` | `#1A1A1D` | Surface haute | Hover sur cartes |
| `fg-primary` | `#F5F5F4` | Warm off-white | Corps de texte, titres |
| `fg-muted` | `#A1A1AA` | Gris neutre | Sous-titres, captions, timestamps |
| `fg-subtle` | `#71717A` | Gris plus doux | Disclaimers, metadata |
| `border-subtle` | `#27272A` | Gris-graphite | Séparateurs, bordures discrètes |
| `accent` | `#F5F5F4` | Same as `fg-primary` | Boutons primaires (fond blanc, texte noir) |
| `signal` | `#B45309` | Muted amber | Hover de liens, focus ring, badge "testnet", indicateurs d'état |
| `signal-soft` | `#92400E` | Amber foncé | Variante pour fonds |

**Light mode + toggle — reportés en v2.**

- La v1 livre **dark-only**. Pas de toggle UI.
- Justification : économie d'effort significative (pas de double audit de contraste, pas de logique `localStorage`, pas de flash of unstyled content) pour un coût produit quasi nul sur la cible dev crypto.
- Architecture à préserver dès la v1 pour que l'ajout du light mode en v2 soit trivial :
  - Tous les tokens couleur sont **sémantiques** (`bg-canvas`, `fg-primary`, etc.), jamais des hex en dur dans les composants.
  - CSS structuré avec variables custom pour qu'une seconde palette ne demande qu'un second jeu de variables sous un sélecteur `:root[data-theme="light"]` (ou via `@media (prefers-color-scheme: light)`).
- Palette light pour référence future (v2, non implémentée en v1) :

| Token | Hex (v2) |
|---|---|
| `bg-canvas` | `#FAFAF9` |
| `bg-surface` | `#F4F4F5` |
| `fg-primary` | `#18181B` |
| `accent` | `#18181B` |
| `signal` | `#92400E` |

---

### Typographie

| Rôle | Famille proposée (v1) | Alternatives | Justification |
|---|---|---|---|
| Sans (corps + titres) | **Geist Sans** (variable) | Inter, IBM Plex Sans | Geist est gratuit, maintenu par Vercel, variable (1 fichier couvre tous les poids), parfaitement aligné avec l'esthétique "Linear/Vercel" ciblée. Alt Inter reste le choix le plus sûr si Geist paraît trop "tech-branded". |
| Mono (hash, addresses, numbers) | **Geist Mono** (variable) | JetBrains Mono, IBM Plex Mono | Pour les adresses `0x…`, les hash, les tabular-nums. Même famille visuelle que Geist Sans. |

- **Jamais** plus de 2 familles. Pas de font display fantaisiste.
- **Variable fonts uniquement** pour limiter le poids et éviter le FOUT.
- Self-host via `next/font` (zéro CLS, conformité privacy).
- Tailles indicatives (desktop / mobile) :
  - H1 Hero : 64px / 40px
  - H2 Section : 36px / 28px
  - H3 Subsection : 24px / 20px
  - Body : 16px / 16px
  - Caption : 14px / 13px

---

### Animations

Règle d'or : **si l'animation n'aide pas à comprendre, elle est coupée.**

- Transitions CSS : 150-200ms sur hover/focus, `ease-out`.
- Fade-in léger sur scroll pour les sections (`IntersectionObserver`), 400ms max. Jamais sur le header, jamais sur les CTAs.
- Aucune parallaxe, aucun 3D, aucune scroll-jacking.
- **`prefers-reduced-motion` : obligatoire.** Dès que l'utilisateur a la préférence activée, on désactive toutes les animations non critiques (fade-in, transitions longues). Garder uniquement les focus rings et les state changes immédiats (<100ms).

Snippet de politique CSS à respecter dès la v1 :

```
/* pseudo-code — à implémenter au moment du code */
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

---

### Références visuelles

| Référence | URL | Pourquoi pour DAOIA |
|---|---|---|
| **Linear** | https://linear.app | Hiérarchie typographique magistrale, sobriété des animations, contraste gérés sans saturation. Modèle n°1 pour la sensation. |
| **Vercel** | https://vercel.com | Gestion du dark mode, densité d'information sans cramer le visiteur, utilisation de monospace pour donner du poids aux éléments techniques. |
| **Paradigm** | https://www.paradigm.xyz | Rare combinaison crypto + sobriété. Preuve qu'une marque crypto peut exister sans dégoulinement visuel. |

*(Si l'utilisateur préfère une référence additionnelle plus institutionnelle, Anthropic.com ou ethereum.org sont de bons remplaçants.)*

---

## Décisions tranchées en review (2026-04-19)

Les 8 arbitrages proposés ont été tranchés pendant la revue. Récapitulatif :

| # | Question | Décision | Notes |
|---|---|---|---|
| 1 | `/principles` page dédiée ou ancre ? | **Page dédiée `/principles`** | Force à écrire la version publique de la constitution (item Phase 0 croisé). |
| 2 | `/agents` page dédiée ou ancre ? | **Ancre `/#agents` en v1** | Page dédiée différée ; la v1 utilise un discloseur in-place pour les agents secondaires. |
| 3 | Accent color | **Ambre muted `#B45309`** | Assumé anti-bleu-crypto. Usage parcimonieux (focus, hover, indicateurs testnet). |
| 4 | Font primaire | **Geist Sans + Geist Mono** | Variable, self-host via `next/font`. |
| 5 | Logo | **Wordmark CSS en v1** | Commande designer prévue 2-3 mois plus tard, une fois le nom stress-testé. |
| 6 | Analytics | **Vercel Analytics retenu** | Zéro config sur Vercel, RGPD-friendly, suffisant pour Phase 1. Pas de Plausible en v1, pas de zéro-analytics. |
| 7 | `noindex` tant que handles Discord/X pas en place ? | **Oui** | `<meta name="robots" content="noindex, nofollow" />` jusqu'à lancement public explicite. |
| 8 | Ordre des sections | **Hero → Problem → Agents → Flow → Guardrails → CTA** | Flux validé. |

*Ces décisions sont également consignées dans `DECISIONS.md` en entrées datées 2026-04-19.*

---

## Checklist de sortie de cette étape

- [x] Arborescence (Section 1) — `/`, `/principles`, `/404` confirmés must-have.
- [x] 8 composants (Section 2) — ordre et intentions validés ; drafts EN acceptés comme point de départ.
- [x] Palette (Section 5) — tokens figés ; light mode reporté en v2.
- [x] Fonts (Section 5) — Geist Sans + Geist Mono.
- [x] Accent color — ambre muted `#B45309`.
- [x] Analytics — Vercel Analytics dès la v1.
- [x] `noindex` tant que Discord/X pas réservés.
- [x] Voice & tone (Section 4) — 5 principes + interdits validés.
- [ ] **Seul item restant avant code : réserver l'invite Discord et le handle X** (items Phase 0 encore ouverts).

**Étape suivante** : *Landing — étape 2 : bootstrap Next.js + tokens de design + premier composant (Hero)*.
