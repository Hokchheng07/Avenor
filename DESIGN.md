---
name: Avenor
description: A warm literary system connecting thoughtful book discovery with the real people behind it.
colors:
  paper: "#f7f4ef"
  paper-deep: "#eee8de"
  forest-ink: "#17251a"
  muted-ink: "#696d67"
  antique-gold: "#b98a4b"
  catalogue-rule: "rgba(85, 78, 65, 0.18)"
  warm-white: "#f5f1e9"
  portrait-ground: "#ded9d0"
typography:
  display:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "clamp(3.5rem, 6vw, 5.65rem)"
    fontWeight: 400
    lineHeight: 0.97
    letterSpacing: "-0.035em"
  section-heading:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "clamp(2.75rem, 5vw, 4.7rem)"
    fontWeight: 400
    lineHeight: 1.03
    letterSpacing: "-0.035em"
  statement:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "clamp(2rem, 4.2vw, 4rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Google Sans, Arial, Helvetica, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Google Sans, Arial, Helvetica, sans-serif"
    fontSize: "0.63rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.14em"
rounded:
  media: "3px"
  focus: "0.25rem"
  map: "1rem"
  panel: "1.5rem"
  pill: "999px"
  circle: "50%"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2rem"
  xl: "3rem"
  section: "5.5rem"
  section-roomy: "6.5rem"
components:
  medallion:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.forest-ink}"
    typography: "{typography.section-heading}"
    rounded: "{rounded.circle}"
    size: "clamp(13rem, 20vw, 17rem)"
  team-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.forest-ink}"
    width: "15.5rem"
  contact-panel:
    backgroundColor: "{colors.forest-ink}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.panel}"
    padding: "clamp(1.75rem, 4vw, 3rem)"
---

# Design System: Avenor

## Overview

**Creative North Star: "The Connected Reading Room"**

Avenor feels like a bright reading room at midmorning: warm paper, forest ink, antique-gold details, fine catalogue rules, restrained botanical accents, and real book and portrait photography. The voice is literary but practical—calm, credible, human, and never ornamental for its own sake.

The About page establishes the reusable narrative rhythm. Use a focused standalone hero first, followed by separate Discovery, Mission, Vision, People, Team, and Contact sections. Connection is expressed through recurring materials, circular motifs, rules, and pacing rather than forcing every idea into one diagram.

**Key Characteristics:**

- Warm, low-contrast paper surfaces with deep green-black typography.
- Lora-led editorial statements paired with highly readable Google Sans copy.
- Fine rules, circular nodes, book covers, and real portraits as evidence.
- Generous vertical rhythm and clear, self-contained sections.
- Quiet motion that supports orientation without competing with reading.

## Colors

The palette is warm and restrained: paper provides atmosphere, forest ink carries authority, and antique gold is a scarce connective accent.

### Primary

- **Forest Ink:** Primary text, icons, the contact panel, and the strongest structural contrast.
- **Antique Gold:** Connector lines, circular outlines, links, focus rings, and small role accents.

### Neutral

- **Reading Paper:** The continuous page field.
- **Deep Paper:** Low-contrast media placeholders and subtle surface distinction.
- **Muted Ink:** Supporting copy; reserve Forest Ink for statements and headings.
- **Catalogue Rule:** Section dividers and card metadata separators.
- **Warm White:** Text on the dark contact panel.

**The Scarce Gold Rule.** Gold marks relationships, action, and focus; it must remain an accent rather than becoming a large fill.

**The Warm Field Rule.** Keep the About experience on the paper family. Do not introduce stark white cards or cool gray panels that fragment the reading-room atmosphere.

## Typography

**Display Font:** Lora with Georgia and serif fallbacks  
**Body Font:** Google Sans with Arial, Helvetica, and sans-serif fallbacks

**Character:** Lora supplies literary warmth and a confident editorial cadence. Google Sans keeps supporting copy, labels, links, and practical information direct and contemporary.

### Hierarchy

- **Display:** Regular Lora, tightly tracked and nearly solid-set; hero headlines stay around 10–11 characters wide to create deliberate line breaks.
- **Section heading:** Regular Lora for Team and Contact leads, balanced to roughly 12 characters wide.
- **Statement:** Regular Lora for Mission and Vision commitments; use short lines of about 20–22 characters.
- **Catalogue heading:** Medium Lora, uppercase with generous tracking for Discovery, Mission, Vision, and People labels.
- **Body:** Google Sans at comfortable reading measure, usually no wider than 30–42rem, with a 1.65–1.75 line height.
- **Label:** Bold, uppercase Google Sans with wide tracking for roles and small catalogue metadata.

**The Serif Leads Rule.** Serif type carries meaning and identity; sans-serif type explains, labels, and enables action. Do not set long explanatory paragraphs in the display face.

## Layout

The primary content container is fluid with a maximum width of 86rem and 1.25rem side gutters. At 760px and below, use a 42rem maximum with 1rem side gutters. Major sections typically breathe with 5.5–6.5rem vertical padding, separated by one-pixel catalogue rules.

