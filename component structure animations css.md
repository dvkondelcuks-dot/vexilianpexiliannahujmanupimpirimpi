# DOCUMENT 4

# MUI + AntD component structure, Anime.js animation, custom CSS

## Technical boundary

Use only:

* Next.js
* MUI / Material UI
* Ant Design
* Anime.js
* custom CSS / CSS modules / CSS variables

No Framer Motion.
No GSAP.
No Lottie.
No Three.js.
No Tailwind.
No random animation libraries.

MUI provides production-ready React UI components and design-system primitives, while Ant Design provides a broad enterprise component set including form and layout components. ([MUI][2]) AntD’s `ConfigProvider` can pass global configuration to components through context, and AntD Form provides validation and data-entry structure, so AntD should handle the audit intake form. ([Ant Design][3]) Anime.js supports SVG utilities such as line drawing and motion-path animation, which fits your flow-map visuals. ([Anime.js][4])

---

## Library responsibility split

### Use MUI for

Global layout:

`Box`
`Container`
`Grid`
`Stack`

Content surfaces:

`Card`
`CardContent`
`Paper`

Typography:

`Typography`

Navigation and buttons:

`Button`
`IconButton`

Accordion if you want MUI style in FAQ:

`Accordion`
`AccordionSummary`
`AccordionDetails`

Theme:

`ThemeProvider`
`CssBaseline`

### Use AntD for

Audit form:

`Form`
`Input`
`Select`
`Button` if form-specific
`Checkbox` if needed

Process or phase display:

`Steps` optional
`Timeline` optional
`Collapse` optional

Data-like UI:

`Statistic`
`Tag`
`Badge`

Use AntD sparingly. If you mix too much MUI and AntD visually, it will look incoherent.

Best rule:

MUI = site shell and visual system.
AntD = form and structured enterprise input.

---

## File structure

```txt
/app
  /layout.tsx
  /page.tsx
  /globals.css
  /theme.ts
  /providers.tsx

/components
  /layout
    SiteFrame.tsx
    Header.tsx
    Footer.tsx
    SectionShell.tsx
    SectionHeader.tsx

  /sections
    HeroSection.tsx
    DiagnosisSection.tsx
    ApproachSection.tsx
    FounderSection.tsx
    SystemSection.tsx
    DiagnosticsDiagramSection.tsx
    CollaborationSection.tsx
    ProcessSection.tsx
    CaseStudiesSection.tsx
    FAQSection.tsx
    AuditSection.tsx

  /visual
    SystemBackground.tsx
    FounderOperatingStrip.tsx
    ClientDisappearanceMap.tsx
    IncidentMiniDiagram.tsx
    DoctrineDiagram.tsx
    FounderOperatorCard.tsx
    SixLayerStack.tsx
    VexSystemDiagram.tsx
    ScopeLockRail.tsx
    BuildMovementRail.tsx
    CaseSystemOverlay.tsx
    AuditFlowBackground.tsx

  /ui
    VexButton.tsx
    VexCard.tsx
    SignalChip.tsx
    MetaLabel.tsx
    TelemetryValue.tsx
    StatusDot.tsx

/data
  pageCopy.ts
  diagnosis.ts
  founders.ts
  layers.ts
  phases.ts
  process.ts
  cases.ts
  faq.ts

/hooks
  useAnimeInView.ts
  usePrefersReducedMotion.ts
  useScrollSectionState.ts

/styles
  tokens.css
  animations.css
  diagrams.css
```

---

## Theme setup

Use MUI theme as the base.

```ts
// app/theme.ts
import { createTheme } from "@mui/material/styles";

export const vexTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#07090B",
      paper: "#101419",
    },
    text: {
      primary: "#F4F7FA",
      secondary: "#A7B0BA",
    },
    primary: {
      main: "#7EA7FF",
    },
    warning: {
      main: "#E6A84A",
    },
    success: {
      main: "#8FD18A",
    },
  },
  typography: {
    fontFamily: "var(--font-geist-sans), Inter, sans-serif",
    h1: {
      fontSize: "clamp(2.75rem, 7vw, 4.75rem)",
      lineHeight: 0.95,
      letterSpacing: "-0.055em",
      fontWeight: 520,
    },
    h2: {
      fontSize: "clamp(2rem, 4.8vw, 3.25rem)",
      lineHeight: 1.02,
      letterSpacing: "-0.04em",
      fontWeight: 520,
    },
    body1: {
      fontSize: "1.05rem",
      lineHeight: 1.65,
    },
  },
  shape: {
    borderRadius: 18,
  },
});
```

---

## AntD config

