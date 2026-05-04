# DOCUMENT 5

# Build specifications

## Objective

Build a dark founder-led Vexilian website that presents the company as a commercial systems builder for Latvian SMEs.

The site must make one thing unmistakable:

**Vexilian exposes where clients disappear and builds the system that makes the flow visible.**

---

## Non-negotiable product principles

1. No decorative graphics without business meaning.
2. No generic SaaS dashboard aesthetic.
3. No AI cliché visuals.
4. No floating shapes, blobs, 3D cubes, or pointless motion.
5. Every section needs a distinct visual function.
6. The site must feel founder-led, not agency-generic.
7. The system must feel specific to Latvian SME reality.
8. Real client proof must combine human business imagery with system overlays.
9. Copy must be dense in meaning but light in visible reading load.
10. Animation must communicate system movement.

---

## Page architecture

Final section order:

0. Hero / Manifest
1. Diagnoze
2. Pieeja
3. Par mums / Founders
4. Sistēma
5. Diagnostika
6. Sadarbība
7. Process
8. Atlasīti darbi
9. Skaidrība
10. Audits
11. Footer

---

## Required components

### Layout components

`SiteFrame`
Wraps full site.

`Header`
Dark transparent nav, becomes solid on scroll.

`Footer`
System close bar.

`SectionShell`
Standard section spacing and max width.

`SectionHeader`
Eyebrow, heading, body.

---

### Visual components

`SystemBackground`
Grid, radial glow, noise, optional section mode.

`ClientDisappearanceMap`
Hero SVG showing client flow and breakpoints.

`FounderOperatingStrip`
Hero bottom status bar.

`DiagnosisIncidentBoard`
Five forensic cards.

`DoctrinePanels`
Three principles.

`FounderOperatorGrid`
Dāvids, Miks, Edvards cards.

`SixLayerStack`
Interactive system layer architecture.

`VexSystemDiagram`
Full internal diagnostic diagram.

`ScopeLockRail`
Commercial collaboration phases.

`BuildMovementRail`
Process timeline.

`CaseStudySystemCard`
Real image + system overlay.

`TerminalFAQ`
Accordion.

`AuditIntakeConsole`
AntD form.

---

## Content data objects

Do not hardcode all text inside section components.

Use data files.

### `founders.ts`

```ts
export const founders = [
  {
    id: "davids",
    name: "Dāvids",
    role: "Technical & Structure",
    operatorCode: "OPERATOR 01 / STRUCTURE",
    focus: ["tehniskā arhitektūra", "datu struktūra", "CRM loģika", "integrācijas", "sistēmas stabilitāte"],
    question: "kur šis datiņš dzīvos, kas to redzēs, un kas notiks, ja cilvēks pazudīs?",
    visualMode: "architecture",
    layers: ["Forma", "CRM", "Atribūcija", "Skats"],
  },
  {
    id: "miks",
    name: "Miks",
    role: "Analysis & Marketing",
    operatorCode: "OPERATOR 02 / ANALYSIS",
    focus: ["audits", "klienta ceļš", "piedāvājuma skaidrība", "mārketinga loģika", "pozicionējums"],
    question: "kur cilvēks gribēja nopirkt, bet sistēma viņam nepalīdzēja?",
    visualMode: "analysis",
    layers: ["Plūsma", "Atribūcija", "Skats"],
  },
  {
    id: "edvards",
    name: "Edvards",
    role: "Growth & Communications",
    operatorCode: "OPERATOR 03 / GROWTH",
    focus: ["growth virziens", "komunikācija", "klientu attiecības", "tirgus signāli", "pārdošanas ritms"],
    question: "vai cilvēks saprot, kāpēc viņam jārīkojas tagad?",
    visualMode: "communication",
    layers: ["Saturs", "Atgūšana", "CRM"],
  },
];
```

### `diagnosis.ts`

```ts
export const diagnosisEvents = [
  {
    number: "01/05",
    layer: "Plūsma",
    title: "Reklāma sasniedz cilvēku. Cilvēks atver lapu. Kas notiek tālāk — to neviens neredz.",
    status: "POST-CLICK UNKNOWN",
    lossType: "Redzamības trūkums",
    visual: "postClickUnknown",
  },
  {
    number: "02/05",
    layer: "CRM",
    title: "Pirmais kontakts. Atbilde. Klusums. Liels lead kļūst par tukšu šūnu izklājlapā.",
    status: "LEAD WITHOUT OWNER",
    lossType: "Nepārvaldīts kontakts",
    visual: "leadSilence",
  },
  {
    number: "03/05",
    layer: "Atribūcija",
    title: "Septiņas reklāmas reizē strādā. Kura no tām atveda klientu? Atbildes nav.",
    status: "SOURCE UNKNOWN",
    lossType: "Mērīšanas kļūda",
    visual: "attributionGap",
  },
  {
    number: "04/05",
    layer: "Atgūšana",
    title: "Klients neatbild — un viss. Pazaudēts paliek pazaudēts, kaut neviens neko nedarīja, lai tā būtu.",
    status: "RECOVERY MISSING",
    lossType: "Nav atgriešanas mehānisma",
    visual: "noRecovery",
  },
  {
    number: "05/05",
    layer: "Skats",
    title: "Lapā cilvēks meklē. Kur viņš aiziet, kur apstājas, kur nospiež atpakaļ — to nezina pat tas, kurš lapu uztaisīja.",
    status: "OWNER BLIND SPOT",
    lossType: "Nav vadības redzamības",
    visual: "pageBlindness",
  },
];
```

