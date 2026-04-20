import type { Metadata } from "next";

const EXTERNAL_LINK_ATTRS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

// Same focus-visible pattern as Hero / SiteHeader / SiteFooter: amber ring
// offset against canvas, keyboard-only affordance.
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

type Principle = {
  id: string;
  title: string;
  body: string;
};

const PRINCIPLES: Principle[] = [
  {
    id: "human-vote",
    title: "The vote stays human.",
    body: "Agents read, summarize, simulate, and execute — but never vote. No matter how confident the model, no matter how obvious the choice, no matter how much friction it would save, the decision is made by a human. DAOIA exists to reduce the cost of informed participation, not to replace participation itself.",
  },
  {
    id: "agents-answer-dao",
    title: "Agents answer to the DAO.",
    body: "AI agents have no autonomous authority over governance. Low-impact actions (summarizing a proposal, drafting a tweet, flagging a conflict) are permitted under a policy the DAO has explicitly voted on. High-impact actions (treasury transfers, contract deployments, external commitments) always require a fresh vote. An agent that exceeds its policy is stopped, not apologized for.",
  },
  {
    id: "tradeoffs-not-hidden",
    title: "Trade-offs are not hidden.",
    body: "Every proposal presented to voters includes what it costs, who it affects negatively, and what could go wrong. We treat the absence of a trade-off as a bug in the summary, not a feature. UX will never be designed to push a vote in a particular direction — including 'for the user's own good.'",
  },
  {
    id: "transparency",
    title: "Transparency by default.",
    body: "Bugs, failures, limitations, and financial details (allocations, funding, spending) are made public as soon as disclosure does not expose users to harm. For security vulnerabilities, we follow responsible disclosure: private notification, patch window (maximum 90 days), then public post-mortem — whether the issue was resolved or not.",
  },
  {
    id: "power-vs-governance",
    title: "Economic power is not governance power.",
    body: "A token will exist, but we treat the equivalence 'tokens = votes' as a problem to solve, not a feature. From day one, we use quadratic voting, holder caps, and sybil resistance to dampen whale influence. Long-term, we aim to separate economic ownership from governance rights — through mechanisms like soulbound governance tokens, contribution-based voting, or equivalent. We don't yet know which mechanism wins. We commit to keeping working on it.",
  },
  {
    id: "neutral-content",
    title: "Neutral on content, not on ethics.",
    body: "DAOIA does not push, filter, or favor proposals based on their political, economic, or ideological content. Agents summarize all proposals with the same rigor. The one exception: proposals that fund violations of basic human rights, or activities that are illegal in a majority of jurisdictions, will be flagged as out of scope. Everything else — left, right, expansive, restrictive, radical, conservative — is presented equally.",
  },
  {
    id: "survive-founder",
    title: "The project must survive the founder.",
    body: "DAOIA is built to be handed over. Multi-sig keys are distributed to core contributors from the earliest feasible stage. Governance, code, and operations transfer progressively to the DAO itself. If the founder steps away, goes silent, or ceases to contribute, the project keeps running. The goal is not a startup that grows forever under one person — it is a public infrastructure that becomes unowned.",
  },
];

// "Principles" combined with the `title.template` from app/layout.tsx renders
// as "Principles | DAOIA" in the browser tab. The root layout's `robots`
// settings are inherited — no per-page override needed while we stay
// pre-launch.
export const metadata: Metadata = {
  title: "Principles",
  description:
    "The non-negotiable commitments of DAOIA — what this project will do, and what it will never do.",
};

/**
 * The constitutional commitments of DAOIA, v1.
 *
 * Structure:
 *   - H1 "Principles" (sole H1 on the route)
 *   - Short intro paragraph framing the document
 *   - <article> wrapping seven <section>s, one per principle
 *   - Each section: mono-styled number, H2 title, body paragraph
 *   - Hairline-separated footer note pointing to GitHub for change history
 *
 * a11y:
 *   - One H1 → seven H2s, flat hierarchy, no H3
 *   - Each <section> is labeled by its own H2 via aria-labelledby
 *   - The decorative number is aria-hidden so screen readers read
 *     "The vote stays human" cleanly, not "zero one. The vote stays human."
 *   - Contrast: body copy uses text-fg-muted (9.5:1 on canvas, AAA),
 *     including the footer note so the page practices the transparency
 *     it preaches.
 *
 * The `id="main-content"` target for the skip-link lives on the wrapper
 * <div> in app/layout.tsx — see the DECISIONS.md entry
 * "2026-04-20 — Pattern `id=\"main-content\"` : sur le layout wrapper
 * uniquement" for the rationale.
 */
export default function PrinciplesPage() {
  return (
    <main className="flex flex-1 flex-col px-6 py-24 md:py-32">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="text-[40px] font-semibold leading-heading tracking-display text-fg-primary md:text-[64px]">
          Principles
        </h1>

        <p className="mt-6 text-lg text-fg-muted md:text-xl">
          The following commitments guide how DAOIA is built and governed.
          They are intended to be hard to change, and to be held against the
          project publicly.
        </p>

        <article className="mt-16 space-y-16">
          {PRINCIPLES.map((principle, index) => {
            const number = String(index + 1).padStart(2, "0");
            const headingId = `principle-${principle.id}-title`;
            return (
              <section key={principle.id} aria-labelledby={headingId}>
                <p
                  aria-hidden="true"
                  className="font-mono text-sm text-fg-subtle"
                >
                  {number}.
                </p>
                <h2
                  id={headingId}
                  className="mt-2 text-[28px] font-semibold leading-heading text-fg-primary md:text-[36px]"
                >
                  {principle.title}
                </h2>
                <p className="mt-4 text-fg-muted md:text-lg">
                  {principle.body}
                </p>
              </section>
            );
          })}
        </article>

        <div className="mt-16 border-t border-hairline pt-8">
          <p className="text-sm text-fg-muted">
            This document is version 1. Changes require a DAO vote once the
            DAO is live. Until then, changes are made in public commits on{" "}
            <a
              href="https://github.com/daoia-conceptus/daoia"
              {...EXTERNAL_LINK_ATTRS}
              className={`rounded text-signal underline underline-offset-4 transition-colors hover:text-fg-primary motion-safe:duration-150 ${FOCUS_RING}`}
            >
              github.com/daoia-conceptus/daoia
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
