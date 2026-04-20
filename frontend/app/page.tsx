import { Hero } from "@/components/sections/Hero";
import { ProblemStatement } from "@/components/sections/ProblemStatement";
import { AgentFamilies } from "@/components/sections/AgentFamilies";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { GuardrailsShort } from "@/components/sections/GuardrailsShort";
import { CallToAction } from "@/components/sections/CallToAction";

const DISCORD_URL = "https://discord.gg/KmEs2QVk";
const GITHUB_URL = "https://github.com/daoia-conceptus/daoia";

/**
 * Landing homepage — Phase 1 v1 (complete).
 *
 * Six content sections, each a standalone Server Component under
 * components/sections/, composed in narrative order:
 *
 *   1. Hero              — Hook / pitch / primary CTAs
 *   2. ProblemStatement  — Why participation is broken today
 *   3. AgentFamilies     — The two families of agents, ten in total
 *   4. HowItWorks        — Five-step proposal lifecycle, with example
 *   5. GuardrailsShort   — The four non-negotiable safety rails
 *   6. CallToAction      — Closing conversion (Discord, GitHub, X)
 *
 * Narrative arc: Hook → Problem → Solution → Proof → Principles →
 * Conversion. Wireframe spec: docs/landing_wireframe_v1.md §2.
 *
 * The first iteration shipped with Hero only — see the DECISIONS.md
 * entry "2026-04-20 — Landing v1 : Hero-only" for the reasoning.
 * Each subsequent section was added as an independent commit
 * (ProblemStatement, AgentFamilies, HowItWorks, GuardrailsShort,
 * CallToAction) so they could land opportunistically without
 * blocking Phase 2.
 *
 * Chrome (SiteHeader, SiteFooter, skip-to-content link,
 * #main-content wrapper, Vercel Analytics) lives in app/layout.tsx
 * — this file only owns the route-specific content.
 */
export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero
        headline="Governance where AI helps — and never votes for you."
        subhead="Agents read proposals, simulate tradeoffs, and execute voted actions. The on-chain policy is strict. The decision is always yours."
        primaryCta={{
          label: "Join the Discord",
          href: DISCORD_URL,
          external: true,
        }}
        secondaryCta={{
          label: "Read the code on GitHub",
          href: GITHUB_URL,
          external: true,
        }}
        disclaimer="Experimental. Testnet only. Not an investment."
      />

      <ProblemStatement />

      <AgentFamilies />

      <HowItWorks />

      <GuardrailsShort />

      <CallToAction />

      {/* Landing v1 complete — 6 sections: Hero → ProblemStatement →
          AgentFamilies → HowItWorks → GuardrailsShort → CallToAction.
          Narrative arc: Hook → Problem → Solution → Proof → Principles
          → Conversion. See docs/landing_wireframe_v1.md §2 for the spec
          each section was built against. */}
    </main>
  );
}