---

## Asset requirements

### Real images

Purgaiļi:

* exterior image
* interior atmosphere image
* booking form screenshot
* calendar screenshot
* sanitized dashboard screenshot

La Perla:

* jewelry macro image
* store/showcase image
* hands/rings image
* Instagram grid crop
* sanitized CRM/contact or content workflow mockup

Use Next.js `Image` for image assets because the official component provides image optimization and visual stability features. ([nextjs.org][5])

### Generated/SVG assets

Build all system visuals as inline SVG React components, not exported PNGs.

Required:

* ClientDisappearanceMap
* IncidentMiniDiagram
* DoctrineDiagram
* FounderOperatorVisual
* SixLayerStack
* VexSystemDiagram
* ScopeLockRail
* BuildMovementRail
* CaseSystemOverlay
* AuditFlowBackground

Reason:

SVG allows crisp dark-interface visuals, responsive scaling, path animation, and theme-controlled colors.

---

## Accessibility requirements

1. Text contrast must remain readable on dark background.
2. Animated diagrams must not be the only way to understand content.
3. Respect `prefers-reduced-motion`.
4. Buttons and form fields must have visible focus states.
5. SVGs that are decorative should be `aria-hidden`.
6. SVGs that explain content need accessible labels.
7. Form errors must be textual, not only red borders.

---

## Performance requirements

1. Use inline SVG for diagrams.
2. Keep animation lightweight.
3. Avoid canvas unless truly necessary.
4. Avoid 3D libraries.
5. Optimize all real images.
6. Use `next/font` for typography.
7. Lazy-load heavy visual sections below fold.
8. Do not animate large layout properties unnecessarily.
9. Prefer opacity, transform, stroke-dashoffset, and CSS variables.

---

## SEO and metadata

Use Next.js metadata APIs for title, description, OG image, and page metadata; the official docs describe metadata APIs for SEO and shareability. ([nextjs.org][6])

Recommended title:

`Vexilian — Komerciālās sistēmas Latvijas MVU`

Recommended description:

`Vexilian uzbūvē komerciālo sistēmu Latvijas mazajiem un vidējiem uzņēmumiem: vietne, CRM, atribūcija, atgūšana un vadības skats vienā plūsmā.`

OG image:

Dark diagnostic system map with headline:

`Kur pazūd tavi klienti?`

---

## QA checklist

### Visual

* Does hero show client disappearance immediately?
* Does every visual have business meaning?
* Does the site avoid generic SaaS visuals?
* Does founder section feel real and operator-led?
* Do case studies combine real business and system logic?
* Does the audit form feel like an intake console?

### Copy

* Is every paragraph necessary?
* Does each section have one main idea?
* Are long explanations hidden inside cards/accordions?
* Is Latvian clear, direct, and not too abstract?
* Does the site avoid empty buzzwords?

### Interaction

* Are animations restrained?
* Do animated lines communicate flow?
* Does every hover state reveal useful meaning?
* Does reduced motion still work?

### Technical

* MUI and AntD theme tokens visually match.
* No Tailwind, Framer Motion, GSAP, Lottie, Three.js.
* Anime.js only for meaningful SVG/interface animation.
* Data stored in structured files.
* Form validation works.
* Images optimized.
* Metadata configured.
* Mobile layout readable.

---

## The final build identity

The website must feel like this:

A Latvian SME owner arrives with a vague business problem: “klienti kaut kur pazūd.”
Vexilian turns that vague problem into visible architecture.
The page itself becomes a demo of the product: it diagnoses, maps, structures, proves, and receives the audit request.

That is the final idea.

**Verdict: the stronger Vexilian site is not a dark tech website; it is a founder-led commercial diagnostic instrument where every word, visual, component, and animation exposes lost client movement and converts it into a visible system.**

[1]: https://nextjs.org/docs/app/getting-started/fonts?utm_source=chatgpt.com "Getting Started: Font Optimization"
[2]: https://mui.com/?utm_source=chatgpt.com "MUI: The React component library you always wanted"
[3]: https://ant.design/components/config-provider/?utm_source=chatgpt.com "ConfigProvider"
[4]: https://animejs.com/documentation/svg/?utm_source=chatgpt.com "SVG | Documentation"
[5]: https://nextjs.org/docs/app/getting-started/images?utm_source=chatgpt.com "Getting Started: Image Optimization"
[6]: https://nextjs.org/docs/app/getting-started/metadata-and-og-images?utm_source=chatgpt.com "Getting Started: Metadata and OG images"