```tsx
// app/providers.tsx
"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { ConfigProvider, theme as antdTheme } from "antd";
import { vexTheme } from "./theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={vexTheme}>
      <ConfigProvider
        theme={{
          algorithm: antdTheme.darkAlgorithm,
          token: {
            colorPrimary: "#7EA7FF",
            colorBgBase: "#07090B",
            colorBgContainer: "#101419",
            colorBorder: "rgba(255,255,255,0.10)",
            colorText: "#F4F7FA",
            colorTextSecondary: "#A7B0BA",
            borderRadius: 14,
            fontFamily: "var(--font-geist-sans), Inter, sans-serif",
          },
        }}
      >
        <CssBaseline />
        {children}
      </ConfigProvider>
    </ThemeProvider>
  );
}
```

---

## Custom CSS tokens

```css
:root {
  --bg: #07090B;
  --bg-2: #0B0E11;
  --surface: #101419;
  --surface-2: #151B22;
  --border: rgba(255,255,255,0.08);
  --border-strong: rgba(255,255,255,0.16);

  --text: #F4F7FA;
  --text-2: #A7B0BA;
  --text-3: #6D7782;

  --signal-blue: #7EA7FF;
  --signal-amber: #E6A84A;
  --signal-green: #8FD18A;
  --signal-red: #D96C5F;

  --grid-line: rgba(255,255,255,0.035);
  --panel-blur: blur(16px);
}
```

---

## Core visual CSS

```css
.vex-panel {
  background:
    linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015)),
    var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.06),
    0 24px 80px rgba(0,0,0,0.32);
}

.vex-grid-bg {
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 40px 40px;
}

.vex-noise::after {
  content: "";
  pointer-events: none;
  position: absolute;
  inset: 0;
  opacity: 0.035;
  background-image: url("/noise.png");
  mix-blend-mode: screen;
}

.vex-meta {
  font-family: var(--font-geist-mono), monospace;
  text-transform: uppercase;
  letter-spacing: 0.13em;
  font-size: 11px;
  color: var(--text-3);
}
```

---

## Anime.js hook

```ts
// hooks/useAnimeInView.ts
"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

export function useAnimeInView<T extends HTMLElement>(
  selector: string,
  animation: Parameters<typeof animate>[1],
  options?: { once?: boolean; rootMargin?: string }
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    let played = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (options?.once && played) return;

        played = true;
        const targets = root.querySelectorAll(selector);
        if (targets.length) animate(targets, animation);
      },
      { threshold: 0.25, rootMargin: options?.rootMargin ?? "0px" }
    );

    observer.observe(root);

    return () => observer.disconnect();
  }, [selector, animation, options?.once, options?.rootMargin]);

  return ref;
}
```

---

## Hero animation

### Object

`ClientDisappearanceMap`

### Anime.js behavior

On section enter:

1. source nodes fade in with stagger
2. path lines draw in
3. dots travel along paths
4. broken path dots fade at loss points
5. successful path dots reach output nodes

Use Anime.js SVG line drawing utilities for paths where relevant. Anime.js official SVG utilities include helpers for line drawing and motion paths. ([Anime.js][4])

### Description

The animation must feel like a scan, not a showreel.

---

## Diagnosis animation

Each incident card activates when entering viewport.

Animation:

* card opacity from 0.45 to 1
* amber leak dot pulses once
* mini SVG path draws
* status label appears from 0 to 1 opacity

No looping warning animation. Loops feel cheap.

---

## Founder section animation

Each founder operator card:

* role code appears first
* portrait fades in
* system responsibility lines draw
* “one question” line reveals last

Interaction:

hover reveals which layers the founder touches.

Dāvids:
highlights technical layers.

Miks:
highlights diagnosis, plūsma, attribution.

Edvards:
highlights communication, growth, recovery.

---

## Six-layer stack animation

On scroll:

* active layer expands
* route line brightens through active layer
* signal object changes label
* previous layer remains completed
* next layer remains inactive

Use custom state with scroll position. Anime.js can animate the layer height, opacity, stroke, and label reveal.

---

## Diagnostics diagram animation

On enter:

1. grid opacity rises slightly
2. source nodes appear
3. system nodes draw
4. main route lines draw
5. recovery loop draws dashed
6. telemetry values tick once
7. owner visibility strip activates

This should run once.

---

## Case card animation

Hover only:

* photo darkens slightly
* overlay line brightens
* sanitized dashboard fragment becomes clearer
* CTA arrow moves 6px right

No aggressive image zoom.

---

## Audit form animation

On focus:

* field border turns blue
* corresponding group label brightens
* faint flow line moves toward active field

Textarea focus:

* background flow line ends at textarea
* breakpoint chips appear below it

---