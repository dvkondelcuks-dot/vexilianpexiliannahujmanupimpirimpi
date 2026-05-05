"use client";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import anime from "animejs";
import { useAnimeInView } from "@/hooks/useAnimeInView";
import { CHART } from "./chartPrimitives";

// Background plate behind the audit form: a faint Recharts-style grid + a
// single decay curve that finishes with a recovery uptick. Decorative only —
// it should read as a calibration trace, not as illustration.
//
// To eliminate the first-load glitch we (a) defer mount until after hydration
// so the SSR markup never paints a half-styled SVG, and (b) pre-stamp explicit
// stroke-dasharray/offset so the trace is invisible the moment it is mounted,
// before anime.js takes over.
export function AuditFlowBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const ref = useAnimeInView<HTMLDivElement>((node) => {
    const lines = node.querySelectorAll<SVGPathElement>(".audit-trace");
    lines.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });
    anime({ targets: lines, strokeDashoffset: 0, delay: anime.stagger(220), duration: 1600, easing: "easeInOutSine" });
    anime({ targets: node.querySelectorAll(".audit-tick"), opacity: [0, 0.6], delay: anime.stagger(40, { start: 220 }), duration: 600, easing: "easeOutQuad" });
  });

  if (!mounted) return null;

  return (
    <Box ref={ref} aria-hidden="true" sx={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.55 }}>
      <svg viewBox="0 0 980 620" style={{ width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
        {/* horizontal gridlines */}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`g-${i}`} className="audit-tick" x1={0} x2={980} y1={60 + i * 60} y2={60 + i * 60} stroke={CHART.grid} opacity={0} />
        ))}
        {/* decay then recover curve — pre-hidden via dasharray so the path
            never flashes fully drawn before anime takes over. */}
        <path
          className="audit-trace"
          d="M20 200 C160 220 220 380 360 380 C500 380 560 320 700 300 C800 286 860 260 960 230"
          fill="none"
          stroke={CHART.amber}
          strokeOpacity={0.55}
          strokeWidth={1.4}
          style={{ strokeDasharray: "1600", strokeDashoffset: "1600" }}
        />
        <path
          className="audit-trace"
          d="M20 320 C180 326 260 420 420 420 C580 420 660 360 820 348 C900 342 940 338 960 336"
          fill="none"
          stroke={CHART.lime}
          strokeOpacity={0.45}
          strokeWidth={1.4}
          style={{ strokeDasharray: "1600", strokeDashoffset: "1600" }}
        />
        {/* axis ticks bottom */}
        {Array.from({ length: 8 }).map((_, i) => (
          <text key={`x-${i}`} className="audit-tick" x={60 + i * 130} y={600} fill={CHART.axis} fontSize="9" opacity={0} fontFamily="var(--mono)">D{String(i * 2).padStart(2, "0")}</text>
        ))}
      </svg>
    </Box>
  );
}
