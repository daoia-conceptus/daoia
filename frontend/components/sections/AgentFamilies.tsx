type Agent = {
  name: string;
  description: string;
};

type AgentFamily = {
  id: string;
  title: string;
  subtitle: string;
  agents: Agent[];
};

const FAMILIES: AgentFamily[] = [
  {
    id: "governance",
    title: "Governance",
    subtitle: "Help members understand, weigh, and decide on proposals.",
    agents: [
      {
        name: "Sage",
        description:
          "Reads each proposal and explains in plain language what's actually being decided.",
      },
      {
        name: "Simulator",
        description:
          "Tests what would happen if a proposal passes — budget impact, timeline, dependencies — so voters see the consequences before voting.",
      },
      {
        name: "Advocate",
        description:
          "Surfaces the strongest arguments for and against. Flags conflicts of interest. Cites past decisions that set precedent.",
      },
      {
        name: "Notifier",
        description:
          "Alerts members about proposals that match their interests, deadlines approaching, and unusual voting patterns.",
      },
      {
        name: "Delegate Assistant",
        description:
          "Helps delegates stay aligned with what they've publicly committed to — and tells them when they drift.",
      },
    ],
  },
  {
    id: "execution",
    title: "Execution",
    subtitle: "Carry out what the DAO has voted on, within strict limits.",
    agents: [
      {
        name: "Marketing",
        description:
          "Drafts external communications. Nothing goes public without a human signing off.",
      },
      {
        name: "DevOps",
        description:
          "Keeps the technical side running — deployments, monitoring, updates the DAO has voted on.",
      },
      {
        name: "Treasury",
        description:
          "Executes financial actions that have been voted on. Reports on fund usage. Refuses to act outside its mandate.",
      },
      {
        name: "Moderation",
        description:
          "Applies community rules across shared spaces. Borderline cases go to humans, not bots.",
      },
      {
        name: "Research",
        description:
          "Analyzes patterns in past votes and proposals. Surfaces insights that inform better future decisions.",
      },
    ],
  },
];

/**
 * AgentFamilies — third content section of the home page.
 *
 * Lists the ten agents that compose DAOIA, grouped into two families:
 * Governance (help members decide) and Execution (carry out voted
 * decisions). Each agent gets a short, verb-led description.
 *
 * Copy is descriptive, not aspirational: each line states what the
 * agent does today or is being built to do, not what it could become
 * eventually. The two-sentence intro reiterates the core constraint
 * (no agent votes, no agent acts outside its mandate) so the layout
 * itself cannot be misread as AI overreach.
 *
 * Layout:
 *   - px-6 py-24 md:py-32 section rhythm — matches Hero and
 *     ProblemStatement, keeps chapter-level visual parity.
 *   - max-w-4xl outer container — wider than the 2xl pattern used by
 *     Hero's body and by ProblemStatement, because we need to
 *     accommodate a 3-column grid of cards on desktop.
 *   - max-w-2xl inner containers on text blocks (intro, subtitles)
 *     keeps line length in the 45-75 char comfort range.
 *   - Responsive grid: 1 column below md (<768 px), 2 columns md to
 *     lg (768-1024 px), 3 columns lg+ (1024+ px). The 4th and 5th
 *     cards of each family fall to the second row on desktop — the
 *     3+2 split is intentional and visually balanced.
 *   - Cards use bg-surface/50 for a subtle elevation above the canvas
 *     (surface is --bg-surface #121214 vs canvas #0A0A0B; at 50%
 *     alpha this reads as a very light lift, enough to ground the
 *     grid without looking like flagrant "card UI").
 *
 * a11y:
 *   - Hierarchy: H2 (section title) → H3 (family) → H4 (agent name),
 *     flat and semantic, no skipped levels.
 *   - Each <section> is labelled by its own H2 via aria-labelledby.
 *   - Cards are <article> elements but don't carry aria-labelledby —
 *     the inner H4 already provides the accessible name for the
 *     article landmark.
 *   - No interactivity: cards are information panels, not links.
 *     Omitting hover states avoids the "clickable-looking-but-not"
 *     accessibility anti-pattern.
 */
export function AgentFamilies() {
  return (
    <section
      aria-labelledby="agent-families-title"
      className="px-6 py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-4xl">
        <h2
          id="agent-families-title"
          className="text-[28px] font-semibold leading-heading text-fg-primary md:text-[36px]"
        >
          Two families of agents.
        </h2>

        <div className="mt-8 max-w-2xl space-y-4 text-fg-muted md:text-lg">
          <p>
            {"DAOIA is built around two families of agents: those that help members decide, and those that execute what's been decided."}
          </p>
          <p>
            None of them vote. None of them act outside their mandate.
          </p>
        </div>

        {FAMILIES.map((family) => (
          <div key={family.id} className="mt-20">
            <h3 className="text-[20px] font-semibold text-fg-primary md:text-[24px]">
              {family.title}
            </h3>
            <p className="mt-2 max-w-2xl text-fg-muted md:text-lg">
              {family.subtitle}
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {family.agents.map((agent) => (
                <article
                  key={agent.name}
                  className="rounded-lg border border-hairline bg-surface/50 p-6"
                >
                  <h4 className="font-semibold text-fg-primary">
                    {agent.name}
                  </h4>
                  <p className="mt-2 text-sm leading-body text-fg-muted md:text-base">
                    {agent.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
