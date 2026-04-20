import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// -----------------------------------------------------------------------------
// Site-wide constants.
// Kept here (not in a separate file) because layout.tsx is the only current
// consumer. Move to `app/site-config.ts` if a second surface needs them.
// -----------------------------------------------------------------------------
const SITE_URL = "https://daoia.io";
const SITE_NAME = "DAOIA";
const OG_TITLE = "DAOIA — Governance where AI helps, never votes for you";
const OG_DESCRIPTION =
  "An AI-augmented DAO where agents help humans read, simulate, and act on proposals — under a strict on-chain policy. The decision stays yours.";

// -----------------------------------------------------------------------------
// Metadata — Next.js App Router Metadata API.
// Notes:
//   - `title.template` adds the "| DAOIA" suffix to child routes. The root
//     uses `title.default` alone.
//   - `robots: { index: false, follow: false, nocache: true }` keeps the site
//     out of search engines until we flip it explicitly at launch.
//   - `openGraph.images` and `twitter.images` are intentionally unset — the
//     custom OG image is generated in étape 6 via @vercel/og.
//   - `keywords` is intentionally omitted: Google dropped it as a signal in
//     2009; keeping it clutters the <head> and provides no SEO benefit.
//   - `icons` is NOT declared here: Next.js auto-detects `app/favicon.ico`.
//   - `themeColor` lives in the separate `viewport` export below, not here
//     (deprecated inside `metadata` since Next.js 14).
// -----------------------------------------------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DAOIA — AI-augmented DAO",
    template: "%s | DAOIA",
  },
  description:
    "An AI-augmented DAO. Agents help you read, simulate, and execute proposals — under a strict on-chain policy. You keep the vote.",
  applicationName: SITE_NAME,
  authors: [{ name: "DAOIA contributors" }],
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@daoiaprotocol",
    creator: "@daoiaprotocol",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
  },
};

// -----------------------------------------------------------------------------
// Viewport — Next.js 14+ separated `viewport` export.
//   - themeColor = bg-canvas, so the mobile browser chrome (URL bar, notch
//     area) blends into the page background.
//   - colorScheme: "dark" tells the UA to render form controls, scrollbars,
//     and any built-in chrome in dark mode by default.
// -----------------------------------------------------------------------------
export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full bg-canvas text-fg-primary antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        {/*
         * Vercel Analytics — only sends events in production builds
         * (process.env.NODE_ENV === "production"). In dev it prints debug
         * info to the browser console. No manual gating needed.
         */}
        <Analytics />
      </body>
    </html>
  );
}
