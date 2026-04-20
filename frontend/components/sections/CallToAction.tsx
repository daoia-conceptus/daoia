const EXTERNAL_LINK_ATTRS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

// Same focus-visible pattern as Hero / SiteHeader / SiteFooter /
// ProblemStatement / GuardrailsShort.
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

// CTA classes duplicated from Hero.tsx. Two callers (Hero and this
// component) means we're not at rule-of-three yet — extraction to a
// shared <Button variant="..." /> primitive waits for a third caller.
// Keeping the duplication self-contained here preserves readability
// and keeps the change surface local when a CTA style tweak is needed.
const PRIMARY_CTA_CLASSES = `inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-medium text-canvas transition-opacity hover:opacity-90 motion-safe:duration-150 ${FOCUS_RING}`;
const SECONDARY_CTA_CLASSES = `inline-flex items-center justify-center gap-2 rounded-full border border-hairline px-6 py-3 text-base font-medium text-fg-primary transition-colors hover:border-fg-muted motion-safe:duration-150 ${FOCUS_RING}`;

type Cta = {
  href: string;
  label: string;
  variant: "primary" | "secondary";
};

const CTAS: Cta[] = [
  {
    href: "https://discord.gg/KmEs2QVk",
    label: "Join the conversation on Discord",
    variant: "primary",
  },
  {
    href: "https://github.com/daoia-conceptus/daoia",
    label: "Watch and contribute on GitHub",
    variant: "secondary",
  },
  {
    href: "https://x.com/daoiaprotocol",
    label: "Follow updates on X",
    variant: "secondary",
  },
];

/**
 * CallToAction — sixth and closing section of the home page.
 *
 * Completes the narrative arc of the landing (Hook → Problem →
 * Solution → Proof → Principles → Conversion) by giving the reader
 * three concrete ways to engage: Discord (primary conversation
 * channel), GitHub (code + watch repo), X (broadcast updates).
 *
 * Copy: deliberate in framing this as "Phase 0 — looking for
 * thoughtful early contributors" rather than "join a movement" or
 * equivalent hype — respects the voice rule that bans calls to
 * collective action that smell of marketing.
 *
 * Layout:
 *   - Same px-6 py-24 md:py-32 section rhythm as the previous five
 *     sections — chapter-level visual parity.
 *   - max-w-2xl container (consistent with GuardrailsShort) for a
 *     tight editorial close — no grid needed since the CTAs flow
 *     responsively.
 *   - CTA stack: vertical on mobile (flex-col), horizontal with
 *     wrap on sm+ (sm:flex-row sm:flex-wrap). At max-w-2xl the
 *     three CTAs naturally wrap to two rows on most desktop widths,
 *     which reads cleaner than compressing three cramped buttons in
 *     a single line.
 *
 * CTA styling:
 *   - Primary (Discord) uses bg-accent (#F5F5F4 on canvas, same as
 *     the Hero primary) — consistency with the landing's primary
 *     action color. The signal amber remains reserved for
 *     non-CTA accents (hover links, focus rings, etc.).
 *   - Secondaries (GitHub, X) use the same outlined pill pattern as
 *     Hero's secondary CTA.
 *   - Every CTA carries a trailing "→" glyph inside an aria-hidden
 *     span so screen readers read just the label, not "rightwards
 *     arrow" on each button.
 *
 * a11y:
 *   - Flat hierarchy: single H2, no H3/H4.
 *   - <section> labelled by its H2 via aria-labelledby.
 *   - All three links use external-link attrs (target, rel) because
 *     Discord / GitHub / X are all external destinations.
 */
export function CallToAction() {
  return (
    <section
      aria-labelledby="cta-title"
      className="px-6 py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-2xl">
        <h2
          id="cta-title"
          className="text-[28px] font-semibold leading-heading text-fg-primary md:text-[36px]"
        >
          Join the build.
        </h2>

        <div className="mt-8 space-y-4 text-fg-muted md:text-lg">
          <p>
            DAOIA is in Phase 0 — open source, public, and looking for
            thoughtful early contributors.
          </p>
          <p>
            {"Whether you want to test, critique, or just observe — there's a door for you."}
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          {CTAS.map((cta) => (
            <a
              key={cta.href}
              href={cta.href}
              {...EXTERNAL_LINK_ATTRS}
              className={
                cta.variant === "primary"
                  ? PRIMARY_CTA_CLASSES
                  : SECONDARY_CTA_CLASSES
              }
            >
              {cta.label}
              <span aria-hidden="true">→</span>
            </a>
          ))}
        </div>

        <p className="mt-12 text-sm text-fg-subtle">
          Testnet prototype in the works. Not live yet.
        </p>
      </div>
    </section>
  );
}
