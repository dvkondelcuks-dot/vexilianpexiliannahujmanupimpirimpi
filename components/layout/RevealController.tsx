"use client";

import { useEffect } from "react";

/**
 * Sitewide reveal-on-scroll animation system.
 *
 * Direct usage on any element:
 *   data-reveal              — base reveal (fade + lift)
 *   data-reveal="up|down|left|right|fade|zoom|tilt|rise"
 *   data-reveal-exit="up|down|left|right|fade|zoom|tilt"  (motion when scrolled past)
 *   data-reveal-delay="120"  — extra delay in ms
 *   data-reveal-stagger      — parent: direct [data-reveal] children get incremental 90ms stagger
 *
 * Per-section auto-choreography:
 *   Every <section id="..."> on the page is automatically tagged with
 *   data-reveal-section="<id>". Direct .industrial-card descendants of each
 *   section are auto-assigned a directional reveal + exit + stagger that is
 *   unique to that section, so the page reads as a sequence of distinct
 *   choreographed acts.
 *
 * Honors `prefers-reduced-motion: reduce`.
 */

type SectionChoreography = {
  enter: (i: number, total: number) => string;     // direction
  exit: (i: number, total: number) => string;      // exit direction
  step?: number;                                   // ms per index for stagger
  base?: number;                                   // ms baseline delay
};

const SECTION_CHOREO: Record<string, SectionChoreography> = {
  manifest: {
    enter: () => "up",
    exit: () => "up",
    step: 110,
    base: 0
  },
  diagnoze: {
    // alternating left/right for that "incoming evidence" feel
    enter: (i) => (i % 2 === 0 ? "left" : "right"),
    exit: (i) => (i % 2 === 0 ? "right" : "left"),
    step: 90,
    base: 0
  },
  pieeja: {
    // doctrine cards land like stamps
    enter: () => "zoom",
    exit: () => "zoom",
    step: 110,
    base: 0
  },
  founders: {
    // each operator card rises in succession
    enter: () => "rise",
    exit: () => "up",
    step: 120,
    base: 0
  },
  system: {
    // six-layer stack cascades from above
    enter: () => "down",
    exit: () => "up",
    step: 90,
    base: 0
  },
  process: {
    // process scenes slide right in
    enter: () => "right",
    exit: () => "left",
    step: 100,
    base: 0
  },
  cases: {
    // case studies stamp + scale
    enter: () => "tilt",
    exit: () => "zoom",
    step: 120,
    base: 0
  },
  audits: {
    // audit form + steps lift with scale
    enter: (i) => (i === 0 ? "left" : i === 1 ? "right" : "rise"),
    exit: () => "fade",
    step: 110,
    base: 0
  }
};

const DEFAULT_CHOREO: SectionChoreography = {
  enter: () => "up",
  exit: () => "up",
  step: 90,
  base: 0
};

export function RevealController() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const tagSections = () => {
      // tag each <section id="..."> with data-reveal-section so styles can scope
      document.querySelectorAll<HTMLElement>("section[id]").forEach((sec) => {
        if (!sec.dataset.revealSection) sec.dataset.revealSection = sec.id;
        const choreo = SECTION_CHOREO[sec.id] ?? DEFAULT_CHOREO;

        // collect candidate cards: direct .industrial-card descendants only
        const cards = Array.from(sec.querySelectorAll<HTMLElement>(".industrial-card"));
        const total = cards.length;
        cards.forEach((card, i) => {
          if (!card.hasAttribute("data-reveal")) {
            card.setAttribute("data-reveal", choreo.enter(i, total));
          }
          if (!card.hasAttribute("data-reveal-exit")) {
            card.setAttribute("data-reveal-exit", choreo.exit(i, total));
          }
          if (!card.style.getPropertyValue("--vex-reveal-delay")) {
            const step = choreo.step ?? 90;
            const base = choreo.base ?? 0;
            card.style.setProperty("--vex-reveal-delay", `${base + i * step}ms`);
          }
        });
      });
    };

    const apply = () => {
      tagSections();

      // walk stagger parents and assign delays to direct reveal children
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
            const el = entry.target as HTMLElement;
            const rect = entry.boundingClientRect;
            const vh = window.innerHeight || document.documentElement.clientHeight;
            const fullyAbove = rect.bottom < vh * 0.0;   // fully scrolled past upward
            const fullyBelow = rect.top > vh * 1.0;       // fully below viewport
            // Require deeper intersection both directions: 25% in view to enter, fully out to exit
            if (entry.isIntersecting && entry.intersectionRatio > 0.18) {
              el.classList.add("vex-reveal--in");
              el.classList.remove("vex-reveal--out");
            } else if (fullyAbove) {
              el.classList.add("vex-reveal--out");
              el.classList.remove("vex-reveal--in");
            } else if (fullyBelow) {
              el.classList.remove("vex-reveal--in");
              el.classList.remove("vex-reveal--out");
            }
          });
        },
        {
          rootMargin: "-12% 0px -18% 0px",
          threshold: [0, 0.05, 0.18, 0.4, 0.7, 1]
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
