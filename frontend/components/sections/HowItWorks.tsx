type Step = {
  number: string;
  title: string;
  body: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "A member submits a proposal",
    body: `Alice posts: "Allocate 5,000 USDC to sponsor a NYC community meetup in May."`,
  },
  {
    number: "02",
    title: "Sage produces a clear summary",
    body: "Sage reads the full proposal and surfaces a 3-line summary: what's being asked, the budget, the timeline.",
  },
  {
    number: "03",
    title: "Simulator and Advocate add context",
    body: "Simulator shows what the treasury looks like after the spend. Advocate cites a similar event from Q3 (cost: 7K, attendance: 200) so voters can compare.",
  },
  {
    number: "04",
    title: "Members vote",
    body: "Each member sees the same summary, the same context, the same trade-offs. They vote based on what they actually understand.",
  },
  {
    number: "05",
    title: "Treasury executes",
    body: "If the proposal passes, Treasury sends the 5,000 USDC to the recipient multisig and reports back with the transaction hash.",
  },
];

/**
 * HowItWorks — fourth content section of the home page, between
 * AgentFamilies and the two remaining sections (GuardrailsShort,
 * CallToAction).
 *
 * Walks a reader through the full lifecycle of a single proposal
 * (submission → summary → context → vote → execution) in five beats,
 * illustrated with a concrete example: Alice, 5,000 USDC, a NYC
 * meetup. The concreteness is intentional — an abstract "proposal X
 * moves through the system" reads like documentation, a named person
 * and amount makes it a story.
 *
 * Layout:
 *   - Same px-6 py-24 md:py-32 section rhythm as Hero, ProblemStatement,
 *     and AgentFamilies — chapter-level visual parity across the landing.
 *   - max-w-4xl outer container (consistent with AgentFamilies, wider
 *     than Hero's body and ProblemStatement, 2xl) so the H2 sits in a
 *     familiar frame.
 *   - max-w-2xl inner container on the text blocks (intro, each step,
 *     footer note) keeps line length in the 45-75 char reading-comfort
 *     range.
 *   - Numbered steps follow the /principles editorial pattern: a
 *     mono-styled "01." through "05." in text-fg-subtle above the H3
 *     title, then the body paragraph.
 *   - Hairline border before the footer note mirrors /principles and
 *     ProblemStatement — signals "the document proper ends here, what
 *     follows is an addendum."
 *
 * a11y:
 *   - Flat hierarchy: H2 (section title) → H3 × 5 (one per step). The
 *     decorative numbers are aria-hidden so screen readers read the
 *     titles cleanly.
 *   - Each step is a nested <section> labelled by its own H3 via
 *     aria-labelledby — same pattern as /principles principle entries.
 *     Nested sections are HTML5-valid; screen readers navigate them
 *     via landmark / heading shortcuts.
 *   - Step h3 ids (`step-01-title` etc.) are stable, enabling future
 *     deep-linking to a specific step if needed.
 *   - Contrast: body uses text-fg-muted (~8.5:1 on canvas, AAA);
 *     numbers use text-fg-subtle (~4.6:1, AA normal text, acceptable
 *     for decorative marginalia).
 */
export function HowItWorks() {
  return (
    <section
      aria-labelledby="how-it-works-title"
      className="px-6 py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-4xl">
        <h2
          id="how-it-works-title"
          className="text-[28px] font-semibold leading-heading text-fg-primary md:text-[36px]"
        >
          How DAOIA works in practice.
        </h2>

        <p className="mt-8 max-w-2xl text-fg-muted md:text-lg">
          A community proposal moves through five steps. Agents do the
          reading, the math, the watching, and the execution — but never
          the deciding.
        </p>

        <div className="mt-16 max-w-2xl space-y-12">
          {STEPS.map((step) => {
            const headingId = `step-${step.number}-title`;
            return (
              <section key={step.number} aria-labelledby={headingId}>
                <p
                  aria-hidden="true"
                  className="font-mono text-sm text-fg-subtle"
                >
                  {step.number}.
                </p>
                <h3
                  id={headingId}
                  className="mt-2 text-[20px] font-semibold leading-heading text-fg-primary md:text-[24px]"
                >
                  {step.title}
                </h3>
                <p className="mt-4 text-fg-muted md:text-lg">
                  {step.body}
                </p>
              </section>
            );
          })}
        </div>

        <div className="mt-16 max-w-2xl border-t border-hairline pt-8">
          <p className="text-sm text-fg-muted">
            All actions are logged on-chain. Agents act only within
            policies the DAO has voted on.
          </p>
        </div>
      </div>
    </section>
  );
}
