import Link from "next/link";

interface HeroProps {
  headline: string;
  subhead: string;
  primaryCta: { label: string; href: string; external?: boolean };
  secondaryCta?: { label: string; href: string; external?: boolean };
  disclaimer: string;
}

const EXTERNAL_LINK_ATTRS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

// Same focus-visible pattern as SiteHeader / SiteFooter: amber ring offset
// against the canvas. Keyboard-only affordance — no ring on mouse clicks.
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

const PRIMARY_CTA_CLASSES =
  `inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-medium text-canvas transition-opacity hover:opacity-90 motion-safe:duration-150 ${FOCUS_RING}`;

const SECONDARY_CTA_CLASSES =
  `inline-flex items-center justify-center rounded-full border border-hairline px-6 py-3 text-base font-medium text-fg-primary transition-colors hover:border-fg-muted motion-safe:duration-150 ${FOCUS_RING}`;

/**
 * Hero — the landing's single content section in v1. See
 * docs/landing_wireframe_v1.md §2 Composant 2 for the original spec.
 *
 * Layout rationale:
 *   - Outer container is `max-w-4xl` (896 px) so the 64 px desktop H1 has
 *     room to breathe; 720 px (our prose width) would force the headline
 *     onto 3-4 lines.
 *   - Subhead + CTAs + disclaimer live in a nested `max-w-2xl` (672 px) so
 *     their line length stays in the 45-75 char comfort range. An 18-20 px
 *     paragraph over 896 px would run ~100 chars/line, past the comfort
 *     ceiling for sustained reading.
 *   - Content is left-aligned. Linear, Vercel, Paradigm, Ethereum.org and
 *     Anthropic all use left-aligned heroes — what the dev-crypto target
 *     audience expects editorially. Centered heroes read as conference
 *     slides, which is not the voice this project wants.
 */
export function Hero({
  headline,
  subhead,
  primaryCta,
  secondaryCta,
  disclaimer,
}: HeroProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="px-6 py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-4xl">
        <h1
          id="hero-heading"
          className="text-[40px] font-semibold leading-heading tracking-display text-fg-primary md:text-[64px]"
        >
          {headline}
        </h1>

        <div className="mt-6 max-w-2xl">
          <p className="text-lg text-fg-muted md:text-xl">{subhead}</p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            {/*
             * Primary CTA. The `→` glyph is wrapped in aria-hidden so it's
             * skipped by screen readers (which already announce the label).
             * It also gives us a handle for future micro-motion on hover
             * (e.g. translate-x-1) without retouching the label text.
             */}
            {primaryCta.external ? (
              <a
                href={primaryCta.href}
                {...EXTERNAL_LINK_ATTRS}
                className={PRIMARY_CTA_CLASSES}
              >
                {primaryCta.label}
                <span aria-hidden="true">→</span>
              </a>
            ) : (
              <Link
                href={primaryCta.href}
                className={PRIMARY_CTA_CLASSES}
              >
                {primaryCta.label}
                <span aria-hidden="true">→</span>
              </Link>
            )}

            {secondaryCta &&
              (secondaryCta.external ? (
                <a
                  href={secondaryCta.href}
                  {...EXTERNAL_LINK_ATTRS}
                  className={SECONDARY_CTA_CLASSES}
                >
                  {secondaryCta.label}
                </a>
              ) : (
                <Link
                  href={secondaryCta.href}
                  className={SECONDARY_CTA_CLASSES}
                >
                  {secondaryCta.label}
                </Link>
              ))}
          </div>

          <p className="mt-6 text-xs text-fg-subtle">{disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
