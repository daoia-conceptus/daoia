import Link from "next/link";

// Same focus-visible pattern as Hero / SiteHeader / SiteFooter /
// ProblemStatement: amber ring offset against canvas, keyboard-only.
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

type Guardrail = {
  label: string;
  description: string;
};

const GUARDRAILS: Guardrail[] = [
  {
    label: "Voted policy",
    description: "No agent acts outside a policy the DAO has voted on.",
  },
  {
    label: "Public audit log",
    description: "Every action is recorded publicly and inspectable.",
  },
  {
    label: "Human override",
    description:
      "The DAO can stop, modify, or revoke any policy at any time.",
  },
  {
    label: "Responsible disclosure",
    description:
      "Bugs and limitations are disclosed within 90 days, patched or not.",
  },
];

/**
 * GuardrailsShort — fifth content section of the home page.
 *
 * Four-item "what keeps this system honest" summary, with a link to
 * the full /principles document for readers who want the complete
 * set of commitments. Intentionally short and flat (no H3/H4, no
 * grid) — the section's job is to name the core safety rails, not
 * to argue them; the Principles document does the arguing.
 *
 * Section anchor:
 *   - id="guardrails" on the <section> element. The /principles stub
 *     points back here via `/#guardrails`, so this id is part of the
 *     site's deep-link contract. Do not rename without also updating
 *     app/principles/page.tsx.
 *   - scroll-mt-20 compensates for the 64 px sticky SiteHeader so
 *     the H2 "Built with limits." is not hidden behind the header
 *     when a reader arrives via the /#guardrails fragment.
 *
 * Layout:
 *   - Same px-6 py-24 md:py-32 section rhythm as the other four
 *     sections — chapter-level visual parity.
 *   - max-w-2xl container directly (no outer max-w-4xl) because
 *     this section is pure vertical text: short intro, a four-item
 *     list, footer note + link. No grid, no multi-column content.
 *   - The link out to /principles is a next/link for internal
 *     client-side routing (vs. a plain <a> which would full-reload).
 *
 * a11y:
 *   - Flat hierarchy inside the section: one H2, no H3 or H4. The
 *     four guardrails are a semantic <ul> so screen readers announce
 *     "list of four items" on entry.
 *   - The "→" glyph in the outbound link is aria-hidden so screen
 *     readers read "Read the principles" cleanly (matches the Hero
 *     CTA pattern).
 *   - The label/description separator " — " lives in its own span
 *     so it can carry text-fg-subtle styling without affecting the
 *     description's color.
 *   - Contrast: body copy and footer use text-fg-muted on canvas
 *     (~8.5:1, AAA); the separator uses text-fg-subtle (~4.6:1, AA
 *     normal text — acceptable for decorative punctuation).
 */
export function GuardrailsShort() {
  return (
    <section
      id="guardrails"
      aria-labelledby="guardrails-title"
      className="scroll-mt-20 px-6 py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-2xl">
        <h2
          id="guardrails-title"
          className="text-[28px] font-semibold leading-heading text-fg-primary md:text-[36px]"
        >
          Built with limits.
        </h2>

        <p className="mt-8 text-fg-muted md:text-lg">
          DAOIA is designed so that every agent action stays within
          boundaries the DAO has explicitly approved. The system enforces
          this — not just promises it.
        </p>

        <ul className="mt-12 space-y-6">
          {GUARDRAILS.map((g) => (
            <li key={g.label} className="text-fg-muted md:text-lg">
              <span className="font-semibold text-fg-primary">
                {g.label}
              </span>
              <span className="text-fg-subtle"> — </span>
              {g.description}
            </li>
          ))}
        </ul>

        <div className="mt-16 border-t border-hairline pt-8">
          <p className="text-sm text-fg-muted">
            The full set of commitments — including what DAOIA will never
            do — lives in the Principles document.
          </p>
          <p className="mt-3 text-sm text-fg-muted">
            <Link
              href="/principles"
              className={`rounded text-signal underline underline-offset-4 transition-colors hover:text-fg-primary motion-safe:duration-150 ${FOCUS_RING}`}
            >
              Read the principles <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
