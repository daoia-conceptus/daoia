import { Hero } from "@/components/sections/Hero";

const DISCORD_URL = "https://discord.gg/KmEs2QVk";
const GITHUB_URL = "https://github.com/daoia-conceptus/daoia";

/**
 * Landing homepage — Phase 1 v1.
 *
 * v1 scope: Hero-only, intentionally. See DECISIONS.md entry
 * "2026-04-20 — Landing v1 : Hero-only" for the rationale. The five
 * additional sections listed in the TODO below will be added in
 * later sessions, each as an independent commit so they can ship
 * opportunistically without blocking Phase 2.
 *
 * Chrome (SiteHeader, SiteFooter, skip-to-content link, #main-content
 * wrapper, Vercel Analytics) lives in app/layout.tsx — this file only
 * owns the route-specific content.
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

      {/* TODO: next sections to build in order (cf. docs/landing_wireframe_v1.md §2):
           1. <ProblemStatement />
           2. <AgentFamilies />
           3. <HowItWorks />
           4. <GuardrailsShort id="guardrails" />   ← /principles links back here via /#guardrails
           5. <CallToAction />
      */}
    </main>
  );
}
