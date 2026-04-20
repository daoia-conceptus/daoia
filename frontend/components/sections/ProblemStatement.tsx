const EXTERNAL_LINK_ATTRS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

// Same focus-visible pattern as Hero / SiteHeader / SiteFooter:
// keyboard-only amber ring offset against the canvas.
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

// Body-weight interactive link: amber at rest, foreground-white on hover,
// 4 px underline offset. Used for the two external source citations.
const FOOTNOTE_LINK =
  `text-signal underline underline-offset-4 hover:text-fg-primary motion-safe:duration-150 ${FOCUS_RING}`;

// Sup/backref styling: amber, no underline at rest (the glyph itself signals
// it's a link), underline appears on hover to confirm the affordance.
const SUP_LINK =
  `text-signal hover:underline underline-offset-2 ${FOCUS_RING}`;

const BACKREF_LINK =
  `text-signal hover:text-fg-primary motion-safe:duration-150 ${FOCUS_RING}`;

/**
 * ProblemStatement — second content section of the home page, after the Hero.
 *
 * Frames the participation problem in DAOs as a deliberate economic cost
 * ("informed participation has been made unreasonably expensive"), setting
 * up the Hero's implicit proposition without restating it.
 *
 * Copy: three paragraphs + a cited statistic. The numerical claim (under
 * 15% participation) carries a footnote linking two aggregated-data
 * publications. Standard forward/back-reference pattern so readers can
 * jump to the source and return.
 *
 * Layout:
 *   - Same `px-6 py-24 md:py-32` rhythm as Hero → visual parity between
 *     consecutive chapters.
 *   - `max-w-2xl` container → body line length in the 45-75 char
 *     reading-comfort range (same pattern as /principles).
 *   - `scroll-mt-20` on both anchor targets so the 64 px sticky
 *     SiteHeader doesn't cover the jump destination.
 *
 * Punctuation: the sup follows the period, per Chicago/APA style
 * ("proposal.¹" not "proposal¹.").
 */
export function ProblemStatement() {
  return (
    <section
      aria-labelledby="problem-statement-title"
      className="px-6 py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-2xl">
        <h2
          id="problem-statement-title"
          className="text-[28px] font-semibold leading-heading text-fg-primary md:text-[36px]"
        >
          Most people in a DAO never vote.
        </h2>

        <div className="mt-8 space-y-6 text-fg-muted md:text-lg">
          <p>
            {"In most DAOs, fewer than 15% of members vote on a given proposal."}
            <sup className="leading-none">
              <a
                id="fnref-participation"
                href="#fn-participation"
                aria-describedby="problem-statement-footnote-label"
                className={`${SUP_LINK} scroll-mt-20`}
              >1</a>
            </sup>
            {" Not because they don't care. Because by the time they've finished reading the proposal — if they finish — the deadline has already passed, or someone else has framed the decision for them."}
          </p>

          <p>
            {"Governance in DAOs is supposed to be collective. In practice, it's a small group of delegates doing the work, and everyone else trusting them (or not bothering). The structure looks democratic. The outcome often isn't."}
          </p>

          <p>
            {"The problem isn't that people are lazy. It's that informed participation has been made unreasonably expensive."}
          </p>
        </div>

        <div
          id="fn-participation"
          className="mt-12 scroll-mt-20 border-t border-hairline pt-8"
        >
          <p className="text-sm text-fg-muted">
            <span id="problem-statement-footnote-label" className="sr-only">
              Footnote 1.
            </span>
            {"Median participation rates across generalist DAOs typically sit between 5% and 15% per proposal (Snapshot & DAOStack aggregate data, 2024–2025). Sources: "}
            <a
              href="https://coinlaw.io/decentralized-autonomous-organizations-statistics/"
              {...EXTERNAL_LINK_ATTRS}
              className={FOOTNOTE_LINK}
            >coinlaw.io</a>
            {", "}
            <a
              href="https://www.krayondigital.com/blog/top-dao-voting-mechanisms-compared-2024"
              {...EXTERNAL_LINK_ATTRS}
              className={FOOTNOTE_LINK}
            >krayondigital.com</a>
            {". "}
            <a
              href="#fnref-participation"
              aria-label="Back to reference in text"
              className={BACKREF_LINK}
            >↩</a>
          </p>
        </div>
      </div>
    </section>
  );
}