The hero is a standalone two-column composition with the message on the left and the medallion/book arrangement on the right. After it, Discovery, Mission, Vision, and People each occupy their own two-column row: a compact labelled node on the left and evidence or statement content on the right. Team and Contact are full sections, not branches inside the hero.

At 760px and below, the hero, pillars, section leads, mentor feature, and contact lead collapse to one column. At 1100px the team grid changes from four columns to three; at 760px it becomes two equal columns. Preserve this order and avoid horizontal scrolling.

Team sizing is deliberate: standard member cards are capped at 15.5rem on wide screens, then fill their two-column tracks on mobile. The featured mentor composition is capped at 33rem with a 13rem-wide, 4:5 portrait; at 520px and below the portrait narrows to 8.5rem. The People preview uses four equal square portraits within a 22rem maximum row.

**The Separate Chapters Rule.** Preserve the sequence Hero → Discovery → Mission → Vision → People → Team → Contact. Do not recombine these sections into a single dense constellation or generic value-card grid.

## Elevation & Depth

The system is flat by default. Fine rules, tonal contrast, cropping, and overlap establish hierarchy. Shadows appear only where an object plausibly lifts from the paper: the central medallion, book covers, and the floating map action. Keep shadows broad, soft, and low-opacity; content panels and team cards remain unshadowed.

**The Object Shadow Rule.** Elevate physical or floating objects, not ordinary content containers.

## Shapes

Geometry combines editorial rectangles with selective circles. Book covers use tight 3px corners; portrait tiles are almost square-edged; the medallion, branch icons, and social controls are true circles. The dark contact panel uses a generous 1.5rem radius, its map uses 1rem, and the map action is pill-shaped. One-pixel borders should read like catalogue rules, never heavy outlines.

Portraits and covers keep stable aspect ratios: books are 2:3, standard portraits are 4:4.8, mentor portraits are 4:5, and People previews are square.

## Components

### Hero Medallion

Center the Avenor mark inside a thin gold circle on a subtly lifted paper surface. Pair it with a compact fan of real book covers and only a few fine connector marks. The hero remains readable without this decorative composition.

### Pillar Sections

Discovery, Mission, Vision, and People share a repeatable anatomy: circular line icon, tracked serif label, concise copy, and one proof element. Discovery uses real covers; Vision uses the botanical quotation; People uses real portrait previews and the “Meet the team” anchor.

### Team Cards

Cards are image-led and borderless, with metadata separated by a fine bottom rule. Images use restrained saturation/sepia at rest and recover modest color on hover. Keep names, roles, GitHub, and email actions tied to the corresponding person. Social actions are circular, receive a visible gold focus outline, and may be hidden on very narrow screens only as the current responsive treatment specifies.

**The Real People Rule.** Always use the existing real mentor and team photographs. Never introduce generated people, synthetic headshots, stock stand-ins, or invented team members.

### Contact

Contact is a functional close, not a decorative CTA. Preserve the support carousel, working library-request form, contact details, hours, map, map link, testimonials, and their existing behavior. The dark Forest Ink information panel provides the page’s strongest tonal inversion; keep it legible and spacious.

### Navigation and Footer

The global navbar and footer are preserved components. Do not restyle, replace, duplicate, reorder, or remove them as part of About-page work. The About page may coordinate with their palette, but their behavior, routes, theme controls, and content stay intact.

Motion is restrained: the two hero halves may arrive with a 720ms soft fade, blur release, and short upward translation; stagger the visual by 120ms. Portrait zoom, desaturation recovery, link-arrow movement, and icon lift are small hover acknowledgements. Disable the hero arrival under `prefers-reduced-motion`; all meaning and navigation must remain available without motion.

## Do's and Don'ts

### Do:

- **Do** preserve the standalone hero and the separate Discovery, Mission, Vision, People, Team, and Contact chapters.
- **Do** use real book covers, the Avenor logo, the botanical asset, and the existing real team and mentor photography with accurate alternative text.
- **Do** keep headings connected with `aria-labelledby`, decorative marks hidden from assistive technology, iframe titles present, and keyboard focus visibly outlined in gold.
- **Do** retain readable contrast, logical document order, stable image aspect ratios, responsive two-column team cards, and reduced-motion behavior.
- **Do** preserve the global navbar, footer, and the complete working contact experience.

### Don't:

- **Don't** introduce AI-generated people, synthetic portraits, stock stand-ins, or invented biographies, metrics, awards, customers, or partnerships.
- **Don't** collapse the page back into one crowded relationship diagram or substitute generic feature/value cards.
- **Don't** add heavy shadows, saturated accent fields, cool gray surfaces, excessive rounding, or decorative animation.
- **Don't** crop portraits so faces become incidental, recolor book covers, or replace meaningful images with icons.
- **Don't** change navbar, footer, contact, map, form, support, or testimonial functionality while extending this visual system.
