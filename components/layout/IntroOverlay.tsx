"use client";

import { useEffect, useState } from "react";

/**
 * Pre-load technical intro overlay.
 *
 * Sequence (~1.85s):
 *   0   – 200ms : black plate with corner brackets fade in
 *   200 – 600ms : grid + scanlines flash, V mark stamps in
 *   600 – 1100ms: vertical sweep beam pass with text typing
 *   1100– 1500ms: telemetry strings flicker, BOOT OK confirmation
 *   1500– 1850ms: full overlay slides up & fades out, page receives
 *                 a `vex-booted` class on <html> to enable the global reveals.
 *
 * Honors `prefers-reduced-motion: reduce` by skipping the animation entirely.
 */
export function IntroOverlay() {
  const [phase, setPhase] = useState<"booting" | "leaving" | "done">("booting");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      document.documentElement.classList.add("vex-booted");
      setPhase("done");
      return;
    }
    // already booted in this session — skip to keep navigation snappy
    if (sessionStorage.getItem("vex.booted") === "1") {
      document.documentElement.classList.add("vex-booted");
      setPhase("done");
      return;
    }

    document.documentElement.classList.add("vex-booting");
    const t1 = window.setTimeout(() => {
      setPhase("leaving");
      document.documentElement.classList.remove("vex-booting");
      document.documentElement.classList.add("vex-booted");
    }, 1500);
    const t2 = window.setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("vex.booted", "1");
    }, 1900);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={`vex-intro ${phase === "leaving" ? "vex-intro--leaving" : ""}`} aria-hidden="true">
      {/* corner brackets */}
      <span className="vex-intro__bracket vex-intro__bracket--tl" />
      <span className="vex-intro__bracket vex-intro__bracket--tr" />
      <span className="vex-intro__bracket vex-intro__bracket--bl" />
      <span className="vex-intro__bracket vex-intro__bracket--br" />

      {/* technical grid */}
      <div className="vex-intro__grid" />
      <div className="vex-intro__scanlines" />
      <div className="vex-intro__sweep" />

      {/* center mark */}
      <div className="vex-intro__center">
        <svg width="84" height="84" viewBox="0 0 84 84" className="vex-intro__mark" role="img" aria-label="Vexillian">
          <path d="M14 14 L42 70 L70 14" fill="none" stroke="#3BFF7C" strokeWidth="2.4" strokeLinecap="square" />
          <circle cx="42" cy="42" r="34" fill="none" stroke="#3BFF7C" strokeOpacity="0.55" strokeDasharray="3 5" />
        </svg>
        <div className="vex-intro__brand">VEXILLIAN</div>
        <div className="vex-intro__sub">SISTĒMU INICIALIZĀCIJA</div>
      </div>

      {/* boot strip */}
      <div className="vex-intro__strip">
        <span className="vex-intro__chip">V/2026</span>
        <span className="vex-intro__chip vex-intro__chip--mute">SHELL · NETUNE</span>
        <span className="vex-intro__chip vex-intro__chip--mute">LAYER · SYSTEM</span>
        <span className="vex-intro__chip vex-intro__chip--ok">BOOT · OK</span>
      </div>
    </div>
  );
}
