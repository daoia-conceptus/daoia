"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";

const EXTERNAL_LINK_ATTRS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

const GITHUB_URL = "https://github.com/daoia-conceptus/daoia";
const DISCORD_URL = "https://discord.gg/KmEs2QVk";

// Scroll threshold (in px) before toggling the backdrop-blur state.
// 8 px avoids flicker on sub-pixel bounce-scroll on trackpads.
const SCROLL_THRESHOLD = 8;

// Reusable focus-visible ring. `focus-visible` (NOT `focus`) keeps the
// ring off mouse clicks — it only shows on keyboard navigation, which is
// the modern a11y best practice.
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

const NAV_LINK =
  "text-fg-muted transition-colors hover:text-fg-primary motion-safe:duration-150";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  // Tracks whether the menu was ever opened — used to know when to restore
  // focus to the hamburger on close without stealing focus on initial mount.
  const wasOpenRef = useRef(false);

  // Scroll listener: toggle the blurred/border-on state past the threshold.
  useEffect(() => {
    const onScroll = () =>
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll(); // initialize on mount in case the page loads already scrolled
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock while the mobile menu is open.
  useEffect(() => {
    if (!isMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMenuOpen]);

  // Close menu on Escape key.
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  // Focus management: move focus into the menu on open, return it to the
  // hamburger on close. `wasOpenRef` avoids grabbing focus on initial mount.
  useEffect(() => {
    if (isMenuOpen) {
      wasOpenRef.current = true;
      closeButtonRef.current?.focus();
    } else if (wasOpenRef.current) {
      hamburgerRef.current?.focus();
      wasOpenRef.current = false;
    }
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 h-16 w-full border-b transition-[background-color,backdrop-filter,border-color] duration-200 ${
          isScrolled
            ? "bg-canvas/70 backdrop-blur-md border-hairline"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          {/*
           * Wordmark — h-5 (20px). A 64 px header leaves ~44 px of vertical
           * breathing room, which reads tight but not cramped. h-6 (24 px)
           * starts to feel heavy against Geist Sans at this nav scale.
           */}
          <Link
            href="/"
            aria-label="DAOIA home"
            className={`flex items-center rounded ${FOCUS_RING}`}
          >
            <Wordmark className="h-5 w-auto text-fg-primary" />
          </Link>

          {/* Desktop nav — hidden below md (768 px). */}
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link
                  href="/principles"
                  className={`rounded px-1 ${NAV_LINK} ${FOCUS_RING}`}
                >
                  Principles
                </Link>
              </li>
              <li>
                <a
                  href={GITHUB_URL}
                  {...EXTERNAL_LINK_ATTRS}
                  className={`rounded px-1 ${NAV_LINK} ${FOCUS_RING}`}
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={DISCORD_URL}
                  {...EXTERNAL_LINK_ATTRS}
                  className={`inline-flex items-center rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-canvas transition-opacity hover:opacity-90 motion-safe:duration-150 ${FOCUS_RING}`}
                >
                  Discord
                </a>
              </li>
            </ul>
          </nav>

          {/* Hamburger — only visible below md. */}
          <button
            type="button"
            ref={hamburgerRef}
            onClick={() => setIsMenuOpen(true)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            className={`rounded p-2 text-fg-primary md:hidden ${FOCUS_RING}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          </button>
        </div>
      </header>

      {/*
       * Mobile menu. Always mounted so the slide transition works; visibility
       * is driven by `translate-x` + `pointer-events-none`. `motion-safe:`
       * gates the transition on reduced-motion preference — users who opted
       * into reduced motion see the menu appear instantly.
       */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal={isMenuOpen}
        aria-hidden={!isMenuOpen}
        aria-label="Main menu"
        className={`fixed inset-0 z-50 bg-canvas motion-safe:transition-transform motion-safe:duration-200 ease-out md:hidden ${
          isMenuOpen
            ? "translate-x-0"
            : "pointer-events-none translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <Wordmark className="h-5 w-auto text-fg-primary" />
          <button
            type="button"
            ref={closeButtonRef}
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
            tabIndex={isMenuOpen ? 0 : -1}
            className={`rounded p-2 text-fg-primary ${FOCUS_RING}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>

        <nav aria-label="Main" className="flex flex-col gap-6 px-6 py-10">
          <Link
            href="/principles"
            onClick={() => setIsMenuOpen(false)}
            tabIndex={isMenuOpen ? 0 : -1}
            className={`rounded text-2xl font-semibold text-fg-primary ${FOCUS_RING}`}
          >
            Principles
          </Link>
          <a
            href={GITHUB_URL}
            {...EXTERNAL_LINK_ATTRS}
            onClick={() => setIsMenuOpen(false)}
            tabIndex={isMenuOpen ? 0 : -1}
            className={`rounded text-2xl font-semibold text-fg-primary ${FOCUS_RING}`}
          >
            GitHub
          </a>
          <a
            href={DISCORD_URL}
            {...EXTERNAL_LINK_ATTRS}
            onClick={() => setIsMenuOpen(false)}
            tabIndex={isMenuOpen ? 0 : -1}
            className={`mt-4 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-base font-medium text-canvas ${FOCUS_RING}`}
          >
            Join Discord
          </a>
        </nav>
      </div>
    </>
  );
}
