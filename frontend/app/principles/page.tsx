import type { Metadata } from "next";
import Link from "next/link";

// "Principles" + the `title.template` defined in app/layout.tsx produces
// the final tab title "Principles | DAOIA". The root `robots: noindex`
// setting is inherited — no per-page override needed while we remain on
// pre-launch status.
export const metadata: Metadata = {
  title: "Principles",
};

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

/**
 * Stub route — the full non-negotiables page will be written in a later
 * session (Phase 0 item: "rédiger la page principes constitutionnels").
 * Holding the /principles route now prevents 404s from the SiteHeader
 * nav link and pins the URL for public sharing.
 */
export default function PrinciplesPage() {
  /*
   * The `id="main-content"` target for the skip-link lives on the wrapper
   * <div> in app/layout.tsx, not here — keeping it there makes the skip
   * link work across every route (including the template page.tsx on /).
   * This <main> remains the semantic landmark, but without the id to
   * avoid a duplicate-id conflict inside the rendered document.
   */
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="mx-auto max-w-prose text-center">
        <h1 className="text-[40px] font-semibold leading-heading tracking-display md:text-[56px]">
          Principles
        </h1>
        <p className="mt-6 text-fg-muted">
          The non-negotiables page is under construction. In the meantime, read
          the guardrails summary on the{" "}
          <Link
            href="/#guardrails"
            className={`rounded text-signal underline underline-offset-4 transition-colors hover:text-fg-primary motion-safe:duration-150 ${FOCUS_RING}`}
          >
            homepage
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
