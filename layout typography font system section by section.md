# DOCUMENT 3

# Full layout, typography, font system, section-by-section design

## Global layout

Use one dark, continuous page.

Max content width: `1360px`
Default desktop padding: `32px`
Section vertical spacing: large, but not empty
Grid: 12 columns
Mobile: 4 columns

Default section structure:

* section eyebrow
* headline
* short body
* visual object
* detail cards if needed

Do not make every section symmetrical. Alternate:

Hero: text left, visual right
Diagnosis: visual board dominant
Approach: three wide panels
Founder: three operator cards
System: sticky stack
Diagnostics: full-width diagram
Collaboration: rail
Process: timeline
Cases: editorial cards
FAQ: narrow accordion
Audit: console form

---

## Font direction

Use a combination of one clean grotesk and one technical mono.

### Primary recommendation

Headings and body:

**Geist Sans**

System labels and telemetry:

**Geist Mono**

Reason:

Geist feels modern, technical, controlled, and founder-led without becoming too startup-fluffy. Geist Mono gives system-interface precision.

Next.js supports optimized font loading with `next/font`, which self-hosts fonts and avoids external font requests, improving performance and privacy. ([nextjs.org][1])

### More premium alternative

Headings:

**Suisse Intl** or **Neue Montreal**

Body:

**Inter** or **Geist Sans**

Mono:

**IBM Plex Mono**

Use this only if you have licensing.

### Avoid

Avoid Orbitron, Space Grotesk as main brand font, Audiowide, Rajdhani, Exo, and anything that screams “fake tech.”

They will cheapen the positioning.

---

## Typography scale

### Desktop

Hero headline: `72px`, line-height `0.95`, letter-spacing `-0.055em`
Section headline: `48px`, line-height `1.02`, letter-spacing `-0.04em`
Subhead: `22px`, line-height `1.35`
Body: `17px`, line-height `1.65`
Card title: `22px`, line-height `1.2`
Metadata: `11px`, uppercase, letter-spacing `0.12em`
Chips: `11px`, uppercase, mono

### Tablet

Hero headline: `56px`
Section headline: `40px`
Body: `16px`

### Mobile

Hero headline: `40px`
Section headline: `32px`
Body: `15.5px`

---

## Color system

Base:

`--bg: #07090B`
`--bg-2: #0B0E11`
`--surface: #101419`
`--surface-2: #151B22`
`--border: rgba(255,255,255,0.08)`
`--border-strong: rgba(255,255,255,0.16)`

Text:

`--text: #F4F7FA`
`--text-2: #A7B0BA`
`--text-3: #6D7782`

Signals:

`--signal-blue: #7EA7FF`
`--signal-amber: #E6A84A`
`--signal-green: #8FD18A`
`--signal-red: #D96C5F`

Use amber only for leakage.
Use green only for successful output.
Use blue for active system state.

---

## 00 · Hero layout

Height:

minimum `92vh`

Grid:

Left 5 columns:
copy

Right 7 columns:
Client Disappearance Map

Hero visual should slightly exceed its column width, bleeding toward the right edge.

Background:

faint grid
soft radial glow behind flow map
no hero photo

Typography:

Hero headline extremely large.
Keep paragraph width max `620px`.

CTA style:

Primary button:
dark blue-black fill, blue border, subtle inner glow.

Secondary:
text button with arrow.

---

## 01 · Diagnoze layout

Grid:

Left 4 columns:
section intro sticky

Right 8 columns:
incident board

Incident board:

cards in vertical stack on desktop
each card height around `180–220px`

Active state:

card border amber
mini SVG line animates
status code becomes visible

Typography:

Incident title should not be huge.
The diagnostic sentence should be readable and sharp.

---

## 02 · Pieeja layout

Full width heading.

Then three horizontal panels stacked.

Each panel:

left 35% visual
right 65% text

Use large negative space.

This section must feel like doctrine, not an app screen.

---

## 03 · Founder section layout

Section visual identity:

“operator room.”

Grid:

Three equal cards on desktop.

Each card:

top: role code
middle: portrait/abstract operator visual
bottom: responsibility text
footer: system touchpoints

Example role code:

`OPERATOR 01 / STRUCTURE`

Founder cards should not be cute. They should feel like the three people controlling the machine.

Photo treatment:

black and white
high contrast
grain 4–6%
dark vignette
face or hands allowed
no corporate smile aesthetic

---

## 04 · System layout

Sticky interactive section.

Left 4 columns sticky copy.

Right 8 columns six-layer stack.

Each layer height:

collapsed `92px`
active `220px`

The route line should pass through all layers vertically.

Typography:

Layer number mono, small.
Layer name strong.
Description short.
Chips below.

---

## 05 · Diagnostics layout

Full-bleed section.

Use a large interface panel centered in the page.

Panel dimensions desktop:

width `min(1280px, 92vw)`
height around `760px`

It should feel like the signature artifact.

The section copy should sit above the diagram, not beside it.

---

## 06 · Sadarbība layout

Use three columns.

Each phase panel:

large title
duration
deliverables
output line

Below:

commercial strip, full width.

The commercial strip must be very clear. This is where buyers understand scope and price.

---

## 07 · Process layout

Horizontal rail.

Use scroll snapping or simple horizontal overflow on smaller screens.

Each process station gets a different visual object:

Audit = messy map
Architecture = blueprint
Installation = connected blocks
Handover = manual/checklist
Optimization = loop

---

## 08 · Case studies layout

Two large case cards.

Each card:

left image area `55%`
right text/system panel `45%`

On hover:

overlay lines light up
case CTA arrow moves slightly
photo does not zoom aggressively

Purgaiļi card should feel warmer.
La Perla card should feel more editorial.

But both must use Vexilian overlays.

---

## 09 · FAQ layout

Narrow centered content.

Max width:

`860px`

Accordion rows full width.

No visual clutter.

---

## 10 · Audit layout

Two columns.

Left 5 columns:
audit promise, trust, deliverables

Right 7 columns:
form console

Textarea should span full width inside form.

Mobile:

form first or after intro depending conversion preference. For this site, keep intro first, form second.
