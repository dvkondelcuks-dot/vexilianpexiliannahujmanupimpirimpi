"use client";

import { useEffect } from "react";

/**
 * Sitewide reveal-on-scroll animation system.
 *
 * Use by adding any of these data attributes to an element:
 *   data-reveal              — base reveal (fade + lift)
 *   data-reveal="up"         — translate from below (default)
 *   data-reveal="down"       — translate from above
 *   data-reveal="left"       — translate from left
 *   data-reveal="right"      — translate from right
 *   data-reveal="fade"       — opacity only (no transform)
 *   data-reveal="zoom"       — scale + fade
 *   data-reveal-delay="120"  — extra delay in ms
 *   data-reveal-stagger      — applied to a parent; direct children with [data-reveal]
 *                              auto-receive an incrementing 80ms stagger.
 *
 * The system honors `prefers-reduced-motion: reduce` by immediately marking
 * everything as revealed without animation.
 */
export function RevealController() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const apply = () => {
      // first, walk stagger parents and assign delays to direct reveal children
      document.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((parent) => {
        const step = Number(parent.dataset.revealStaggerStep ?? 90);
        const base = Number(parent.dataset.revealStaggerBase ?? 0);
        let i = 0;
        parent.querySelectorAll<HTMLElement>(":scope > [data-reveal]").forEach((child) => {
          if (!child.style.getPropertyValue("--vex-reveal-delay")) {
            child.style.setProperty("--vex-reveal-delay", `${base + i * step}ms`);
          }
          i += 1;
        });
      });

      const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
      // assign explicit delay variable for any element with data-reveal-delay
      elements.forEach((el) => {
        const d = el.dataset.revealDelay;
        if (d && !el.style.getPropertyValue("--vex-reveal-delay")) {
          el.style.setProperty("--vex-reveal-delay", `${d}ms`);
        }
        el.classList.add("vex-reveal");
      });

      if (reduce) {
        elements.forEach((el) => el.classList.add("vex-reveal--in"));
        return null;
      }

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("vex-reveal--in");
              io.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: "0px 0px -8% 0px",
          threshold: 0.08
        }
      );
      elements.forEach((el) => io.observe(el));
      return io;
    };

    let io: IntersectionObserver | null = null;
    let scanTimer: number | null = null;

    const start = () => {
      io = apply();
      // re-scan once after a short delay to catch client-only mounts (charts, etc.)
      scanTimer = window.setTimeout(() => {
        io?.disconnect();
        io = apply();
      }, 600);
    };

    // Wait for the intro overlay to finish before observing, otherwise hero
    // elements would silently animate behind the overlay.
    if (document.documentElement.classList.contains("vex-booted") || reduce) {
      start();
    } else {
      const wait = window.setTimeout(start, 1500);
      return () => {
        window.clearTimeout(wait);
        if (scanTimer) window.clearTimeout(scanTimer);
        io?.disconnect();
      };
    }

    return () => {
      if (scanTimer) window.clearTimeout(scanTimer);
      io?.disconnect();
    };
  }, []);

  return null;
}
