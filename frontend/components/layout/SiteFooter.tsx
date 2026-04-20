import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";

const EXTERNAL_LINK_ATTRS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

const FOOTER_LINKS = [
  { label: "Principles", href: "/principles", external: false },
  { label: "GitHub", href: "https://github.com/daoia-conceptus/daoia", external: true },
  { label: "Discord", href: "https://discord.gg/KmEs2QVk", external: true },
  { label: "X", href: "https://x.com/daoiaprotocol", external: true },
];

// Shared focus-visible ring: only shows on keyboard nav (not mouse click).
// See SiteHeader for the same pattern and rationale.
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

const NAV_LINK =
  "text-fg-muted transition-colors hover:text-fg-primary motion-safe:duration-150";

/**
 * Pure Server Component — no state, no events. Zero JS shipped to the client.
 */
export function SiteFooter() {
  return (
    <footer role="contentinfo" className="mt-16 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Row 1 — tagline column + links nav, stacked on mobile */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Wordmark className="h-5 w-auto text-fg-primary" />
            <p className="mt-3 text-sm text-fg-muted">
              An AI-augmented DAO, built in public.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      {...EXTERNAL_LINK_ATTRS}
                      className={`${NAV_LINK} ${FOCUS_RING} rounded`}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className={`${NAV_LINK} ${FOCUS_RING} rounded`}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Row 2 — disclaimer + copyright, stacked on mobile */}
        <div className="mt-10 flex flex-col gap-2 border-t border-hairline pt-6 text-xs text-fg-subtle sm:flex-row sm:justify-between">
          <p>Experimental. Testnet only. Not an investment.</p>
          <p>
            © 2026 DAOIA contributors ·{" "}
            <a
              href="https://github.com/daoia-conceptus/daoia/blob/main/LICENSE"
              {...EXTERNAL_LINK_ATTRS}
              className={`underline-offset-4 hover:underline ${FOCUS_RING} rounded`}
            >
              MIT license
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
